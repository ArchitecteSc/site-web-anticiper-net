import React from "react";
import { Users, Clock, Sparkles, MapPin, ExternalLink } from "lucide-react";
import { useLang } from "../i18n";
import { Reveal } from "../components/Reveal";
import { OptimizedImage } from "../components/OptimizedImage";
import { Seo } from "../components/Seo";

const Training = () => {
  const { t, lang } = useLang();

  const seo = lang === "fr"
    ? {
        title: "Formation en intelligence économique",
        description: "Formations en intelligence économique, détection des actions d'ingérence et analyse de l'information stratégique. Plateforme numérique immersive et scénarios pédagogiques pour PME, grandes entreprises et établissements d'enseignement supérieur.",
        keywords: "formation intelligence économique, formation OSINT, formation veille stratégique, simulation intelligence économique, ingérence économique, signaux faibles formation",
      }
    : {
        title: "Strategic intelligence training",
        description: "Training in strategic intelligence, detection of interference operations and analysis of strategic information. Immersive digital platform and pedagogical scenarios for SMEs, large companies and higher education institutions.",
        keywords: "strategic intelligence training, OSINT training, strategic monitoring training, intelligence simulation, weak signals training",
      };

  return (
    <div data-testid="page-training">
      <Seo title={seo.title} description={seo.description} keywords={seo.keywords} path="/formation" />
      <section className="container-anticiper pt-6 md:pt-10 pb-12">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 space-y-6">
            <Reveal>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-slate-900 font-light tracking-tight leading-[1.05]">
                {t.training.title}
              </h1>
            </Reveal>
            <Reveal delay={0.08} className="space-y-5 text-slate-600 leading-relaxed text-base md:text-lg">
              <p>{t.training.intro}</p>
              <p>{t.training.intro_2}</p>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100">
              <OptimizedImage
                name="hero-formation"
                alt="Training"
                className="w-full h-full object-cover photo-bw"
                loading="eager"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-anticiper pb-12">
        <Reveal>
          <div className="rounded-2xl bg-slate-50 border border-slate-200/70 p-8 md:p-10">
            <div className="grid md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-8">
                <div className="flex items-center gap-2 text-[#34B2C8]">
                  <Sparkles size={18} />
                  <p className="font-mono-tactical text-xs uppercase tracking-wider">Web App Anticiper</p>
                </div>
                <p className="mt-4 font-display text-xl md:text-2xl text-slate-900 leading-snug">
                  Plateforme numérique immersive. Apprentissages par la résolution de problèmes en équipe.
                </p>
              </div>
              <div className="md:col-span-4 md:text-right">
                <a
                  href="https://anticiper.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="webapp-anticiper-link"
                  aria-label="Découvrir la Web App Anticiper sur anticiper.app (s'ouvre dans un nouvel onglet)"
                  className="group inline-flex items-center gap-2 rounded-full bg-white border border-slate-200 pl-5 pr-4 py-2.5 text-sm font-medium text-slate-900 transition-all duration-200 hover:border-[#34B2C8] hover:bg-[#34B2C8] hover:text-white hover:scale-[1.02] active:scale-[0.98] shadow-sm"
                >
                  <span>Découvrir la plateforme</span>
                  <span className="inline-flex items-center gap-1 font-mono-tactical text-[11px] uppercase tracking-wider text-[#34B2C8] group-hover:text-white">
                    anticiper.app
                    <ExternalLink size={13} strokeWidth={2.25} />
                  </span>
                </a>
                <p className="mt-2 text-[11px] text-slate-400">Site externe · s'ouvre dans un nouvel onglet</p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="container-anticiper py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-6">
          {t.training.scenarios.map((s, i) => (
            <Reveal key={s.code} delay={(i % 2) * 0.08}>
              <article
                className="group relative h-full rounded-2xl border border-slate-200/70 bg-white p-8 md:p-10 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                data-testid={`scenario-${i}`}
              >
                <div className="absolute top-6 right-6 text-[10rem] leading-none font-display font-light text-slate-100 select-none pointer-events-none">
                  0{i + 1}
                </div>
                <div className="relative">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#34B2C8]/10 text-[#34B2C8]">
                    <MapPin size={12} />
                    <span className="font-mono-tactical text-[10px] uppercase tracking-wider">{s.code}</span>
                  </div>
                  <h3 className="mt-5 font-display text-xl md:text-2xl text-slate-900 font-semibold leading-snug">
                    {s.title}
                  </h3>
                  <p className="mt-3 font-mono-tactical text-xs uppercase tracking-wider text-slate-500">
                    {s.scenario}
                  </p>
                  <p className="mt-4 text-slate-600 leading-relaxed">{s.desc}</p>

                  <div className="mt-6 pt-6 border-t border-slate-200/70">
                    <p className="font-mono-tactical text-xs uppercase tracking-wider text-slate-400 mb-3">
                      {t.common.modalities}
                    </p>
                    <ul className="space-y-2">
                      {s.modalities.map((m, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-slate-700">
                          {j === 0 ? (
                            <Users size={14} className="mt-0.5 text-[#34B2C8] shrink-0" />
                          ) : (
                            <Clock size={14} className="mt-0.5 text-[#34B2C8] shrink-0" />
                          )}
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                    {s.note && <p className="mt-4 text-xs text-slate-500 italic">{s.note}</p>}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Training;
