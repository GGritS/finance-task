import { Accordion as BaseAccordion, AccordionProps } from "@mui/material";
import React, { FC } from "react";

export const Accordion: FC<AccordionProps> = ({ children, ...rest }) => {
  return <BaseAccordion {...rest}>{children}</BaseAccordion>;
};
