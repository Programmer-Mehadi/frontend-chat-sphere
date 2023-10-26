/* eslint-disable @next/next/no-img-element */
"use client";

import SubmitButton from "@/components/Forms/Buttons/SubmitButton";
import SpinerLoader from "@/components/Loader/SpinerLoader";
import { countryList } from "@/lib/codeList";
import { serverURL } from "@/lib/serverURL";
import { getTokenOnLocalStorage } from "@/services/authServices";
import axios from "axios";
import { Label, TextInput } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const router = useRouter();
  const countryCodeList = countryList;
  const [selectCode, setSelectCode] = useState(countryCodeList[0].code);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    code: "",
  });
  const [error, setError] = useState({
    phone: {
      message: "",
      show: false,
    },
    name: {
      message: "",
      show: false,
    },
    email: {
      message: "",
      show: false,
    },
    password: {
      message: "",
      show: false,
    },
  });
  const token = getTokenOnLocalStorage("chat-sphere-token");
  if (token || token !== "") {
    router.push("/");
  }
  async function submitForm(e: any) {
    e.preventDefault();
    setLoading(true);
    setError({
      name: {
        message: data.email.length === 0 ? "Please enter a valid name" : "",
        show: data.email.length === 0 ? true : false,
      },
      email: {
        message: data.email.length === 0 ? "Please enter a valid email" : "",
        show: data.email.length === 0 ? true : false,
      },
      phone: {
        message:
          data.phone.length === 0 ? "Please enter a valid phone number" : "",
        show: data.phone.length === 0 ? true : false,
      },
      password: {
        message:
          data.password.length === 0 ? "Please enter a valid password" : "",
        show: data.password.length === 0 ? true : false,
      },
    });
    if (
      data.email.length === 0 ||
      data.password.length === 0 ||
      data.phone.length === 0 ||
      data.name.length === 0
    ) {
      setLoading(false);
      return;
    }
    data.code = selectCode;
    try {
      const result = await axios.post(serverURL + "/user", data);
      if (result.data?.data?.id) {
        toast.success(result?.data?.message);
        setData({
          name: "",
          phone: "",
          email: "",
          password: "",
          code: "",
        });
        router.push("/login");
      }
    } catch (error) {
      setLoading(false);
      if (error?.response?.data?.errorMessages) {
        error?.response?.data?.errorMessages?.forEach((element: any) => {
          toast.error(element?.message);
        });
      }
    }
  }

  return (
    <>
      {token ? (
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
          <SpinerLoader />
        </div>
      ) : (
        <div className="flex lg:justify-center lg:items-center h-full ">
          <div className="w-full grid md:grid-cols-2 gap-8 mx-auto h-full  dark:bg-darkBg">
            <div className="bg-LightGreen dark:bg-TealGreenDark flex flex-col justify-center items-center py-8">
              <img
                className="w-10 md:w-20 lg:w-28"
                src={
                  "https://cdn.usbrandcolors.com/images/logos/whatsapp-logo.svg"
                }
                alt=""
              />
              <span className="text-lg md:text-2xl font-bold text-white">
                ChatSphere
              </span>
            </div>
            <form
              onSubmit={(e) => submitForm(e)}
              className="flex md:self-center w-full max-w-[500px] mx-auto flex-col gap-4 pt-8 pb-14 px-4"
            >
              <h2 className="text-xl font-semibold text-slate-700 dark:text-white text-center">
                Create a New Account
              </h2>
              {/* phone number */}
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="phone" value="Phone" />
                </div>
                <div className="grid gap-4 grid-cols-[90px_1fr]">
                  <select
                    id="countries"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    defaultValue={selectCode}
                    onChange={(e) => {
                      setSelectCode(e.target.value);
                    }}
                  >
                    {countryCodeList.map((key, index) => {
                      return (
                        <option key={index} value={key.code}>
                          {key.code}
                        </option>
                      );
                    })}
                  </select>
                  <TextInput
                    id="phone"
                    placeholder="Enter your phone number"
                    type="number"
                    value={data?.phone}
                    onChange={(e) => {
                      setData({
                        ...data,
                        phone: e.target.value,
                      });
                    }}
                  />
                </div>
                {error?.phone.show && (
                  <span className="text-red-500 text-xs">
                    {error?.phone?.message}*
                  </span>
                )}
              </div>
              {/* Name */}
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="name" value="Name" />
                </div>
                <div className="grid gap-4 grid-cols-[1fr]">
                  <TextInput
                    id="name"
                    placeholder="Enter your name"
                    type="text"
                    value={data?.name}
                    onChange={(e) => {
                      setData({
                        ...data,
                        name: e.target.value,
                      });
                    }}
                  />
                </div>
                {error?.name?.show && (
                  <span className="text-red-500 text-xs">
                    {error?.name?.message}*
                  </span>
                )}
              </div>
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
                <SubmitButton text="Register" />
              )}

              <div>
                <span className="text-slate-700 dark:text-white">
                  Already have an account?{" "}
                  <Link className="text-TealGreen" href="/login">
                    Login
                  </Link>{" "}
                </span>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterPage;
