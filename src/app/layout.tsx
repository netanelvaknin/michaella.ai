import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { SnackbarProvider } from "@/contexts/snackbar";
import Navbar from "@/components/navbar/navbar";
import { Footer } from "@/components/footer/footer";
import { MainContainer } from "@/components/styled";
import { theme } from "@/theme/theme";
import "./globals.css";

export const metadata: Metadata = {
  title: "Michaella - Smart quiz maker",
  description: "Create quizzes, surveys, and forms with AI-powered features",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <SnackbarProvider>
              <Navbar />
              <MainContainer>{children}</MainContainer>
              <Footer />
            </SnackbarProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>

        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
