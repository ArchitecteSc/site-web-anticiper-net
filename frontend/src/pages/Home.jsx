import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Target, GraduationCap, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { useLang } from "../i18n";
import { Reveal } from "../components/Reveal";

const HERO_IMG = "https://customer-assets.emergentagent.com/job_vitrine-anticiper/artifacts/12e1896f_Image1.png";

const Home = () => {
  const { t } = useLang();

  return (
    <div data-testid="page-home">
      {/* Hero asymétrique */}
      <section className="relative overflow-hidden">
        <div className="container-anticiper pt-20 md:pt-28 pb-20 md:pb-28">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end">
            <div className="lg:col-span-7">
              <motion.h1
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.08 }}
                className="font-display font-light text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-slate-900 tracking-tight"
              >
                {t.home.title_1}
                <br />
                <span className="font-semibold">{t.home.title_2}</span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.18 }}
                className="mt-10 max-w-xl"
              >
                <p className="text-slate-600 leading-relaxed italic">{t.home.intro}</p>
                <p className="mt-3 text-slate-600 leading-relaxed italic">{t.home.intro_2}</p>
                <p className="mt-4 text-sm font-mono-tactical uppercase tracking-wider text-slate-500">
                  — {t.home.founder}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.28 }}
                className="mt-10 flex flex-wrap gap-3"
              >
                <Link to="/contact" className="btn-primary" data-testid="home-cta-primary">
                  {t.nav.cta} <ArrowRight size={16} />
                </Link>
                <Link to="/qui-sommes-nous" className="btn-outline" data-testid="home-cta-team">
                  {t.common.seeTeam}
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-slate-100">
                <img src={HERO_IMG} alt="Analyse stratégique" className="w-full h-full object-cover photo-bw" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent" />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl border border-slate-200/70 shadow-lg p-5 w-64">
                <p className="font-display text-slate-900 font-semibold leading-snug">
                  {t.home.floating_badge}
                </p>
              </div>
              <div className="hidden lg:block absolute -top-4 -right-4 h-24 w-24 rounded-full border border-[#34B2C8]/40"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Metrics bande */}
      <section className="border-y border-slate-200/70 bg-slate-50">
        <div className="container-anticiper py-10">
          <div className="grid grid-cols-2 gap-8 max-w-2xl mx-auto text-center">
            {[
              { k: "5+", v: t.home.metrics.years },
              { k: "40+", v: t.home.metrics.clients },
            ].map((m, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <div data-testid={`metric-${i}`}>
                  <p className="font-display text-4xl md:text-5xl text-slate-900 font-light">{m.k}</p>
                  <p className="mt-2 text-xs font-mono-tactical uppercase tracking-wider text-slate-500">{m.v}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Notre Approche */}
      <section className="container-anticiper py-20 md:py-28">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <Reveal className="lg:col-span-5">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-slate-900 font-light leading-[1.05] tracking-tight">
              {t.home.approach_title}
            </h2>
            <div className="mt-6 h-1 w-16 bg-[#34B2C8] rounded-full" />
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal delay={0.05}>
              <blockquote className="relative pl-6 border-l-2 border-slate-900">
                <p className="font-display text-xl md:text-2xl text-slate-900 italic leading-snug">
                  {t.home.approach_quote}
                </p>
              </blockquote>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-8 text-slate-600 leading-relaxed text-base md:text-lg">
                {t.home.approach_text_1}
                <strong className="font-semibold text-slate-900">{t.home.approach_text_strong_1}</strong>
                {t.home.approach_text_2}
                <strong className="font-semibold text-slate-900">{t.home.approach_text_strong_2}</strong>
                {t.home.approach_text_3}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Nos Prestations */}
      <section className="bg-slate-50 border-y border-slate-200/70">
        <div className="container-anticiper py-20 md:py-28">
          <Reveal>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-slate-900 font-light leading-tight tracking-tight">
              {t.home.services_title}
            </h2>
          </Reveal>

          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {t.home.services.map((s, i) => (
              <Reveal key={s.step} delay={i * 0.08}>
                <article
                  className="relative h-full rounded-2xl bg-white border border-slate-200/70 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  data-testid={`service-${i}`}
                >
                  <div className="px-8 md:px-10 py-6 bg-[#34B2C8]/8 border-b border-[#34B2C8]/15">
                    <p
                      className="font-display text-3xl md:text-4xl font-semibold leading-none"
                      style={{ color: "#34B2C8" }}
                    >
                      {s.step}
                    </p>
                  </div>
                  <div className="px-8 md:px-10 py-8 flex-1 flex flex-col">
                    <h3 className="font-display text-xl md:text-2xl text-slate-900 font-semibold leading-tight">
                      {s.title}
                    </h3>
                    <p className="mt-4 text-slate-600 leading-relaxed">{s.desc}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="container-anticiper py-20 md:py-28">
        <div className="max-w-3xl">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-slate-900 font-light leading-tight">
            {t.home.pillars_title}
          </h2>
        </div>

        <div className="mt-14 grid md:grid-cols-2 gap-6">
          {[
            { Icon: GraduationCap, title: t.home.pillar_training_title, desc: t.home.pillar_training_desc, cta: t.home.pillar_training_cta, to: "/formation", accent: "#F5A623" },
            { Icon: Target, title: t.home.pillar_operations_title, desc: t.home.pillar_operations_desc, cta: t.home.pillar_operations_cta, to: "/appuis-operationnels", accent: "#34B2C8" },
          ].map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <div className="card-anticiper h-full flex flex-col" data-testid={`pillar-${i}`}>
                <div
                  className="h-12 w-12 rounded-xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${p.accent}15`, color: p.accent }}
                >
                  <p.Icon size={22} />
                </div>
                <h3 className="font-display text-2xl text-slate-900 font-semibold leading-tight">{p.title}</h3>
                <p className="mt-4 text-slate-600 leading-relaxed flex-1">{p.desc}</p>
                <Link
                  to={p.to}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-slate-900 group"
                  data-testid={`pillar-${i}-cta`}
                >
                  <span className="group-hover:text-[#34B2C8] transition-colors">{p.cta}</span>
                  <ArrowRight size={16} className="group-hover:translate-x-0.5 group-hover:text-[#34B2C8] transition-all" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="container-anticiper pb-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-[#0A0D11] text-white p-10 md:p-16">
            <div className="absolute inset-0 opacity-30">
              <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-[#34B2C8]/30 blur-3xl"></div>
            </div>
            <div className="relative max-w-2xl">
              <h3 className="font-display text-3xl md:text-4xl font-light leading-tight">
                {t.home.final_cta_title}
              </h3>
              <p className="mt-4 text-slate-300 leading-relaxed">
                {t.home.final_cta_text}
              </p>
              <Link to="/contact" className="mt-8 btn-primary" data-testid="home-final-cta">
                {t.nav.cta} <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
};

export default Home;
