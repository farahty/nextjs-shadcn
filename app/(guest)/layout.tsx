import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React, { FC, ReactNode } from "react";

export type GuestLayoutProps = {
  children: ReactNode;
};

const GuestLayout: FC<GuestLayoutProps> = ({ children }) => {
  return (
    <main className="flex m-2 mx-auto w-full h-[calc(100vh-20px)] max-w-md flex-col justify-center items-center ">
      {children}

      <Link
        className={buttonVariants({ variant: "link", className: "m-4" })}
        href="/"
      >
        &#8592; Back to home
      </Link>
    </main>
  );
};

export default GuestLayout;
