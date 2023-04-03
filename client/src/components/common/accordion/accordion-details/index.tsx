import {
  AccordionDetails as BaseAccordionDetails,
  AccordionDetailsProps,
} from "@mui/material";
import React, { FC } from "react";

export const AccordionDetails: FC<AccordionDetailsProps> = ({
  children,
  ...rest
}) => {
  return <BaseAccordionDetails {...rest}>{children}</BaseAccordionDetails>;
};
