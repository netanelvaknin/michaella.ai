import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { Sidebar } from "@/components";
import Rtl from "@/components/rtl/rtl";
import theme from "@/theme";
import "./globals.css";
import Grid from "@mui/material/Grid2";

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
    <html lang="he" dir="rtl">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <Rtl>
              <Grid container spacing={4}>
                <Grid size={2}>
                  <Sidebar />
                </Grid>
                <Grid size={10}>{children}</Grid>
              </Grid>
            </Rtl>
          </ThemeProvider>
        </AppRouterCacheProvider>

        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
