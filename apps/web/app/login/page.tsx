"use client";
import React, { useState } from "react";
import ClientOnly from "../components/ClientOnly"
import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import PhoneInput, { parsePhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import Axios from "../../lib/AxiosBase";
import '../../public/styles/tailwind.css';

export default function LoginPage() {
  const formDefaultState = {
    defaultValues: {
      phoneNumber: "",
      password: "",
    },
  };
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm<FieldValues>({ defaultValues: formDefaultState, mode: "onBlur" });
  const [errorMsg, SetErrorMsg] = useState<any>(null);
  const [value, setValue] = useState<any>()
  const api = Axios()
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const { phoneNumber, country, password } = getValues();
    api?.post("/auth/login-phone", {
      countryCode: parsePhoneNumber(phoneNumber)?.country,
      phoneNumber: parsePhoneNumber(phoneNumber)?.nationalNumber,
      password: password
    })
    .then((e) => {
      console.log(e)

    })
    .catch((e) => {
      console.log(e)
    })

    // console.log('Phone Number:', parsePhoneNumber(phoneNumber)?.nationalNumber);
    // console.log('Country Code:', parsePhoneNumber(phoneNumber)?.country);
    // console.log('Password:', password);
  };
  return (
    <ClientOnly>
      <div className="relative overflow-hidden ">
        <div className="absolute inset-0 z-0 w-full bg-black opacity-40"></div>
        <div className="max-w-[2520px] flex flex-col justify-center items-center min-h-screen">
          {/* BACKGROUND WHITE CARD DIV */}
          <div className="bg-gray-50 px-10 py-7 rounded-lg max-w-md relative">
            {/* TITLE DIV */}
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-1 text-2xl text-center text-slate-700">
                Enter your phone number
              </h2>
            </div>
            {/* SUB TITLE DIV */}
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <div className=" text-center text-sm tracking-tight text-gray-500">
                To log in, use a previously registered phone number
              </div>
            </div>

            <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <div className="mt-3">
                    <PhoneInput
                      {...register('phoneNumber', {
                        required: 'Phone number is required',
                        minLength: {
                          value: 15,
                          message: 'Phone number must be 10 digits',
                        },
                        maxLength: {
                          value: 15,
                          message: 'Phone number must be 10 digits',
                        },
                      })}
                      placeholder="Enter phone number"
                      value={value}
                      onChange={setValue}
                      className="block w-full rounded-md border py-3 text-center bg-white text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none focus:ring-transparent focus:border-transparent"
                    />
                    {errors.phoneNumber && (
                      <p className="text-red-500 text-sm">{`${errors.phoneNumber.message}`}</p>
                    )}
                  </div>
                </div>
                <div>
                  <div className="my-4">
                    <input
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 8,
                          message: "Password must be at least 8 characters",
                        },
                      })}
                      type="password"
                      placeholder="Password"
                      className="block w-full rounded-md border py-3 text-center bg-white text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none focus:ring-transparent focus:border-transparent"
                    />
                    {errors.password && (
                      <p className="text-red-500 text-sm">{`${errors.password.message}`}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-center mt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-9/12 py-3 text-sm font-semibold rounded-full shadow-sm ${errors.phoneNumber
                      ? "bg-gray-200 text-gray-400"
                      : "bg-black text-white hover:opacity-95 focus:outline-none focus:ring-2"
                      } `}
                  >
                    Log in
                  </button>
                </div>
                {errorMsg && (
                  <div className=" flex items-center justify-center text-red-500 text-lg">
                    {errorMsg}
                  </div>
                )}
                <div className=" flex items-center justify-center">
                  <label htmlFor="agree" className="text-sm text-gray-900">
                    Don't have an account?{" "}
                    <Link
                      href={"/register"}
                      className="text-blue-600 hover:underline"
                    >
                      Register now
                    </Link>
                  </label>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </ClientOnly >
  )
}