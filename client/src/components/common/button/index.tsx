import { Button as BaseButton, ButtonProps } from "@mui/material";
import React, { FC } from "react";

export const Button: FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <BaseButton {...rest} variant={rest.variant || "contained"}>
      {children}
    </BaseButton>
  );
};
