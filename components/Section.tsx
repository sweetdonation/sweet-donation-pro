export default function Section({title, subtitle, children}:{title:string, subtitle?:string, children?:React.ReactNode}){
  return (
    <section className="container py-12 space-y-4">
      <div>
        <h2 className="text-3xl font-semibold">{title}</h2>
        {subtitle && <p className="text-neutral-700 mt-1">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}
