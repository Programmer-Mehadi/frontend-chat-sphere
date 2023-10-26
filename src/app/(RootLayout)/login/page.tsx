"use client";

import SubmitButton from "@/components/Forms/Buttons/SubmitButton";
import SpinerLoader from "@/components/Loader/SpinerLoader";
import { countryList } from "@/lib/codeList";
import { serverURL } from "@/lib/serverURL";
import { setTokenOnLocalStorage } from "@/services/authServices";
import axios from "axios";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const LoginPage = () => {
  const countryCodeList = countryList;
  const router = useRouter();
  const [selectCode, setSelectCode] = useState(countryCodeList[0].code);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: {
      message: "",
      show: false,
    },
    password: {
      message: "",
      show: false,
    },
  });

  async function submitForm(e: any) {
    e.preventDefault();
    setLoading(true);
    setError({
      email: {
        message:
          data.email.length === 0 ? "Please enter a valid email number" : "",
        show: data.email.length === 0 ? true : false,
      },
      password: {
        message:
          data.password.length === 0 ? "Please enter a valid password" : "",
        show: data.password.length === 0 ? true : false,
      },
    });

    if (data.email.length === 0 || data.password.length === 0) {
      return;
    } else {
      try {
        const result = await axios.post(serverURL + "/auth/login", data);
        toast.success(result?.data?.message);
        setError({
          email: {
            message: "",
            show: false,
          },
          password: {
            message: "",
            show: false,
          },
        });
        setData({
          email: "",
          password: "",
        });
        const token = result?.data?.data?.token;
        setTokenOnLocalStorage("chat-sphere-token", token);
        router.push("/");
      } catch (error) {
        setLoading(false);
        error?.response?.data?.errorMessages.map((err: any) => {
          toast.error(err?.message);
        });
      }
    }
  }

  return (
    <div className="flex lg:justify-center lg:items-center h-full ">
      <div className="w-full grid md:grid-cols-2 gap-8 mx-auto h-full  dark:bg-darkBg">
        <div className="bg-LightGreen dark:bg-TealGreenDark flex flex-col justify-center items-center py-8">
          <img
            className="w-10 md:w-20 lg:w-28"
            src={"https://cdn.usbrandcolors.com/images/logos/whatsapp-logo.svg"}
            alt=""
          />
          <span className="text-lg md:text-2xl font-bold text-white">
            ChatSphere
          </span>
        </div>
        <form
          onSubmit={(e) => submitForm(e)}
          className="md:self-center flex w-full max-w-[500px] mx-auto flex-col gap-4 pt-8 pb-14 px-4"
        >
          <h2 className="text-xl font-semibold text-slate-700 dark:text-white text-center">
            Login to Your Account
          </h2>
          {/* email */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Email" />
            </div>
            <div className="grid gap-4 grid-cols-[1fr]">
              <TextInput
                id="email"
                placeholder="Enter your email"
                type="text"
                value={data?.email}
                onChange={(e) => {
                  setData({
                    ...data,
                    email: e.target.value,
                  });
                }}
              />
            </div>
            {error?.email?.show && (
              <span className="text-red-500 text-xs">
                {error?.email?.message}*
              </span>
            )}
          </div>
          {/* password */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Password" />
            </div>
            <div className="grid gap-4 grid-cols-[1fr]">
              <TextInput
                id="password"
                placeholder="Enter password"
                type="text"
                value={data?.password}
                onChange={(e) => {
                  setData({
                    ...data,
                    password: e.target.value,
                  });
                }}
              />
            </div>
          </div>
          {error?.password?.show && (
            <span className="text-red-500 text-xs">
              {error?.password?.message}*
            </span>
          )}
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="text-gray-500 rounded-[4px] bg-gray-300 w-full py-1 px-8 text-center cursor-not-allowed">
                <SpinerLoader /> Loading...
              </div>
            </div>
          ) : (
            <SubmitButton text="Login" />
          )}
          <div>
            <span className="text-slate-700 dark:text-white">
              Don{"'"}t have an account?{" "}
              <Link className="text-TealGreen" href="/register">
                Register
              </Link>{" "}
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
