import Link from "next/link";
import { Suspense } from "react";
import LoginForm from "./_components/LoginForm";

const LoginPage = async () => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-6">
      <div>
        <Link href={"/"}>
          <h1 className="text-2xl text-center">Home</h1>
        </Link>
      </div>
      <Suspense fallback={<div>Loading login form...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
};

export default LoginPage;
