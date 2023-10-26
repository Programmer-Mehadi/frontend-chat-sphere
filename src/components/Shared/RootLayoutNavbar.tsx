"use client";
import { useEffect, useState } from "react";

import { Navbar, ToggleSwitch } from "flowbite-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { INavtype } from "@/types/Navbar";
import {
  getThemeModeFromLocalStorage,
  setThemeModeOnLocalStorage,
} from "@/services/themeSetting";
const RootLayoutNavbar = () => {
  const htmlTag = document.querySelector("html");
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
  useEffect(() => {
    const presentTheme = getThemeModeFromLocalStorage();
    setSwitch2(presentTheme === "dark");
    htmlTag?.classList.add(presentTheme === "light" ? "light" : "dark");
    htmlTag?.classList.remove(presentTheme === "light" ? "dark" : "light");
  }, []);
  return (
    <Navbar fluid className="dark:bg-darkNavbarBg shadow-sm">
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
            htmlTag?.classList.add(switch2 ? "light" : "dark");
            htmlTag?.classList.remove(switch2 ? "dark" : "light");
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
