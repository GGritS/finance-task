import React, { FC } from "react";
import { BUTTONS_VALUES } from "../../../constants";

import { useTickerContext } from "../../../context";
import { Button } from "../../common/button";
import { TickerAccordion } from "../ticker-accordion";

import style from "./index.module.scss";

export const TickerPanel: FC = () => {
  const { tickers, handleChangeIntervalDuration, intervalDuration } =
    useTickerContext();

  return (
    <>
      Set update delay:
      <div className={style.content}>
        {BUTTONS_VALUES.map((button) => (
          <Button
            sx={{ textTransform: "lowercase" }}
            disabled={intervalDuration === button.duration}
            onClick={() => handleChangeIntervalDuration(button.duration)}
          >
            {button.title}s
          </Button>
        ))}
      </div>
      <div>
        {!!tickers.length ? (
          tickers.map((stock) => (
            <TickerAccordion data={stock} key={stock.ticker} />
          ))
        ) : (
          <>loading</>
        )}
      </div>
    </>
  );
};
