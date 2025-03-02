import {
  createChart,
  CandlestickSeries,
  ISeriesApi,
  UTCTimestamp,
} from "lightweight-charts";
import { useEffect, useRef } from "react";
import { useCandlestickContext } from "../contexts/candlestick";

const RealTimeChart = () => {
  const chartContainerRef = useRef(null);
  const lineSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const { candlestick } = useCandlestickContext();

  useEffect(() => {
    if (!chartContainerRef.current) return;
    const chart = createChart(chartContainerRef.current, {
      autoSize: true,
      layout: {
        background: { color: "#ffffff" },
        textColor: "black",
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
        tickMarkFormatter: (time: number) => {
          const date = new Date(time * 1000);
          return date.toLocaleString("zh-TW", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          });
        },
      },
      localization: {
        timeFormatter: (time: number) => {
          const date = new Date(time * 1000);
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const day = String(date.getDate()).padStart(2, "0");
          const hours = String(date.getHours()).padStart(2, "0");
          const minutes = String(date.getMinutes()).padStart(2, "0");

          return `${year}-${month}-${day} ${hours}:${minutes}`;
        },
      },
    });

    const lineSeries = chart.addSeries(CandlestickSeries);
    lineSeriesRef.current = lineSeries;
  }, []);

  useEffect(() => {
    if (!candlestick) return;
    if (!lineSeriesRef.current) return;

    const lastCnadlestick = candlestick?.data.pop();
    if (!lastCnadlestick) return;

    const formatLastCnadlestick = {
      time: (lastCnadlestick.t / 1000) as UTCTimestamp,
      open: +lastCnadlestick.o,
      high: +lastCnadlestick.h,
      low: +lastCnadlestick.l,
      close: +lastCnadlestick.c,
    };

    lineSeriesRef.current?.update(formatLastCnadlestick);
  }, [candlestick]);

  return (
    <div className="p-1 bg-[#F4F5F7] dark:bg-[#1F2023] w-2/3 h-[calc(100vh-80px)]">
      {" "}
      <div ref={chartContainerRef} className="w-full h-full" />
    </div>
  );
};

export default RealTimeChart;
