import React from "react";
import { useLang } from "../i18n";
import { Reveal } from "../components/Reveal";

const TEAM = [
  {
    name: "Thierry Assonion",
    role_fr: "Président",
    role_en: "President",
    img: "https://www.anticiper.net/wp-content/uploads/2025/11/25F1244-scaled.jpg",
    bio_fr: `Ancien officier supérieur de l'armée de terre, breveté de l'école de guerre, expert du renseignement, Thierry Assonion est le fondateur du cabinet de conseil « Anticiper ». Depuis 2020, il apporte son expertise à des entreprises en développement sur de nouveaux marchés ou espaces géographiques ainsi qu'à des établissements de recherche comme l'INRIA ou l'Université Technologique de Compiègne. Expert de l'espace post-soviétique et concepteur de simulateurs d'analyse stratégique, il élabore également des formations à la vigilance, à la coopération inter-fonctions et à la gestion des signaux faibles. Thierry Assonion est également enseignant à l'École de Guerre Économique dans le domaine du Renseignement Humain.`,
    bio_en: `A former senior officer of the French Army, graduate of the War College and intelligence expert, Thierry Assonion is the founder of the advisory firm "Anticiper". Since 2020 he has brought his expertise to companies expanding into new markets or regions, as well as to research institutions such as INRIA or the University of Technology of Compiègne. An expert of the post-Soviet area and designer of strategic-analysis simulators, he also develops training on vigilance, cross-functional cooperation and weak-signal management. He teaches Human Intelligence at the École de Guerre Économique.`,
  },
  {
    name: "Abdul Hassib Sediqi",
    role_fr: "Directeur des opérations",
    role_en: "Chief Operating Officer",
    img: "https://www.anticiper.net/wp-content/uploads/2025/11/25F5617-718x1024.jpg",
    bio_fr: `Abdul Hassib Sediqi est directeur des opérations du cabinet de conseil Anticiper. Ancien officier général afghan, il a dirigé des services de sécurité, de renseignement et de gestion des risques dans un environnement marqué par la menace terroriste et de fortes contraintes politiques. Il y a conduit des réformes d'organisation, modernisé les méthodologies d'analyse, mis en place des dispositifs de gestion de crise et piloté de nombreux partenariats avec des acteurs étatiques et internationaux. Diplômé d'un Master en sécurité internationale de Sciences-Po Paris et d'une licence de droit de l'Université Lumière Lyon 2, il a également été formé à la Joint Special Operations University (Tampa, FL) et à la Naval Postgraduate School (Monterey, CA). Depuis 2022, il enseigne à Sciences-Po Lyon, à l'ILERI et à l'Université Catholique de Lyon.`,
    bio_en: `Abdul Hassib Sediqi is Anticiper's COO. A former Afghan general officer, he led security, intelligence and risk-management services in an environment marked by terrorist threats and high political constraints. He drove organisational reforms, modernised analytical methodologies, put in place crisis-management dispositions and led numerous partnerships with state and international actors. He holds a Master's degree in international security from Sciences-Po Paris and a law degree from Université Lumière Lyon 2, and was trained at the Joint Special Operations University (Tampa, FL) and Naval Postgraduate School (Monterey, CA). Since 2022 he has been lecturing at Sciences-Po Lyon, ILERI and the Catholic University of Lyon.`,
  },
  {
    name: "Eva Crück",
    role_fr: "Directrice de l'innovation",
    role_en: "Chief Innovation Officer",
    img: "https://www.anticiper.net/wp-content/uploads/2025/11/25F5625-scaled.jpg",
    bio_fr: `Ingénieur avec 25 ans d'expérience au sein de la Direction Générale de l'Armement (DGA, ministère des armées), Eva Crück pilote les développements informatiques et les projets d'innovation technologique pour Anticiper. Docteur en mathématiques appliquées spécialisée dans l'innovation et la recherche sur le numérique, elle a accompagné des dizaines d'équipes de recherche, de PME et de startups dans la conception et la réalisation de leurs projets. Depuis 2024, elle est passée de l'autre côté du miroir pour continuer à préparer l'avenir par d'autres moyens. Eva Crück a aussi fondé la société scriptorium numeriae, un bureau d'étude spécialisé dans les liens entre jeux numériques et jeux littéraires à l'ère de l'IA générative.`,
    bio_en: `An engineer with 25 years of experience at the French Defence Procurement Agency (DGA, Ministry of Armed Forces), Eva Crück leads the software development and technology-innovation projects of Anticiper. A PhD in applied mathematics specialised in digital innovation, she has supported dozens of research teams, SMEs and startups in designing and building their projects with defence applications. Since 2024 she has moved to "the other side of the mirror" to keep preparing the future by other means. Eva also founded scriptorium numeriae, a research firm dedicated to the links between digital games and literary games in the era of generative AI.`,
  },
  {
    name: "Céline Bougeant",
    role_fr: "Directrice Juridique, Administrative & Financière",
    role_en: "Legal, Administrative & Financial Director",
    img: "https://www.anticiper.net/wp-content/uploads/2025/11/25F4541-1-scaled.jpg",
    bio_fr: `Titulaire d'un DEA en droit des contrats de la Sorbonne (Paris II), et d'une solide expérience commerciale, Céline Bougeant est spécialisée en droit contractuel et droit administratif. Elle accompagne la rédaction, la négociation et la gestion de conventions complexes, et supervise les aspects administratifs et financiers, garantissant une gestion cohérente et sécurisée des opérations de l'entreprise. Elle intervient dans la prévention des risques contractuels, la conformité et la gestion des litiges. Céline privilégie une approche pragmatique, combinant expertise juridique et vision stratégique.`,
    bio_en: `Holding a Master's in contract law from the Sorbonne (Paris II) and a strong commercial track-record, Céline Bougeant specialises in contract law and administrative law. She supports the drafting, negotiation and management of complex agreements, and oversees administrative and financial matters, ensuring consistent and secure operations. She also intervenes in contractual-risk prevention, compliance and litigation management. Céline favours a pragmatic approach, combining legal expertise with strategic vision.`,
  },
  {
    name: "Thibaut Milewski",
    role_fr: "Competitive Intelligence Manager",
    role_en: "Competitive Intelligence Manager",
    img: "https://www.anticiper.net/wp-content/uploads/2025/11/25F4524-scaled.jpg",
    bio_fr: `Diplômé d'un premier master de l'École Supérieure du Commerce Extérieur, puis d'un second master d'Études Stratégiques, Sécurité et Politique de Défense de l'école des Hautes Études Internationales et Politiques, Thibaut Milewski débute sa carrière au sein du Centre Interarmées de Concepts, de Doctrines et d'Expérimentations. Spécialiste des dispositifs de simulation et d'exploitation de données représentatives du renseignement, il collabore avec Anticiper depuis 2021, notamment pour l'élaboration et l'animation des formations. Expert OSINT, il participe à la collecte et l'analyse d'informations dans le cadre de l'appui opérationnel des entreprises par les équipes d'Anticiper.`,
    bio_en: `A graduate of the École Supérieure du Commerce Extérieur and of a Master's in Strategic Studies, Security and Defence Policy from the École des Hautes Études Internationales et Politiques, Thibaut Milewski started his career at the French Joint Centre for Concepts, Doctrines and Experimentation. A specialist of intelligence-simulation and data-exploitation systems, he has been collaborating with Anticiper since 2021, notably on the design and delivery of training. An OSINT expert, he contributes to collection and analysis within Anticiper's operational-support missions.`,
  },
  {
    name: "Owen Pottiez",
    role_fr: "Junior Consultant",
    role_en: "Junior Consultant",
    img: "https://www.anticiper.net/wp-content/uploads/2025/11/25F1227-1365x2048.jpg",
    bio_fr: `Étudiant à l'École de Guerre Économique, Owen Pottiez se spécialise dans les domaines de la collecte de données et l'analyse d'informations. Passionné d'OSINT, il contribue aux missions d'appui informationnel de l'entreprise.`,
    bio_en: `A student at the École de Guerre Économique, Owen Pottiez specialises in data collection and information analysis. Passionate about OSINT, he contributes to the company's information-support missions.`,
  },
];

const About = () => {
  const { t, lang } = useLang();

  return (
    <div data-testid="page-about">
      <section className="container-anticiper pt-16 md:pt-24 pb-10">
        <Reveal>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-slate-900 font-light tracking-tight">
            {t.about.title}
          </h1>
        </Reveal>
      </section>

      <section className="container-anticiper py-10 md:py-16 border-t border-slate-200/70">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <Reveal className="lg:col-span-5">
            <h2 className="font-display text-2xl md:text-3xl text-slate-900 font-semibold">
              {t.about.h2_activities}
            </h2>
          </Reveal>
          <div className="lg:col-span-7 space-y-5 text-slate-600 leading-relaxed">
            <Reveal delay={0.05}><p>{t.about.activities_p1}</p></Reveal>
            <Reveal delay={0.1}><p>{t.about.activities_p2}</p></Reveal>
            <Reveal delay={0.15}><p>{t.about.activities_p3}</p></Reveal>
            <Reveal delay={0.2}><p>{t.about.activities_p4}</p></Reveal>
          </div>
        </div>
      </section>

      <section className="container-anticiper py-16 md:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEAM.map((m, i) => (
            <Reveal key={m.name} delay={(i % 3) * 0.08}>
              <article
                className="group rounded-2xl overflow-hidden border border-slate-200/70 bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                data-testid={`team-card-${i}`}
              >
                <div className="aspect-[4/5] overflow-hidden bg-slate-100">
                  <img
                    src={m.img}
                    alt={m.name}
                    className="w-full h-full object-cover photo-bw group-hover:scale-[1.02] transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <p className="font-mono-tactical text-xs uppercase tracking-wider text-[#34B2C8]">
                    {lang === "fr" ? m.role_fr : m.role_en}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-semibold text-slate-900">{m.name}</h3>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed line-clamp-6">
                    {lang === "fr" ? m.bio_fr : m.bio_en}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
