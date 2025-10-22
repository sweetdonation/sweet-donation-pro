import Link from "next/link";
import { serverClient } from "@/lib/supabaseServer";

export default async function Dashboard(){
  const supabase = serverClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return (
    <div className="container max-w-md">
      <div className="card p-6 mt-10 space-y-3">
        <h1 className="text-2xl font-semibold">Please log in</h1>
        <Link href="/auth/login" className="btn btn-primary">Go to login</Link>
      </div>
    </div>
  );

  const { data: myRequests } = await supabase.from("requests").select("*").eq("user_id", user.id).order("created_at", { ascending: false });
  const { data: myOffers }   = await supabase.from("offers").select("*, requests(title)").eq("user_id", user.id).order("created_at", { ascending: false });

  return (
    <div className="container py-10 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Your dashboard</h1>
        <div className="flex gap-2">
          <Link href="/request/new" className="btn btn-primary">New request</Link>
          <Link href="/requests" className="btn btn-ghost">Explore</Link>
        </div>
      </div>

      <section>
        <h2 className="text-xl font-medium mb-3">My Requests</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {(myRequests ?? []).map((r:any)=>(
            <div key={r.id} className="card p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{r.title}</h3>
                {r.fulfilled ? <span className="badge">fulfilled</span> : <span className="badge">open</span>}
              </div>
              <p className="text-sm text-neutral-700 mt-1">{r.description}</p>
              <div className="text-xs text-neutral-500 mt-2">ZIP {r.zip} • {r.urgency} • {new Date(r.created_at).toLocaleString()}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-medium mb-3">My Offers</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {(myOffers ?? []).map((o:any)=>(
            <div key={o.id} className="card p-4">
              <h3 className="font-semibold">{o.requests?.title ?? "Offer"}</h3>
              <p className="text-sm text-neutral-700 mt-1">{o.message}</p>
              <div className="text-xs text-neutral-500 mt-2">Status: {o.status}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
