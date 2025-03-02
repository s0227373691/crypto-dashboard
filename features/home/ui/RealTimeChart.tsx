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
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
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

    const format = candlestick?.data.map((item) => ({
      time: (item.t / 1000) as UTCTimestamp,
      open: +item.o,
      high: +item.h,
      low: +item.l,
      close: +item.c,
    }));

    const newTime = new Date("2024-02-23").toISOString().split("T")[0];
    lineSeriesRef.current?.update(format[0]);
  }, [candlestick]);

  return (
    <div className="p-1 bg-[#F4F5F7] dark:bg-[#1F2023] w-2/3 h-[calc(100vh-80px)]">
      {" "}
      <div ref={chartContainerRef} className="w-full h-full" />
    </div>
  );
};

export default RealTimeChart;
