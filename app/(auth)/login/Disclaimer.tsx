import Link from "next/link";

const Disclaimer = () => {
  return (
    <p className="px-8 text-center text-sm text-muted-foreground">
      By clicking continue, you agree to our{" "}
      <Link
        className="underline underline-offset-4 hover:text-primary"
        href="/terms"
      >
        Terms of Service
      </Link>
      {" and "}
      <Link
        className="underline underline-offset-4 hover:text-primary"
        href="/privacy"
      >
        Privacy Policy
      </Link>
      .
    </p>
  );
};

export default Disclaimer;
