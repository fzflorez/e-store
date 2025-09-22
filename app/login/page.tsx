import { AuthForm } from "@/src/components/auth-form";
import { Card, CardHeader, CardTitle } from "@/src/components/ui/card";

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle className="flex justify-center text-center text-2xl font-bold">
            Login
          </CardTitle>
        </CardHeader>

        <AuthForm type="login" />
      </Card>
    </div>
  );
};

export default LoginPage;
