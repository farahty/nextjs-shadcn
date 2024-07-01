"use client";

import Link from "next/link";
import React from "react";
import { buttonVariants } from "./ui/button";
import { usePathname } from "next/navigation";

const GuestMenu = () => {
  const pathname = usePathname();

  return (
    <ul className="flex gap-4">
      <li>
        <Link
          href={`/login?callbackUrl=${pathname ?? "/"}`}
          className={buttonVariants({
            variant: "ghost",
            size: "icon",
            className: "w-auto px-2",
          })}
        >
          Login
        </Link>
      </li>
      <li>
        <Link
          href={`/register?callbackUrl=${pathname ?? "/"}`}
          className={buttonVariants({
            variant: "ghost",
            size: "icon",
            className: "w-auto px-2",
          })}
        >
          Register
        </Link>
      </li>
    </ul>
  );
};

export default GuestMenu;
