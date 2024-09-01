import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import theme from "@/theme";
import "./globals.css";
import { SnackbarProvider } from "@/contexts/snackbar";

export const metadata: Metadata = {
  title: "Michaella.AI - מערכת חכמה ליצירת מבחנים בעזרת בינה מלאכותית",
  description: "מערכת חכמה ליצירת מבחנים בעזרת בינה מלאכותית",
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
            <SnackbarProvider>{children}</SnackbarProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>

        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
