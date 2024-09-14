"use client";

import { styled } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { MOBILE_QUERY } from "@/constants";

export const StyledContainer = styled("div")`
  padding: 80px 0;
  @media ${MOBILE_QUERY} {
    padding: 80px 14px;
  }
`;

export const TestimonialItem = styled(Grid)`
  border: ${({ theme }) => `1px solid ${theme.palette.secondary.main}`};
  width: 350px;
  height: 220px;
  border-radius: 8px;
  padding: 18px;
`;
