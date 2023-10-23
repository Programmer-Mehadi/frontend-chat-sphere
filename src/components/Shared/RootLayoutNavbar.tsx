"use client";
import React, { useState } from "react";

import {
  DarkThemeToggle,
  Flowbite,
  Navbar,
  ToggleSwitch,
} from "flowbite-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { INavtype } from "@/types/Navbar";
import { setThemeModeOnLocalStorage } from "@/services/themeSetting";
const RootLayoutNavbar = () => {
  const router = usePathname();
  const ulList: INavtype[] = [
    {
      name: "Login",
      href: "/login",
      current: router === "/login",
    },
    {
      name: "Register",
      href: "/register",
      current: router === "/register",
    },
    {
      name: "About",
      href: "/about",
      current: router === "/about",
    },
    {
      name: "Contact",
      href: "/contact",
      current: router === "/contact",
    },
  ];
  const [switch2, setSwitch2] = useState(false);
  return (
    <Navbar fluid className="dark:bg-darkNavbarBg">
      <Navbar.Brand href="https://flowbite-react.com">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Chat Sphere
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <ToggleSwitch
          checked={switch2}
          onChange={() => {
            setThemeModeOnLocalStorage(switch2 ? "light" : "dark");
            setSwitch2(!switch2);
          }}
        />
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        {ulList.map((item: INavtype, i: number) => {
          return (
            <Link
              key={i}
              className={
                item.current
                  ? "text-[#25D366]"
                  : "text-slate-800 dark:text-white "
              }
              href={item.href}
            >
              {item.name}
            </Link>
          );
        })}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default RootLayoutNavbar;
