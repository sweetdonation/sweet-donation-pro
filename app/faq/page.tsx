import Section from "@/components/Section";
export default function FAQ(){
  return (
    <Section title="Frequently Asked Questions">
      <div className="card p-6 space-y-4">
        <div>
          <h3 className="font-semibold">Do I need to share my identity?</h3>
          <p className="text-neutral-700">No. Your email is never shown publicly. Share only what helps neighbors match your needs.</p>
        </div>
        <div>
          <h3 className="font-semibold">Is this free?</h3>
          <p className="text-neutral-700">Yes. Sweet Donation is built on free tiers and run by volunteers.</p>
        </div>
        <div>
          <h3 className="font-semibold">Are there local food banks?</h3>
          <p className="text-neutral-700">Yes—ask in your request or check community posts. We’ll add an integrated directory soon.</p>
        </div>
      </div>
    </Section>
  );
}
