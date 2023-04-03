import {
  AccordionSummary as BaseAccordionSummary,
  AccordionSummaryProps,
} from "@mui/material";
import React, { FC } from "react";

export const AccordionSummary: FC<AccordionSummaryProps> = ({
  children,
  ...rest
}) => {
  return <BaseAccordionSummary {...rest}>{children}</BaseAccordionSummary>;
};
