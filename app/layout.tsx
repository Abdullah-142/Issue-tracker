import type { Metadata } from "next";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { Theme, ThemePanel } from "@radix-ui/themes";
import Navbar from "./NavBar";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Issue Tracker",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Theme
          appearance="light"
          accentColor="iris"
        >
          <Navbar />
          <main className="p-7">{children}</main>
        </Theme>
      </body>
    </html>
  );
}
