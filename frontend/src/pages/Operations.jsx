import React from "react";
import { useLang } from "../i18n";
import { Reveal } from "../components/Reveal";

const HERO_IMG = "https://customer-assets.emergentagent.com/job_vitrine-anticiper/artifacts/8i9hldvn_Image%202.png";

const Operations = () => {
  const { t } = useLang();

  return (
    <div data-testid="page-operations">
      <section className="container-anticiper pt-16 md:pt-24 pb-12">
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-slate-900 font-light tracking-tight leading-[1.05]">
                {t.operations.title}
              </h1>
              <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-xl">
                {t.operations.subtitle}
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100">
              <img src={HERO_IMG} alt="Operations" className="w-full h-full object-cover photo-bw" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-anticiper py-16 md:py-24 space-y-8">
        {t.operations.items.map((it, i) => (
          <Reveal key={i}>
            <div
              className="rounded-3xl border border-slate-200/70 bg-white p-8 md:p-12 transition-all duration-300 hover:shadow-lg"
              data-testid={`operation-${i}`}
            >
              <h2 className="font-display text-2xl md:text-3xl text-slate-900 font-semibold leading-tight">
                {it.title}
              </h2>
              <p className="mt-4 text-slate-600 leading-relaxed max-w-3xl">{it.desc}</p>
            </div>
          </Reveal>
        ))}
      </section>
    </div>
  );
};

export default Operations;
