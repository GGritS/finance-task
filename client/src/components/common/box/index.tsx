import { Box as BaseBox, BoxProps } from "@mui/material";
import React, { FC } from "react";

export const Box: FC<BoxProps> = ({ children, ...rest }) => {
  return <BaseBox {...rest}>{children}</BaseBox>;
};
