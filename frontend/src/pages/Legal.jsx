import React from "react";
import { useLang } from "../i18n";
import { Reveal } from "../components/Reveal";

const SECTIONS = [
  {
    number: "01",
    title: "Éditeur du site",
    body: (
      <>
        <p>Le site internet accessible à l'adresse www.anticiper.net est édité par :</p>
        <dl className="mt-4 grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-y-2 gap-x-6 text-slate-700">
          <dt className="font-medium text-slate-900">Raison sociale</dt><dd>Anticiper</dd>
          <dt className="font-medium text-slate-900">Forme juridique</dt><dd>Société par actions simplifiée unipersonnelle (SASU)</dd>
          <dt className="font-medium text-slate-900">Siège social</dt><dd>Impact – BP 12 – Rue George Besse – 78330 Fontenay-le-Fleury</dd>
          <dt className="font-medium text-slate-900">SIRET</dt><dd>885&nbsp;236&nbsp;141&nbsp;00010</dd>
          <dt className="font-medium text-slate-900">TVA intracommunautaire</dt><dd>FR46885236141</dd>
          <dt className="font-medium text-slate-900">Directeur de la publication</dt><dd>Thierry Assonion</dd>
          <dt className="font-medium text-slate-900">Email</dt>
          <dd><a href="mailto:contact@anticiper.net" className="text-[#34B2C8] hover:text-[#2a9ab0] underline-offset-4 hover:underline">contact@anticiper.net</a></dd>
        </dl>
      </>
    ),
  },
  {
    number: "02",
    title: "Hébergeur",
    body: (
      <>
        <p>Le site est hébergé par :</p>
        <dl className="mt-4 grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-y-2 gap-x-6 text-slate-700">
          <dt className="font-medium text-slate-900">Société</dt><dd>OVH SAS</dd>
          <dt className="font-medium text-slate-900">Adresse</dt><dd>2 rue Kellermann – 59100 Roubaix – France</dd>
          <dt className="font-medium text-slate-900">Téléphone</dt><dd>1007</dd>
          <dt className="font-medium text-slate-900">Site web</dt>
          <dd>
            <a href="https://www.ovhcloud.com" target="_blank" rel="noopener noreferrer" className="text-[#34B2C8] hover:text-[#2a9ab0] underline-offset-4 hover:underline">
              www.ovhcloud.com
            </a>
          </dd>
        </dl>
      </>
    ),
  },
  {
    number: "03",
    title: "Propriété intellectuelle",
    body: (
      <p>
        L'ensemble du contenu de ce site (textes, images, vidéos, logos, graphismes, structure, etc.) est la
        propriété exclusive de la société Anticiper ou de ses partenaires, et est protégé par les lois françaises
        et internationales relatives à la propriété intellectuelle. Toute reproduction, représentation,
        modification, publication, adaptation ou exploitation de tout ou partie des éléments du site, quel que
        soit le moyen ou le procédé utilisé, est interdite sans autorisation écrite préalable de la société
        Anticiper.
      </p>
    ),
  },
  {
    number: "04",
    title: "Activité de formation",
    body: (
      <p>
        Anticiper exerce une activité de conception et de commercialisation de formations en ligne. À ce titre,
        la société est susceptible d'être enregistrée en tant qu'organisme de formation conformément aux
        dispositions des articles L.6351-1 et suivants du Code du travail. Les formations proposées sur le site
        sont présentées à titre informatif. Pour toute demande, veuillez contacter :{" "}
        <a href="mailto:contact@anticiper.net" className="text-[#34B2C8] hover:text-[#2a9ab0] underline-offset-4 hover:underline">
          contact@anticiper.net
        </a>
        .
      </p>
    ),
  },
  {
    number: "05",
    title: "Liens hypertextes",
    body: (
      <p>
        Le site www.anticiper.net peut contenir des liens vers des sites tiers. Ces liens sont fournis à titre
        informatif uniquement. La société Anticiper n'exerce aucun contrôle sur ces sites et décline toute
        responsabilité quant à leur contenu, leurs pratiques ou leur politique de confidentialité.
      </p>
    ),
  },
  {
    number: "06",
    title: "Limitation de responsabilité",
    body: (
      <p>
        La société Anticiper met tout en œuvre pour assurer l'exactitude et la mise à jour des informations
        diffusées sur ce site. Elle se réserve toutefois le droit de modifier ces informations à tout moment et
        sans préavis. Anticiper ne saurait être tenue responsable des dommages directs ou indirects résultant de
        l'utilisation du site ou de l'impossibilité d'y accéder.
      </p>
    ),
  },
  {
    number: "07",
    title: "Droit applicable et juridiction compétente",
    body: (
      <p>
        Les présentes mentions légales sont soumises au droit français. En cas de litige, et à défaut de
        résolution amiable, les tribunaux français seront seuls compétents.
      </p>
    ),
  },
  {
    number: "08",
    title: "Contact",
    body: (
      <>
        <p>Pour toute question relative aux présentes mentions légales, vous pouvez nous contacter :</p>
        <ul className="mt-4 space-y-2 text-slate-700">
          <li>
            Par email :{" "}
            <a href="mailto:contact@anticiper.net" className="text-[#34B2C8] hover:text-[#2a9ab0] underline-offset-4 hover:underline">
              contact@anticiper.net
            </a>
          </li>
          <li>Par courrier : Impact – BP 12 – Rue George Besse – 78330 Fontenay-le-Fleury</li>
        </ul>
      </>
    ),
  },
];

const Legal = () => {
  useLang();
  return (
    <div className="container-anticiper pt-16 md:pt-24 pb-24 max-w-4xl" data-testid="page-legal">
      <Reveal>
        <h1 className="font-display text-4xl sm:text-5xl text-slate-900 font-light tracking-tight">
          Mentions légales
        </h1>
        <p className="mt-4 font-mono-tactical text-xs uppercase tracking-wider text-slate-500">
          Site : www.anticiper.net
        </p>
      </Reveal>

      <div className="mt-12 md:mt-16 space-y-12">
        {SECTIONS.map((s, i) => (
          <Reveal key={s.number} delay={i * 0.04}>
            <section className="border-t border-slate-200/70 pt-8" data-testid={`legal-section-${s.number}`}>
              <div className="flex items-baseline gap-4">
                <span className="font-mono-tactical text-sm font-bold text-[#34B2C8]">{s.number}</span>
                <h2 className="font-display text-xl md:text-2xl text-slate-900 font-semibold leading-tight">
                  {s.title}
                </h2>
              </div>
              <div className="mt-5 text-slate-600 leading-relaxed space-y-3 max-w-3xl">
                {s.body}
              </div>
            </section>
          </Reveal>
        ))}
      </div>
    </div>
  );
};

export default Legal;
