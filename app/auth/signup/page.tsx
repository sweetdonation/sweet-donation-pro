"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabaseClient";

export default function SignupPage(){
  const supabase = createClient();
  const [name, setName] = useState("");
  const [zip, setZip] = useState("");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState<string|null>(null);

  async function handle(){
    setErr(null);
    // Use magic-link/OTP instead of password signup
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin + "/dashboard",
        data: { name, zip } // will be stored as user_metadata on first sign-in
      }
    });
    if (error) setErr(error.message); else setSent(true);
  }

  return (
    <div className="container max-w-md">
      <div className="card p-6 mt-10 space-y-3">
        <h1 className="text-2xl font-semibold">Create your account</h1>
        <label className="label">Name</label>
        <input className="input" value={name} onChange={e=>setName(e.target.value)} placeholder="Your name"/>
        <label className="label">ZIP code</label>
        <input className="input" value={zip} onChange={e=>setZip(e.target.value)} placeholder="e.g., 64108"/>
        <label className="label">Email</label>
        <input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com"/>
        <button onClick={handle} className="btn btn-primary w-full">Sign up</button>
        {sent && <p className="text-green-700">Check your email for the confirmation link.</p>}
        {err && <p className="text-red-600">{err}</p>}
      </div>
    </div>
  );
}
