import React from "react";
import { Search, Eye, Shield } from "lucide-react";
import { useLang } from "../i18n";
import { Reveal } from "../components/Reveal";

const ICONS = [Search, Eye, Shield];
const HERO_IMG = "https://images.pexels.com/photos/7710050/pexels-photo-7710050.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";

const Operations = () => {
  const { t } = useLang();

  return (
    <div data-testid="page-operations">
      <section className="container-anticiper pt-16 md:pt-24 pb-12">
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="overline">{t.operations.overline}</p>
              <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl text-slate-900 font-light tracking-tight leading-[1.05]">
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
        {t.operations.items.map((it, i) => {
          const Icon = ICONS[i] || Search;
          const reverse = i % 2 === 1;
          return (
            <Reveal key={i}>
              <div
                className={`grid md:grid-cols-12 gap-8 items-start rounded-3xl border border-slate-200/70 bg-white p-8 md:p-12 transition-all duration-300 hover:shadow-lg`}
                data-testid={`operation-${i}`}
              >
                <div className={`md:col-span-2 ${reverse ? "md:order-2" : ""}`}>
                  <div className="h-14 w-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "#34B2C815", color: "#34B2C8" }}>
                    <Icon size={22} />
                  </div>
                  <p className="mt-4 font-mono-tactical text-xs uppercase tracking-wider text-slate-400">
                    0{i + 1} / 0{t.operations.items.length}
                  </p>
                </div>
                <div className={`md:col-span-10 ${reverse ? "md:order-1" : ""}`}>
                  <h2 className="font-display text-2xl md:text-3xl text-slate-900 font-semibold leading-tight">
                    {it.title}
                  </h2>
                  <p className="mt-4 text-slate-600 leading-relaxed max-w-3xl">{it.desc}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </section>
    </div>
  );
};

export default Operations;
