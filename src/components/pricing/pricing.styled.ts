"use client";

import { Box, styled } from "@mui/material";
import Grid from "@mui/material/Grid2";

export const StyledPricingContainer = styled(Box)`
  background: ${({ theme }) => theme.palette.secondary.main};
  padding: 80px 0;
`;

export const PricingCard = styled(Grid)`
  border: 1px solid ${(props) => props.theme.palette.secondary.main};
  border-radius: 8px;
  padding: 24px;
`;
