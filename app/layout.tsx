import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import "./globals.scss";
import { ThemeProvider } from "@/components/ThemeProvider";
import { DataProvider } from "@/components/DataProvider";
import { Toaster } from "@/components/ui/sonner";
import Script from "next/script";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

// const rubik = Rubik_Microbe({
//   subsets: ["latin"],

//   weight: ["400"],
// });

export const metadata: Metadata = {
  title: "Todo App",
  description: "this app is just a demo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          defer
          src="https://logs.farahty.com/script.js"
          data-website-id="6559df8b-2d75-41ea-8686-fde2c9bc42d4"
        ></Script>
      </head>
      <body className={`${poppins.className} `}>
        <DataProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </DataProvider>
      </body>
    </html>
  );
}
