import Link from "next/link";
import Section from "@/components/Section";
import { Gift, HandHeart, Users } from "lucide-react";

export default function Home(){
  return (
    <>
      <section className="container py-16 grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <h1 className="text-5xl font-semibold leading-tight text-ink">Because kindness is contagious.</h1>
          <p className="text-lg text-neutral-700">
            When systems fail, people don’t have to. Sweet Donation connects families losing access to SNAP/WIC and essentials with neighbors who can help—quickly, safely, and with dignity.
          </p>
          <div className="flex gap-3">
            <Link href="/request/new" className="btn btn-primary">I need help</Link>
            <Link href="/requests" className="btn btn-ghost">I can help</Link>
          </div>
        </div>
        <div className="card p-6">
          <h3 className="text-xl font-medium mb-2">How it works</h3>
          <ul className="space-y-3 text-neutral-700">
            <li className="flex gap-3"><Users className="w-5 h-5 text-wood"/> Create a free account with your email.</li>
            <li className="flex gap-3"><Gift className="w-5 h-5 text-wood"/> Post a request or browse nearby families.</li>
            <li className="flex gap-3"><HandHeart className="w-5 h-5 text-wood"/> Connect safely and mark fulfilled when done.</li>
          </ul>
        </div>
      </section>

      <Section title="Built for dignity" subtitle="Your story is yours. Share only what you want.">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="card p-5"><h4 className="font-semibold mb-1">Privacy-first</h4><p className="text-neutral-700">We show only what’s needed to match help—never your email publicly.</p></div>
          <div className="card p-5"><h4 className="font-semibold mb-1">Local and fast</h4><p className="text-neutral-700">ZIP-code matching prioritizes nearby help first.</p></div>
          <div className="card p-5"><h4 className="font-semibold mb-1">Community-powered</h4><p className="text-neutral-700">Plug into local food banks and drives with one click.</p></div>
        </div>
      </Section>
    </>
  );
}
