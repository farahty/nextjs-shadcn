import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RegisterForm from "./RegisterUserForm";

const RegisterPage = () => {
  return (
    <main className="flex m-2 mx-auto w-full h-[calc(100vh-20px)] max-w-lg flex-col justify-center items-center ">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Register User</CardTitle>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>
    </main>
  );
};

export default RegisterPage;
