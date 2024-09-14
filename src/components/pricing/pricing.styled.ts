"use client";

import { Box, styled } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { MOBILE_QUERY } from "@/constants";

export const StyledPricingContainer = styled(Box)`
  background: ${({ theme }) => theme.palette.secondary.main};
  padding: 80px 0;
  @media ${MOBILE_QUERY} {
    padding: 80px 14px;
  }
`;

export const PricingCard = styled(Grid)`
  border: 1px solid ${(props) => props.theme.palette.secondary.main};
  border-radius: 8px;
  padding: 24px;
`;
