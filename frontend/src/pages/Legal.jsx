import React from "react";
import { useLang } from "../i18n";

const Legal = () => {
  const { t } = useLang();
  return (
    <div className="container-anticiper pt-16 md:pt-24 pb-24 max-w-3xl" data-testid="page-legal">
      <h1 className="font-display text-4xl sm:text-5xl text-slate-900 font-light">{t.legal.title}</h1>
      <p className="mt-8 text-slate-600 leading-relaxed">{t.legal.body}</p>
    </div>
  );
};

export default Legal;
