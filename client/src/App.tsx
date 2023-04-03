import React from "react";
import "./App.scss";

import { useTickerContext } from "./context";
import { TickerPanel } from "./components/modules/ticker-panel";
import { StocksList } from "./components/modules/stocks-list";
import { Stack } from "./components/common/stack";

export const App = () => {
  const { tickers } = useTickerContext();

  return (
    <>
      {!tickers ? (
        <>loading</>
      ) : (
        <div className="wrapper">
          <Stack alignItems="center">
            <h1>Tickers</h1>
            <TickerPanel />
            <StocksList />
          </Stack>
        </div>
      )}
    </>
  );
};
