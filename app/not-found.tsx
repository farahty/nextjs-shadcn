"use client";

import { usePathname } from "next/navigation";
import AuthLayout from "./(auth)/layout";

const NotFound = () => {
  const pathname = usePathname();

  return (
    <AuthLayout>
      <span>
        <strong>{pathname}</strong> Page not found 404
      </span>
    </AuthLayout>
  );
};

export default NotFound;
