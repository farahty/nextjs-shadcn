import RegisterUserForm from "@/components/RegisterUserForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <main className="mt-2">
      <h1>Farahty home page</h1>

      <div className="grid grid-cols-2 gap-4">
        <div>users details</div>

        <Card>
          <CardHeader>
            <CardTitle>Register New User</CardTitle>
            <CardDescription>
              user information will be sent to server
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RegisterUserForm />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
