"use client";

import { styled } from "@mui/material";

export const navbarHeightValue = 56;

export const StyledNavbar = styled("nav")`
  height: ${navbarHeightValue}px;
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.6);
  position: fixed;
  width: 100%;
  backdrop-filter: blur(8px);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
`;
