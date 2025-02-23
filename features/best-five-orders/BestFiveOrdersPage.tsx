/** @format */
'use client';

import React, {useEffect} from 'react';
import {useCryptoComSocket} from '@/hooks/useSocket';
import {METHODS} from '@/constants/crypto-com-socket';

const BestFiveOrdersPage = () => {
  const socket = useCryptoComSocket();

  useEffect(() => {
    socket.onopen = () => console.log('socket connected!');
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
        console.log('Crypto.com msg', parse.result);
      }
    };
  }, []);
  const handle = () => {
    const param = {
      method: METHODS.SUBSCRIBE,
      params: {
        channels: ['book.BTCUSD-PERP.10'],
      },
      nonce: 1654784123465,
    };
    socket.send(JSON.stringify(param));
  };
  return (
    <div>
      pages <button onClick={handle}>click</button>
    </div>
  );
};

export default BestFiveOrdersPage;
