import React, { FC } from "react";

import { ALL_TICKERS_LIST } from "../../../constants";
import { useTickerContext } from "../../../context";
import { Button } from "../../common/button";
import { Stack } from "../../common/stack";
import { Typography } from "../../common/typography";

export const StocksList: FC = () => {
  const { tickers, handleUpdateTickersPanel } = useTickerContext();
  return (
    <Stack>
      <Typography>Stocks list:</Typography>
      <Stack direction="row">
        {ALL_TICKERS_LIST.map((stockName) => (
          <Button
            variant={
              Boolean(tickers.find((s) => s.ticker === stockName))
                ? "outlined"
                : "contained"
            }
            onClick={() => handleUpdateTickersPanel(stockName)}
          >
            {stockName}
          </Button>
        ))}
      </Stack>
    </Stack>
  );
};
