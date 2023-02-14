"use client";
import React from "react";
import Image from "next/image";
import { signOut } from "next-auth/react";
import Link from "next/link";

type LoggedProps = {
  image: string;
};

const Logged = ({ image }: LoggedProps) => {
  return (
    <>
      <li
        className="block rounded bg-blue-700 py-2 pl-3 pr-4 text-white dark:text-white md:bg-transparent md:p-0 md:text-blue-700"
        aria-current="page"
      >
        <button
          onClick={() => signOut()}
          type="button"
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Sign Out
        </button>
      </li>
      <li className="flex justify-center items-center">
        <Link href="/dashboard">
          <Image
            className="w-8 h-8 rounded-full"
            src={image}
            alt="user photo"
            width={164}
            height={164}
            priority
          />
        </Link>
      </li>
    </>
  );
};

export default Logged;
