import Link from "next/link";
import React from "react";

const AppTitle = () => {
  return (
    <Link href="/" className="flex-grow flex items-center">
      <h5>Farahty App</h5>
    </Link>
  );
};

export default AppTitle;
