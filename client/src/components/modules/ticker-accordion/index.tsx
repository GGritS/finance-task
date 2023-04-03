import React, { FC } from "react";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { DependentNumbers } from "../dependent-numbers";
import { LineStockChart } from "../chart";

import { Accordion } from "../../common/accordion";
import { Typography } from "../../common/typography";
import { AccordionDetails } from "../../common/accordion/accordion-details";
import { Box } from "../../common/box";
import { AccordionSummary } from "../../common/accordion/accordion-summary";

import style from "./index.module.scss";
import { TickersResponse } from "../../../api/types";

type StockItemProps = {
  data: TickersResponse;
};

export const TickerAccordion: FC<StockItemProps> = ({ data }) => {
  const {
    change,
    price,
    ticker,
    change_percent,
    dividend,
    exchange,
    yield: yieldData,
    last_trade_time,
  } = data;

  return (
    <Box className={style.wrapper}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
        >
          <Box className={style.accordionHeaderWrapper}>
            <Typography>{ticker}</Typography>
            <Typography>{price}</Typography>
            <DependentNumbers
              isPositiveGrowth={change > 0}
              values={{ change, change_percent }}
            />
            <Typography>{dividend}</Typography>
            <Typography>{exchange}</Typography>
            <Typography>{yieldData}</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <LineStockChart
              date={last_trade_time}
              price={price}
              stockName={ticker}
            />
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};
