"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import "./globals.css";
import { ProviderComponent } from "@/store/ProviderComponent";
import Sidebar from "@/components/Sidebar";
import { usePathname, useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function ProtectLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const router = useRouter();
  //   const pathname = usePathname();
  //   console.log("pathname :>>", pathname);

  // const isOnLoginPage = router.pathname.startsWith("/login");
  return (
    <div className="flex">
      <div className="basis-1/6 bg-white">
        <Sidebar />
      </div>
      <div className="basis-5/6">{children}</div>
    </div>
  );
}