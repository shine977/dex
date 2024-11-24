import { Web3Provider } from "@/components/providers/Web3Provider";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <head />
      <body className="bg-gray-900 text-white">
        <Web3Provider>{children}</Web3Provider>
      </body>
    </html>
  );
}
