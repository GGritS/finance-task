import {
  createContext,
  FC,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { io } from "socket.io-client";
import { getInterval, updateInterval } from "../api/intervals";
import { createTicker, deleteTicker, getTickers } from "../api/tickers";
import { TickersResponse } from "../api/types";

import { TickerContextProviderProps, TickerContextType } from "./type";

const TickerContext = createContext<TickerContextType>({} as TickerContextType);

export const TickerContextProvider: FC<TickerContextProviderProps> = ({
  children,
}) => {
  const [tickers, setTickers] = useState<TickersResponse[] | []>([]);
  const [intervalDuration, setIntervalDuration] = useState<number>(-1);

  const socket = useMemo(() => {
    return io("http://localhost:4000");
  }, []);

  const fetchData = () => {
    socket.on("ticker", (data) => {
      setTickers(data);
    });

    socket.emit("start");
  };

  const handleUpdateTickersPanel = async (stockName: string) => {
    const action = tickers.find((s) => s.ticker === stockName)
      ? "remove"
      : "add";
    if (action === "add") {
      await createTicker(stockName);
    }
    if (action === "remove") {
      await deleteTicker(stockName);
    }
    const res = await getTickers();
    setTickers(res.data.tickers);
  };

  const handleChangeIntervalDuration = async (newDuration: number) => {
    await updateInterval(newDuration);
    await fetchInterval();
  };

  const fetchInterval = async () => {
    const res = await getInterval();
    setIntervalDuration(res.data.interval);
  };

  useEffect(() => {
    fetchInterval();
  }, []);

  useEffect(() => {
    fetchData();
    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line
  }, [socket]);

  const value = {
    tickers,
    handleUpdateTickersPanel,
    intervalDuration,
    handleChangeIntervalDuration,
    fetchInterval,
  };
  return (
    <TickerContext.Provider value={value}>{children}</TickerContext.Provider>
  );
};

export const useTickerContext = () => {
  return useContext(TickerContext);
};
