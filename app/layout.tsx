import { Pretendard } from "@/styles/font";
import "@/styles/globals.css";

interface Metadata {
  title: string;
  description: string;
  icons: string;
}

export const metadata: Metadata = {
  title: "UpNote clone",
  description: "UpNote clone site",
  icons: "/favicon.ico",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={Pretendard.className}>
      <body className="flex w-full h-full">{children}</body>
    </html>
  );
}
