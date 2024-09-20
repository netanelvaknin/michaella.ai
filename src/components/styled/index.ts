"use client";
import { styled } from "@mui/material";
import { navbarHeightValue } from "@/components/navbar/navbar.styled";
import { footerHeightValue } from "@/components/footer/footer.styled";
import { MOBILE_QUERY } from "@/constants";

export const MainContainer = styled("main")`
  min-height: calc(100vh + ${navbarHeightValue - footerHeightValue}px);
  padding-top: ${navbarHeightValue + 50}px;

  @media ${MOBILE_QUERY} {
    min-height: calc(80vh + ${navbarHeightValue - footerHeightValue}px);
  }
`;
