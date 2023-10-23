import RootLayoutNavbar from "@/components/Shared/RootLayoutNavbar";
import { Flowbite } from "flowbite-react";
import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <RootLayoutNavbar />
      {children}
    </>
  );
}
