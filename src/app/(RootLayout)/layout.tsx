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
      <section className="dark:bg-darkBg min-h-rootLayoutContainerHeight dark:text-white h-full grid">
        {children}
      </section>
    </>
  );
}
