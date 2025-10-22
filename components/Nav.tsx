'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createClient } from '@/lib/supabaseClient';
import { useEffect, useState } from 'react';
import { Heart, MapPin } from 'lucide-react';
import clsx from 'clsx';

export default function Nav(){
  const path = usePathname();
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);
  useEffect(()=>{ supabase.auth.getUser().then(r=>setUser(r.data.user)); },[]);

  async function logout(){ await supabase.auth.signOut(); location.href = '/'; }

  const link = (href:string, label:string) => (
    <Link href={href} className={clsx("px-2 py-1 rounded-md hover:bg-neutral-100", path===href && "underline")}>{label}</Link>
  );

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
      <div className="container flex items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-2 text-wood">
          <Heart className="w-5 h-5" /><span className="font-semibold">Sweet Donation</span>
        </Link>
        <nav className="hidden md:flex items-center gap-2">
          {link('/requests','Explore')}
          {link('/request/new','Request Help')}
          {link('/about','About')}
          {link('/faq','FAQ')}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/requests" className="btn btn-ghost hidden sm:flex"><MapPin className="w-4 h-4"/> Find nearby</Link>
          {user
            ? <Link href="/dashboard" className="btn btn-primary">Dashboard</Link>
            : <Link href="/auth/login" className="btn btn-primary">Log in</Link>}
        </div>
      </div>
    </header>
  );
}
