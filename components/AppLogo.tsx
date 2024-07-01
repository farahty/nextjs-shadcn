import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { PackageCheckIcon } from "lucide-react";

const AppLogo = () => {
  return (
    <Link href="/" className={buttonVariants({ variant: "link" })}>
      <PackageCheckIcon size={30} />
    </Link>
  );
};

export default AppLogo;
