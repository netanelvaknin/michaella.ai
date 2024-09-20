"use client";
import { styled } from "@mui/material";
import { navbarHeightValue } from "@/components/navbar/navbar.styled";
import { footerHeightValue } from "@/components/footer/footer.styled";

export const MainContainer = styled("main")`
  min-height: calc(100vh + ${navbarHeightValue - footerHeightValue}px);
  padding-top: ${navbarHeightValue + 50}px;
`;
