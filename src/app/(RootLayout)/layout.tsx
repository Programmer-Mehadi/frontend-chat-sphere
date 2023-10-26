import RootLayoutNavbar from "@/components/Shared/RootLayoutNavbar";
import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <RootLayoutNavbar />
      <section className="dark:bg-darkBg min-h-screen dark:text-white">
        {children}
      </section>
    </>
  );
}
