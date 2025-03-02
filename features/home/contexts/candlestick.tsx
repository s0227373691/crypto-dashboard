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

type Interval =
  | "1m"
  | "5m"
  | "15m"
  | "30m"
  | "1h"
  | "2h"
  | "4h"
  | "12h"
  | "1D"
  | "7D"
  | "14D"
  | "1M";

interface CandlestickData {
  o: number; // Open
  h: number; //	High
  l: number; //	Low
  c: number; //	Close
  v: number; //	Volume
  t: number; //  Timestamp
}

interface CandlestickContext {
  candlestick: {
    instrument_name: string;
    subscription: string;
    channel: RESULT_CHANNEL.CANDLESTICK;
    interval: Interval;
    data: CandlestickData[];
  } | null;
}

export const CandlestickContext = createContext<CandlestickContext | undefined>(
  undefined
);

export const useCandlestickContext = () => {
  const context = useContext(CandlestickContext);
  if (!context) {
    throw new Error(
      "useCandlestickContext must be used within CandlestickProvider"
    );
  }
  return context;
};

export const CandlestickProvider: FC<{
  value: { socket: WebSocket };
  children: React.ReactNode;
}> = ({ value, children }) => {
  const { socket } = value;
  const [candlestick, setCandlestick] = useState(null);

  useEffect(() => {
    socket.onopen = () => {
      console.log("socket connected!");

      const param = {
        method: METHODS.SUBSCRIBE,
        params: {
          channels: ["candlestick.1m.BTCUSD-PERP"],
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
        if (!parse.result) return;

        setCandlestick(parse.result);
      }
    };

    socket.onerror = (error) => {
      console.error("error", error);
    };

    return () => socket.close();
  }, []);

  return (
    <CandlestickContext.Provider value={{ candlestick }}>
      {children}
    </CandlestickContext.Provider>
  );
};
