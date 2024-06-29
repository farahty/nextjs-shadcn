import Link from "next/link";
import React from "react";
import { buttonVariants } from "./ui/button";

const GuestMenu = () => {
  return (
    <ul className="flex gap-4">
      <li>
        <Link
          href={"/login"}
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
          href={"/register"}
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
