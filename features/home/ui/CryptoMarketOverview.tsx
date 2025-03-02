import React from "react";
import { useTickerContext } from "../contexts/ticker";
import ModeButton from "./ModeButton";

const CryptoMarketOverviewUI = () => {
  const { ticker } = useTickerContext();
  const tickerData = ticker?.data[0];

  if (tickerData === undefined)
    return (
      <div
        role="status"
        className="w-full animate-pulse h-16 flex gap-6 items-center px-5 bg-white dark:bg-[#1F2023]"
      >
        <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-48"></div>
        <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-12"></div>
        <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-24"></div>
        <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-24"></div>
        <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-24"></div>
        <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-10 ml-auto"></div>
      </div>
    );
  return (
    <div className="flex gap-6 items-center py-3 bg-white dark:bg-[#1F2023] px-5">
      <div>
        <h1 className="font-bold text-lg flex items-center gap-2 cursor-pointer text-black dark:text-white">
          {ticker?.instrument_name}
          <svg
            className="w-4 h-4 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 10"
          >
            <path d="M15.434 1.235A2 2 0 0 0 13.586 0H2.414A2 2 0 0 0 1 3.414L6.586 9a2 2 0 0 0 2.828 0L15 3.414a2 2 0 0 0 .434-2.179Z" />
          </svg>
        </h1>
      </div>
      <div className="flex justify-center items-center font-semibold">
        <span className="text-lg text-black dark:text-white">
          {tickerData.a}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-[#8E8E92] text-xs">24h change</span>
        <span className="font-semibold text-xs text-black dark:text-white">
          {tickerData.c}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-[#8E8E92] text-xs">24h high</span>
        <span className="font-semibold text-xs text-black dark:text-white">
          {tickerData.h}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-[#8E8E92] text-xs">24h low</span>
        <span className="font-semibold text-xs text-black dark:text-white">
          {tickerData.l}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-[#8E8E92] text-xs">24h quantity</span>
        <span className="font-semibold text-xs text-black dark:text-white">
          {tickerData.v}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-[#8E8E92] text-xs">24h total (USD)</span>
        <span className="font-semibold text-xs text-black dark:text-white">
          {tickerData.vv}
        </span>
      </div>
      <ModeButton />
    </div>
  );
};

export default CryptoMarketOverviewUI;
