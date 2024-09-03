"use client";

import { styled } from "@mui/material";
import Grid from "@mui/material/Grid2";

export const StyledContainer = styled("div")`
  padding: 80px 0;
`;

export const TestimonialItem = styled(Grid)`
  border: ${({ theme }) => `1px solid ${theme.palette.secondary.main}`};
  width: 350px;
  height: 200px;
  border-radius: 8px;
`;
