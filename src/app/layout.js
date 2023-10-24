import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
import "./globals.css";

export const metadata = {
  title: "Online Banking - A Bank",
  description: "Online Banking app for A Bank Customers and Employees",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
