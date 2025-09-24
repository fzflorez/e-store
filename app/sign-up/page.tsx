import { AuthForm } from "@/src/components/auth-form";
import { Card, CardHeader, CardTitle } from "@/src/components/ui/card";

const SignUpPage = () => {
  return (
    <div className="flex flex-col items-center justify-center pt-24">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle className="flex justify-center text-center text-2xl font-bold">
            Sign Up
          </CardTitle>
        </CardHeader>

        <AuthForm type="signUp" />
      </Card>
    </div>
  );
};

export default SignUpPage;
