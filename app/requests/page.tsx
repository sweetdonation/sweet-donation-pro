import Link from "next/link";
import { serverClient } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

export default async function Requests({ searchParams }:{ searchParams?: { zip?: string, urgency?: string }}){
  const supabase = serverClient();
  let query = supabase.from("requests").select("*").eq("fulfilled", false).order("created_at", { ascending: false });
  if (searchParams?.zip) query = query.eq("zip", searchParams.zip);
  if (searchParams?.urgency) query = query.eq("urgency", searchParams.urgency);
  const { data } = await query;

  return (
    <div className="container py-10 space-y-6">
      <form className="card p-4 flex flex-col md:flex-row gap-3" action="/requests">
        <input className="input md:w-64" name="zip" placeholder="Filter by ZIP" defaultValue={searchParams?.zip ?? ""}/>
        <select className="select md:w-48" name="urgency" defaultValue={searchParams?.urgency ?? ""}>
          <option value="">Any urgency</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <button className="btn btn-ghost">Apply</button>
        <Link href="/requests" className="btn btn-ghost">Clear</Link>
      </form>

      <div className="grid md:grid-cols-2 gap-4">
        {(data ?? []).map((r:any)=>(
          <div key={r.id} className="card p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-ink">{r.title}</h3>
              <span className="badge">{r.urgency}</span>
            </div>
            {r.description && <p className="text-sm text-neutral-700">{r.description}</p>}
            <div className="text-xs text-neutral-500">ZIP {r.zip} • {new Date(r.created_at).toLocaleString()}</div>
            <div className="flex flex-wrap gap-2 pt-1">{(r.items ?? []).map((i:string,idx:number)=>(<span key={idx} className="badge">{i}</span>))}</div>
            <div className="pt-2">
              <Link href={`/requests/${r.id}`} className="btn btn-primary">Offer help</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
