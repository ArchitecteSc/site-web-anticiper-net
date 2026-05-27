import React from "react";
import { ExternalLink } from "lucide-react";
import { useLang } from "../i18n";
import { Reveal } from "../components/Reveal";
import { OptimizedImage } from "../components/OptimizedImage";

const Operations = () => {
  const { t } = useLang();

  return (
    <div data-testid="page-operations">
      <section className="container-anticiper pt-16 md:pt-24 pb-12">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 space-y-6">
            <Reveal>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-slate-900 font-light tracking-tight leading-[1.05]">
                {t.operations.title}
              </h1>
              <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-xl">
                {t.operations.subtitle}
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <div
                className="rounded-2xl border border-slate-200/70 bg-white p-5 md:p-6"
                data-testid="operation-bpi-partner"
              >
                <p className="font-mono-tactical text-[10px] uppercase tracking-wider text-slate-400">
                  {t.operations.partnership_label}
                </p>
                <p className="mt-2 font-display text-base md:text-lg text-slate-900 font-semibold leading-snug">
                  {t.operations.partnership_title}
                </p>
                <a
                  href="https://lehub.bpifrance.fr/offre-de-services/accompagnement-operationnel/"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="bpi-france-link"
                  aria-label="BPI France - Operating Partner"
                  className="group mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#34B2C8] hover:text-[#2a9ab0] transition-colors"
                >
                  <span className="underline-offset-4 group-hover:underline">
                    {t.operations.partnership_cta}
                  </span>
                  <ExternalLink size={13} strokeWidth={2.25} className="shrink-0" />
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100">
              <OptimizedImage
                name="hero-operations"
                alt="Operations"
                className="w-full h-full object-cover photo-bw"
                loading="eager"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-anticiper py-12 md:py-16">
        <Reveal>
          <h2 className="font-display text-3xl sm:text-4xl text-slate-900 font-light tracking-tight leading-tight">
            {t.operations.services_title}
          </h2>
        </Reveal>

        <div className="mt-10 md:mt-12 space-y-6">
          {t.operations.items.map((it, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div
                className="rounded-3xl border border-slate-200/70 bg-white p-8 md:p-12 transition-all duration-300 hover:shadow-lg"
                data-testid={`operation-${i}`}
              >
                <h3 className="font-display text-2xl md:text-3xl text-slate-900 font-semibold leading-tight">
                  {it.title}
                </h3>
                <p className="mt-4 text-slate-600 leading-relaxed max-w-3xl">{it.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Operations;
