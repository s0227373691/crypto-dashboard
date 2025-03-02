import React from "react";

import { TickerProvider } from "../contexts/ticker";
import { useCryptoComSocket } from "@/hooks/useSocket";
import CryptoMarketOverviewUI from "../ui/CryptoMarketOverview";

const CryptoMarketOverview = () => {
  const socket = useCryptoComSocket();
  return (
    <TickerProvider value={{ socket, symbol: "BTCUSD-PERP" }}>
      <CryptoMarketOverviewUI />
    </TickerProvider>
  );
};

export default CryptoMarketOverview;
