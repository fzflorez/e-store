import type { Metadata } from "next";
import "../src/styles/globals.css";
import { ThemeProvider } from "@/src/provider/theme-provider";
import Header from "@/src/components/header/header";
import { Toaster } from "@/src/components/ui/sonner";

export const metadata: Metadata = {
  title: "E-Store",
  description: "E-Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex flex-col">{children}</main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
