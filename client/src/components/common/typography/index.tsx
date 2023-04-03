import { Typography as BaseTypography, TypographyProps } from "@mui/material";
import React, { FC } from "react";

export const Typography: FC<TypographyProps> = ({ children, ...rest }) => {
  return <BaseTypography {...rest}>{children}</BaseTypography>;
};
