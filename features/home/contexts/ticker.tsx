/** @format */

"use client";

import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from "react";
import { METHODS, RESULT_CHANNEL } from "@/constants/crypto-com-socket";

interface TickerData {
  h: string;
  l: string;
  a: string;
  c: string;
  b: string;
  bs: string;
  k: string;
  ks: string;
  i: string;
  v: string;
  vv: string;
  oi: string;
  t: number;
}

interface TickerContext {
  ticker: {
    instrument_name: string;
    subscription: string;
    channel: RESULT_CHANNEL.TICKER;
    data: TickerData[];
  } | null;
}

export const TickerContext = createContext<TickerContext | undefined>(
  undefined
);

export const useTickerContext = () => {
  const context = useContext(TickerContext);
  if (!context) {
    throw new Error("useTickerContext must be used within TickerProvider");
  }
  return context;
};

export const TickerProvider: FC<{
  value: { socket: WebSocket; symbol: string };
  children: React.ReactNode;
}> = ({ value, children }) => {
  const { socket, symbol } = value;
  const [ticker, setTicker] = useState(null);

  useEffect(() => {
    socket.onopen = () => {
      console.log("socket connected!");

      const param = {
        method: METHODS.SUBSCRIBE,
        params: {
          channels: ["ticker.BTCUSD-PERP"],
        },
        nonce: Date.now(),
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
        console.log("parse", parse.result);
        if (!parse.result) return;
        const data = parse.result.data[0];

        setTicker(parse.result);
      }
    };

    socket.onerror = (error) => {
      console.error("error", error);
    };

    return () => socket.close();
  }, []);

  return (
    <TickerContext.Provider value={{ ticker }}>
      {children}
    </TickerContext.Provider>
  );
};
