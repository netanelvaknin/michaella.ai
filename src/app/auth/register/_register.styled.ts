import { Box, styled } from "@mui/material";
import { MOBILE_QUERY } from "@/constants";

export const StyledContainer = styled(Box)`
  @media ${MOBILE_QUERY} {
    box-shadow: none;
  }
`;
