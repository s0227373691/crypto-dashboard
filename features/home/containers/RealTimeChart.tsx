import { useCryptoComSocket } from "@/hooks/useSocket";
import React from "react";
import RealTimeChartUI from "../ui/RealTimeChart";
import { CandlestickProvider } from "../contexts/candlestick";

const RealTimeChart = () => {
  const socket = useCryptoComSocket();

  return (
    <CandlestickProvider value={{ socket }}>
      <RealTimeChartUI />
    </CandlestickProvider>
  );
};

export default RealTimeChart;
