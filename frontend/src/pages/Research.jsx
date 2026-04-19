import React from "react";
import { AlertTriangle, Activity, Building2, Network } from "lucide-react";
import { useLang } from "../i18n";
import { Reveal } from "../components/Reveal";

const HERO_IMG = "https://images.pexels.com/photos/15290006/pexels-photo-15290006.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";

const Research = () => {
  const { t } = useLang();

  return (
    <div data-testid="page-research">
      <section className="container-anticiper pt-16 md:pt-24 pb-12">
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="overline">{t.research.overline}</p>
              <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl text-slate-900 font-light tracking-tight leading-[1.05]">
                {t.research.title}
              </h1>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100">
              <img src={HERO_IMG} alt="Research" className="w-full h-full object-cover photo-bw" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-anticiper py-16 md:py-20">
        <div className="grid lg:grid-cols-12 gap-10">
          <Reveal className="lg:col-span-4">
            <div className="flex items-center gap-2 text-[#E25A6E]">
              <AlertTriangle size={18} />
              <p className="font-mono-tactical text-xs uppercase tracking-wider">{t.research.observation_title}</p>
            </div>
            <h2 className="mt-4 font-display text-2xl md:text-3xl text-slate-900 font-semibold leading-tight">
              {t.research.observation_title}
            </h2>
          </Reveal>
          <div className="lg:col-span-8 space-y-4">
            {t.research.observations.map((o, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <div className="flex gap-4 p-6 rounded-2xl bg-slate-50 border border-slate-200/70" data-testid={`observation-${i}`}>
                  <span className="font-mono-tactical text-xs uppercase tracking-wider text-slate-400 shrink-0 mt-0.5">0{i + 1}</span>
                  <p className="text-slate-700 leading-relaxed">{o}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-anticiper py-16 md:py-20 border-t border-slate-200/70">
        <Reveal>
          <div className="flex items-center gap-2 text-[#34B2C8]">
            <Activity size={18} />
            <p className="font-mono-tactical text-xs uppercase tracking-wider">Activités</p>
          </div>
          <h2 className="mt-4 font-display text-2xl md:text-3xl text-slate-900 font-semibold max-w-3xl leading-tight">
            {t.research.activities_title}
          </h2>
        </Reveal>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {t.research.activities.map((a, i) => (
            <Reveal key={i} delay={(i % 2) * 0.08}>
              <div className="card-anticiper h-full" data-testid={`activity-${i}`}>
                <p className="font-mono-tactical text-xs uppercase tracking-wider text-[#34B2C8]">0{i + 1}</p>
                <p className="mt-4 text-slate-700 leading-relaxed">{a}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-anticiper py-16 md:py-20 border-t border-slate-200/70">
        <Reveal>
          <h2 className="font-display text-2xl md:text-3xl text-slate-900 font-semibold max-w-4xl leading-tight">
            {t.research.collab_title}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-10 rounded-3xl bg-[#0A0D11] text-white p-10 md:p-14 relative overflow-hidden">
            <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-[#34B2C8]/20 blur-3xl"></div>
            <div className="relative grid md:grid-cols-2 gap-10">
              <div>
                <div className="flex items-center gap-2 text-[#34B2C8]">
                  <Network size={18} />
                  <p className="font-mono-tactical text-xs uppercase tracking-wider">{t.research.process_intel.label}</p>
                </div>
                <p className="mt-4 text-slate-300 leading-relaxed">{t.research.process_intel.desc}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-[#34B2C8]">
                  <Building2 size={18} />
                  <p className="font-mono-tactical text-xs uppercase tracking-wider">{t.research.process_corp.label}</p>
                </div>
                <p className="mt-4 text-slate-300 leading-relaxed">{t.research.process_corp.desc}</p>
              </div>
            </div>
            <p className="mt-10 font-display text-xl md:text-2xl text-white/90 max-w-2xl">
              {t.research.processes_title}
            </p>
          </div>
        </Reveal>
      </section>
    </div>
  );
};

export default Research;
