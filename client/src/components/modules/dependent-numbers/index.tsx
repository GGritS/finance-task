import React, { FC } from "react";

import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

import cn from "classnames";
import style from "./index.module.scss";
import { Typography } from "../../common/typography";

type DependentNumbersProps = {
  isPositiveGrowth: boolean;
  values: {
    change: number;
    change_percent: number;
  };
};

export const DependentNumbers: FC<DependentNumbersProps> = ({
  isPositiveGrowth,
  values,
}) => {
  const { change, change_percent } = values;
  const titleModifiers = {
    [style.negativeMeaning]: !isPositiveGrowth,
    [style.positiveMeaning]: isPositiveGrowth,
  };
  return (
    <>
      <Typography className={cn(style.tickerItem, titleModifiers)}>
        {isPositiveGrowth ? `+${change}` : change}
      </Typography>
      <Typography
        sx={{ display: "flex", alignItems: "center" }}
        className={cn(style.tickerItem, titleModifiers)}
      >
        {isPositiveGrowth ? (
          <ArrowUpwardIcon fontWeight={200} fontSize="small" />
        ) : (
          <ArrowDownwardIcon fontWeight={200} fontSize="small" />
        )}
        {change_percent}%
      </Typography>
    </>
  );
};
