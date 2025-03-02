"use client";

import RealTimeChart from "./containers/RealTimeChart";
import CryptoMarketOverview from "./containers/CryptoMarketOverview";
import SymbolCard from "../best-five-orders/container/SymbolCard";

export default function HomePage() {
  return (
    <div className="w-screen h-screen">
      <main className="flex flex-col w-full h-screen">
        <CryptoMarketOverview />
        <div className="p-1 bg-[#F4F5F7] dark:bg-[#1F2023] flex">
          <RealTimeChart />
          <SymbolCard symbol="BTCUSD-PERP" />
        </div>
      </main>
    </div>
  );
}
