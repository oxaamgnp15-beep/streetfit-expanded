'use client';
import dynamic from 'next/dynamic';
import { Button } from '@streetfit/ui';
const ThreeDViewer = dynamic(()=>import('../src/components/ThreeDViewer'),{ ssr:false });
export default function Home() {
  return (
    <main id="main" className="max-w-6xl mx-auto p-6">
      <section className="grid md:grid-cols-2 gap-6 items-center">
        <div>
          <h1 className="text-4xl font-bold">Train anywhere, get strong.</h1>
          <p className="mt-3 text-slate-600">Smart plans, realistic 3D demos, and offline timers that never drift.</p>
          <div className="mt-4 flex gap-3">
            <Button><a href="/exercises">Browse exercises</a></Button>
            <Button variant="secondary"><a href="/planner">Build a plan</a></Button>
          </div>
        </div>
        <div className="h-[340px] rounded-xl border">
          <ThreeDViewer/>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        "@context":"https://schema.org",
        "@type":"FitnessApplication",
        "name":"StreetFit",
        "applicationCategory":"HealthApplication",
        "offers":{"@type":"Offer","price":"0","priceCurrency":"USD"}
      })}}/>
    </main>
  );
}
