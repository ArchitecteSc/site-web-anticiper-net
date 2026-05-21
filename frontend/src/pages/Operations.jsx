import React from "react";
import { ExternalLink, Handshake } from "lucide-react";
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
          <React.Fragment key={i}>
            <Reveal>
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

            {i === 0 && (
              <Reveal delay={0.05}>
                <div
                  className="rounded-3xl border border-[#34B2C8]/30 bg-gradient-to-br from-[#34B2C8]/5 to-white p-8 md:p-12 transition-all duration-300 hover:shadow-lg"
                  data-testid="operation-bpi-partner"
                >
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 shrink-0 rounded-2xl bg-[#34B2C8]/15 flex items-center justify-center text-[#34B2C8]">
                      <Handshake size={22} />
                    </div>
                    <div className="flex-1">
                      <p className="font-mono-tactical text-xs uppercase tracking-wider text-[#34B2C8]">
                        Partenariat
                      </p>
                      <h2 className="mt-2 font-display text-2xl md:text-3xl text-slate-900 font-semibold leading-tight">
                        Anticiper est un Operating Partner de BPI France.
                      </h2>
                      <a
                        href="https://lehub.bpifrance.fr/offre-de-services/accompagnement-operationnel/"
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid="bpi-france-link"
                        aria-label="En savoir plus sur le site de BPI France (s'ouvre dans un nouvel onglet)"
                        className="group mt-6 inline-flex items-center gap-2 rounded-full bg-[#34B2C8] pl-5 pr-4 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-[#2a9ab0] hover:scale-[1.02] active:scale-[0.98] shadow-sm"
                      >
                        <span>En savoir plus sur le site de BPI France</span>
                        <ExternalLink size={14} strokeWidth={2.25} />
                      </a>
                      <p className="mt-2 text-[11px] text-slate-400">
                        Site externe · lehub.bpifrance.fr
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            )}
          </React.Fragment>
        ))}
      </section>
    </div>
  );
};

export default Operations;
