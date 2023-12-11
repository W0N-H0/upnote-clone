import { Pretendard } from "@/styles/font";
import "@/styles/globals.css";
import Header from "@/components/header/Header";
import Navber from "@/components/navbar/Navbar";
import { Toaster } from "react-hot-toast";

interface Metadata {
  title: string;
  description: string;
  icons: string;
}

export const metadata: Metadata = {
  title: "UpNote clone",
  description: "UpNote clone site",
  icons: "/icon.png",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={Pretendard.className}>
      <body className="flex flex-col min-w-[1400px] max-w-[1920px]">
        <Toaster
          containerStyle={{
            fontSize: "0.875rem",
          }}
        />
        <Header />
        <div className="flex">
          <Navber />
          {children}
        </div>
      </body>
    </html>
  );
}
