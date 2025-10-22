"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabaseClient";
import { useParams, useRouter } from "next/navigation";

export default function RequestDetail(){
  const { id } = useParams<{id:string}>();
  const supabase = createClient();
  const router = useRouter();
  const [row, setRow] = useState<any>(null);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState<string|null>(null);

  useEffect(()=>{
    (async()=>{
      const { data } = await supabase.from("requests").select("*").eq("id", id).single();
      setRow(data);
    })();
  },[id]);

  async function offer(){
    setErr(null);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user){ setErr("Please log in."); return; }
    const { error } = await supabase.from("offers").insert({ user_id: user.id, request_id: id, message: msg });
    if (error) setErr(error.message);
    else router.push("/dashboard");
  }

  if (!row) return <div className="container py-10">Loading…</div>;

  return (
    <div className="container max-w-2xl py-10">
      <div className="card p-6 space-y-4">
        <h1 className="text-2xl font-semibold">{row.title}</h1>
        <div className="flex flex-wrap gap-2">{(row.items ?? []).map((i:string, idx:number)=>(<span key={idx} className="badge">{i}</span>))}</div>
        {row.description && <p className="text-neutral-700">{row.description}</p>}
        <div className="text-sm text-neutral-500">ZIP {row.zip} • urgency {row.urgency}</div>
        <div className="space-y-2 pt-2">
          <label className="label">Message to requester</label>
          <textarea className="input min-h-28" value={msg} onChange={e=>setMsg(e.target.value)} placeholder="Say what you can help with and timing"/>
          <button onClick={offer} className="btn btn-primary w-full">Offer help</button>
          {err && <p className="text-red-600">{err}</p>}
        </div>
      </div>
    </div>
  );
}
