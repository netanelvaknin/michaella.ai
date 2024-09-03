"use client";

import { css, styled } from "@mui/material";

export const Container = styled("div")`
  ${({ theme }) => css`
    background: ${theme.palette.secondary.main};
    padding: 80px 0;
  `}
`;
