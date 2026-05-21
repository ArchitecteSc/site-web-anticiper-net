import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Target, GraduationCap, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { useLang } from "../i18n";
import { Reveal } from "../components/Reveal";

const HERO_IMG = "https://images.unsplash.com/photo-1681949287382-052ea3954a51?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjBicmFpbnN0b3JtaW5nfGVufDB8fHx8MTc3NjYyMzY0M3ww&ixlib=rb-4.1.0&q=85";

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
                <Quote size={22} className="text-[#34B2C8] mb-3" />
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
                  Détecter les signaux faibles avant qu'ils ne deviennent critiques.
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
          <div className="grid grid-cols-3 gap-8">
            {[
              { k: "5+", v: t.home.metrics.years },
              { k: "40+", v: t.home.metrics.clients },
              { k: "4", v: t.home.metrics.scenarios },
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

      {/* 3 piliers */}
      <section className="container-anticiper py-20 md:py-28">
        <div className="max-w-3xl">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-slate-900 font-light leading-tight">
            {t.home.pillars_title}
          </h2>
        </div>

        <div className="mt-14 grid md:grid-cols-2 gap-6">
          {[
            { Icon: Target, title: t.home.pillar_operations_title, desc: t.home.pillar_operations_desc, cta: t.home.pillar_operations_cta, to: "/appuis-operationnels", accent: "#34B2C8" },
            { Icon: GraduationCap, title: t.home.pillar_training_title, desc: t.home.pillar_training_desc, cta: t.home.pillar_training_cta, to: "/formation", accent: "#F5A623" },
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
                Parlons de votre contexte stratégique.
              </h3>
              <p className="mt-4 text-slate-300 leading-relaxed">
                Notre équipe vous rappelle sous 48 h ouvrées pour qualifier votre besoin.
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
