import { LoginForm } from "./LoginForm";

export const metadata = { title: "Login Admin - HasTrans" };

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-600 to-brand-800 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-7 shadow-xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt="HasTrans" className="mx-auto h-14 w-auto" />
        <h1 className="mt-4 text-center text-lg font-bold text-slate-900">Admin Panel</h1>
        <LoginForm />
      </div>
    </div>
  );
}
