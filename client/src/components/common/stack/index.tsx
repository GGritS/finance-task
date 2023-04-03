import { Stack as BaseStack, StackProps } from "@mui/material";
import React, { FC } from "react";

export const Stack: FC<StackProps> = ({ children, ...rest }) => {
  return (
    <BaseStack {...rest} spacing={rest.spacing || 1}>
      {children}
    </BaseStack>
  );
};
