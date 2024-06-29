import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RegisterForm from "./RegisterUserForm";

const RegisterPage = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Register User</CardTitle>
      </CardHeader>
      <CardContent>
        <RegisterForm />
      </CardContent>
    </Card>
  );
};

export default RegisterPage;
