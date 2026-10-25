"use client";

import { useActionState } from "react";
import { loginAction } from "../actions";

export function LoginForm() {
  const [error, action, pending] = useActionState(loginAction, null);
  return (
    <form action={action} className="mt-5 grid gap-4">
      <label className="grid gap-1.5 text-sm font-medium text-slate-700">
        Password
        <input
          name="password"
          type="password"
          required
          autoFocus
          className="rounded-xl border border-slate-200 px-3.5 py-3 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
        />
      </label>
      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
      <button disabled={pending} className="rounded-xl bg-brand-600 py-3 font-semibold text-white hover:bg-brand-700 disabled:opacity-60">
        {pending ? "Masuk..." : "Masuk"}
      </button>
    </form>
  );
}
