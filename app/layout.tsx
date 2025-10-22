import "./globals.css";
import Nav from "@/components/Nav";

export const metadata = {
  title: "Sweet Donation — Neighbors helping neighbors",
  description: "Connect families in need with local donors for food and essentials.",
  openGraph: {
    title: "Sweet Donation",
    description: "Because kindness is contagious.",
    images: ["/icon.svg"]
  },
  metadataBase: new URL("https://sweetdonation.com")
};

export default function RootLayout({ children }: { children: React.ReactNode }){
  return (
    <html lang="en">
      <body>
        <Nav />
        <main>{children}</main>
        <footer className="border-t mt-16">
          <div className="container py-8 text-sm text-neutral-500 flex items-center justify-between">
            <div>© {new Date().getFullYear()} Sweet Donation</div>
            <div className="flex gap-4">
              <a href="/about">About</a>
              <a href="/faq">FAQ</a>
              <a href="/requests">Explore</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
