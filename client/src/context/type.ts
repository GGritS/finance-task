import { ReactNode } from "react";
import { TickersResponse } from "../api/types";

export type TickerContextType = {
  tickers: TickersResponse[] | [];
  handleUpdateTickersPanel: (stockName: string) => void;
  intervalDuration: number;
  handleChangeIntervalDuration: (newDuration: number) => void;
  fetchInterval: () => void;
};

export type TickerContextProviderProps = {
  children: ReactNode;
};
