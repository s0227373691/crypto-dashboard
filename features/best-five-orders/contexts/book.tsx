/** @format */

'use client';

import React, {createContext, FC, useContext, useEffect, useState} from 'react';
import {useCryptoComSocket} from '@/hooks/useSocket';
import {METHODS} from '@/constants/crypto-com-socket';
import {Socket} from 'dgram';

interface BookContext {
  book: any;
}

export const BookContext = createContext<BookContext | undefined>(undefined);

export const useBookContext = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBookContext must be used within BookProvider');
  }
  return context;
};

export const BookProvider: FC<{
  value: {socket: WebSocket; symbol: string};
  children: React.ReactNode;
}> = ({value, children}) => {
  const {socket, symbol} = value;
  const [book, setBook] = useState(null);

  useEffect(() => {
    console.log('BookProvider');
    socket.onopen = () => {
      console.log('socket connected!');
      const param = {
        method: METHODS.SUBSCRIBE,
        params: {
          channels: [`book.${symbol}.10`],
        },
        nonce: 1654784123465,
      };
      socket.send(JSON.stringify(param));
    };
    socket.onmessage = (event) => {
      const parse = JSON.parse(event.data);
      if (parse.method === METHODS.PUBLIC_HEARTBEAT) {
        const params = {
          id: parse.id,
          method: METHODS.PUBLIC_RESPOND_HEARTBEAT,
        };
        socket.send(JSON.stringify(params));
      }

      if (parse.method === METHODS.SUBSCRIBE) {
        console.log('parse', parse.result);
        if (!parse.result) return;
        const data = parse.result.data[0];
        data.asks.length = 5;
        data.asks.reverse();
        data.bids.length = 5;
        setBook(parse.result);
      }
    };

    socket.onerror = (error) => {
      console.error('error', error);
    };

    return () => socket.close();
  }, []);

  return <BookContext.Provider value={{book}}>{children}</BookContext.Provider>;
};
