import React from "react";
import LoginFrom from "./LoginFrom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import GitHubLogin from "./GitHubLogin";
import GoogleLogin from "./GoogleLogin";
import Divider from "./Divider";

import Disclaimer from "./Disclaimer";

const LoginPage = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Welcome Back</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col space-y-8">
        <LoginFrom />
        <Divider />
        <div className="flex flex-col gap-2">
          <GitHubLogin />
          <GoogleLogin />
        </div>
        <Disclaimer />
      </CardContent>
    </Card>
  );
};

export default LoginPage;
