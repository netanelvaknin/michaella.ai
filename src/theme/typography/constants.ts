import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const typography = {
  fontFamily: inter.style.fontFamily,
  fontSize: 16,
  h1: {
    fontSize: "3rem",
    fontWeight: 700,
  },
  h2: {
    fontSize: "2rem",
    fontWeight: 700,
  },
  h3: {
    fontSize: "1.5rem",
    fontWeight: 700,
  },
  body1: {
    fontSize: "1rem",
  },
  body2: {
    fontSize: "1.142rem",
  },
};
