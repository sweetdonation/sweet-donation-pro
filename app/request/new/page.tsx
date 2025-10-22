"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClient } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { useState } from "react";

const schema = z.object({
  title: z.string().min(3),
  zip: z.string().min(3),
  urgency: z.enum(["low","medium","high"]),
  items: z.string().min(2),
  description: z.string().optional()
});
type FormData = z.infer<typeof schema>;

export default function NewRequest(){
  const supabase = createClient();
  const router = useRouter();
  const [err, setErr] = useState<string|null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { urgency: "medium" }
  });

  const onSubmit = async (values: FormData) => {
    setErr(null);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setErr("Please log in first."); return; }
    const itemsArr = values.items.split(",").map(s=>s.trim()).filter(Boolean);
    const { error } = await supabase.from("requests").insert({
      user_id: user.id,
      title: values.title,
      zip: values.zip,
      urgency: values.urgency,
      items: itemsArr,
      description: values.description ?? null
    });
    if (error) setErr(error.message); else router.push("/dashboard");
  };

  return (
    <div className="container max-w-xl py-8">
      <div className="card p-6 space-y-3">
        <h1 className="text-2xl font-semibold">Request help</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <label className="label">Title</label>
            <input className="input" {...register("title")} placeholder="Groceries for the week"/>
            {errors.title && <p className="text-red-600 text-sm">{errors.title.message}</p>}
          </div>
          <div>
            <label className="label">ZIP</label>
            <input className="input" {...register("zip")} placeholder="e.g., 64108"/>
            {errors.zip && <p className="text-red-600 text-sm">{errors.zip.message}</p>}
          </div>
          <div>
            <label className="label">Urgency</label>
            <select className="select" {...register("urgency")}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div>
            <label className="label">Items needed (comma-separated)</label>
            <input className="input" {...register("items")} placeholder="groceries, baby formula"/>
            {errors.items && <p className="text-red-600 text-sm">{errors.items.message}</p>}
          </div>
          <div>
            <label className="label">Details (optional)</label>
            <textarea className="input min-h-32" {...register("description")} placeholder="Any allergies, family size, timing, etc."/>
          </div>
          <button disabled={isSubmitting} className="btn btn-primary w-full">{isSubmitting ? "Posting..." : "Post request"}</button>
          {err && <p className="text-red-600">{err}</p>}
        </form>
      </div>
    </div>
  );
}
