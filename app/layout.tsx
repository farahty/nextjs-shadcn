import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@blocknote/shadcn/style.css";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { DataProvider } from "@/components/DataProvider";
import { Toaster } from "@/components/ui/sonner";

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
