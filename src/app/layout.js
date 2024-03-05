import { Inter } from "next/font/google";
import "./globals.css";
import GlobalProvider from "@/provider/GlobalProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Todo App",
  description: "Todo app created using Next js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <GlobalProvider>{children}</GlobalProvider>
      </body>
    </html>
  );
}
