"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabaseClient";

export default function LoginPage(){
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState<string|null>(null);

  async function handle(){
    setErr(null);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.origin + "/dashboard" }
    });
    if (error) setErr(error.message); else setSent(true);
  }

  return (
    <div className="container max-w-md">
      <div className="card p-6 mt-10 space-y-4">
        <h1 className="text-2xl font-semibold">Log in</h1>
        <input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" />
        <button onClick={handle} className="btn btn-primary w-full">Send login link</button>
        {sent && <p className="text-green-700">Check your email for a magic link / OTP.</p>}
        {err && <p className="text-red-600">{err}</p>}
        <p className="text-sm text-neutral-600">No account yet? <a className="underline" href="/auth/signup">Create one</a>.</p>
      </div>
    </div>
  );
}
