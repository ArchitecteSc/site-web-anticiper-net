import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const LS_KEY = "anticiper.lang";

export const translations = {
  fr: {
    nav: {
      home: "Accueil",
      about: "Qui sommes-nous ?",
      operations: "Appui opérationnel",
      training: "Formation",
      research: "Recherche",
      contact: "Contact",
      cta: "Nous contacter",
    },
    common: {
      learnMore: "En savoir plus",
      seeTeam: "Découvrir l'équipe",
      readMore: "Lire la suite",
      modalities: "Modalités",
      backTop: "Retour en haut",
      scroll: "Défiler",
    },
    home: {
      overline: "Cabinet de conseil",
      title_1: "Anticiper les signaux,",
      title_2: "sécuriser vos décisions.",
      intro:
        "« Dans un monde en mutation rapide sous l'effet des nouvelles technologies, des évolutions sociétales et des bouleversements géopolitiques, il est indispensable de mobiliser toutes les énergies à la compréhension des évolutions de l'écosystème externe de l'entreprise.",
      intro_2:
        "ANTICIPER a élaboré une approche robuste, marquée par l'ADN défense de notre équipe, pour identifier et traiter au plus tôt les signaux porteurs de risques ou d'opportunités. »",
      founder: "Thierry Assonion, fondateur Anticiper",
      pillars_overline: "Nos trois piliers",
      pillars_title: "Une offre complète, de la formation à l'action.",
      pillar_operations_title: "Appui opérationnel",
      pillar_operations_desc:
        "Anticiper accompagne les entreprises et entités publiques depuis 2020 dans la mise en place de dispositifs de collecte et d'analyse de l'information stratégique.",
      pillar_operations_cta: "Nos appuis opérationnels",
      pillar_training_title: "Formation",
      pillar_training_desc:
        "Anticiper forme à la détection des actions d'ingérence et à l'analyse de l'information des établissements d'enseignement supérieur, des entités publiques, de PME, des start-ups et des Grandes Entreprises.",
      pillar_training_cta: "Notre catalogue de formation",
      pillar_research_title: "Recherche",
      pillar_research_desc:
        "Anticiper développe et anime une plateforme logicielle simulant un dispositif de collecte et d'analyse de l'information stratégique utilisée par des centres de recherche, des industriels et des sociétés innovantes.",
      pillar_research_cta: "Nos activités pour la recherche",
      metrics: {
        years: "ans d'accompagnement",
        clients: "clients accompagnés",
        scenarios: "scénarios pédagogiques",
        partners: "partenaires académiques",
      },
      approach_overline: "Notre Approche",
      approach_title: "Notre Approche",
      approach_quote:
        "Une entreprise formée économise ses moyens et concentre ses efforts là où ils sont réellement nécessaires.",
      approach_text_1: "Nous formons les entreprises pour qu'elles puissent répondre de manière ",
      approach_text_strong_1: "autonome",
      approach_text_2: " à leurs besoins en informations stratégiques et en ",
      approach_text_strong_2: "matière de protection",
      approach_text_3: " — et, si nécessaire, recourir de manière pertinente à nos services d'anticipation, de protection ou d'influence.",
      services_title: "Nos Prestations",
      services: [
        {
          step: "01",
          title: "Former",
          desc: "Transmettre des méthodes solides et des réflexes durables en matière d'intelligence économique.",
        },
        {
          step: "02",
          title: "Structurer",
          desc: "Mettre en place des dispositifs concrets adaptés à l'entreprise en matière d'anticipation, de recherche d'informations et de protection.",
        },
        {
          step: "03",
          title: "Déployer",
          desc: "Prendre le relais opérationnel pour obtenir l'information nécessaire, décrypter une situation à risque ou renforcer la communication d'influence.",
        },
      ],
    },
    about: {
      overline: "Notre équipe",
      title: "Notre équipe",
      h2_activities: "Nos activités",
      activities_p1:
        "Anticiper est un cabinet de conseils et de services aux entreprises.",
      activities_p2:
        "Nous développons une offre complète, de la formation à l'action opérationnelle, dans le domaine de la collecte et du traitement de l'information stratégique.",
      activities_p3:
        "Nous concentrons nos efforts sur le renforcement des capacités des managers à « lire » des situations complexes et volatiles, en mobilisant les talents et compétences des membres de leur équipe avec une vision prospective.",
      activities_p4:
        "L'objectif est de donner des clés permettant de conserver l'initiative de l'action, évitant ainsi de subir les évènements en situation de réaction.",
    },
    operations: {
      overline: "Appui opérationnel",
      title: "Appui opérationnel",
      subtitle:
        "Des dispositifs sur-mesure pour collecter, analyser et exploiter l'information stratégique.",
      items: [
        {
          title: "Appui à la mise en place d'une cellule de veille",
          desc:
            "Anticiper propose une méthodologie et met en œuvre des outils permettant aux entreprises de collecter et d'analyser de manière autonome l'information stratégique nécessaire à leur développement.",
        },
        {
          title: "Collecte et analyse d'informations stratégiques pour les entreprises",
          desc:
            "Identifier et suivre les évolutions de son écosystème externe pour mieux l'influencer et accélérer ses ventes (Due Diligence, veille stratégique, enquête de réputation, renseignement financier).",
        },
        {
          title: "Protection de marques",
          desc:
            "Surveillance complète sur le web de l'utilisation de vos marques déposées ou de tout autre mot-clé d'intérêt (technologie, produits, concepts, brevets…).",
        },
      ],
    },
    training: {
      overline: "Formation",
      title: "Formation",
      intro:
        "Depuis 2020, Anticiper contribue à former à la collecte et à l'analyse de l'information stratégique des entités publiques, organismes de recherche ou de l'enseignement supérieur, PME, start-ups et grandes entreprises.",
      intro_2:
        "Afin d'améliorer la qualité de nos actions de formation, nous avons développé une plateforme numérique immersive (Web App), véritable cœur de la méthode « Anticiper ». Les joueurs sont immergés dans une situation fictive représentative de la réalité. Les apprentissages se font grâce à la résolution de problèmes en équipe, de manière autonome. Les expériences de jeu renforcent la cohésion du groupe.",
      scenarios: [
        {
          code: "PUNO",
          title: "Anticipation, Intelligence Économique de terrain & Gestion de crise réputationnelle",
          scenario: "Scénario Puno",
          desc:
            "Vous appartenez à une ONG active au Pérou, spécialisée dans l'extraction de l'or de manière éthique. Les informations que vous parviendrez à collecter en équipe auprès d'un réseau de personnes de confiance seront essentielles pour justifier le maintien de votre mission en Amérique du Sud et déceler les signaux faibles précurseurs d'une attaque en réputation.",
          modalities: ["5 à 20 auditeurs", "1 à 2 jours"],
          note: "Les joueurs se connectent à notre application Web dédiée« Anticiper ». Chaque membre de l'ONG est joué par un binôme. L'IA sera utiliséepour accélérer le rythme de production des livrables et leur qualité.",
        },
        {
          code: "STRATEGIS",
          title: "Stratégie d'entreprise & Competitive Intelligence",
          scenario: "Scénario Strategis",
          desc:
            "Vous êtes membre du CODIR d'une entreprise, dont le dirigeant souhaite tripler le chiffre d'affaires sur 5 ans. Vous collectez et analysez les informations nécessaires à l'élaboration de scénarios de croissance et aux chantiers de transformation à mettre en œuvre.",
          modalities: ["5 à 20 auditeurs", "1 à 2 jours"],
          note: "Les joueurs se connectent à notre application Web dédiée « Anticiper ». Chaque membre du CODIR est joué par un binôme.",
        },
        {
          code: "SECURE TRAIL",
          title: "Protection des entreprises",
          scenario: "Scénario Secure Trail",
          desc:
            "Vous appartenez à une PME développant une technologie de rupture sensible. Vous devez rechercher des financements, gérer votre RH et votre communication tout en détectant les risques et les menaces en provenance de votre écosystème externe.",
          modalities: ["5 à 20 auditeurs", "1 à 2 jours"],
          note: "",
        },
        {
          code: "GEO-CRISIS",
          title: "Anticipation & Gestion de crise",
          scenario: "Crise géopolitique",
          desc:
            "Immersion d'une équipe dans la gestion d'une crise géopolitique. Chaque auditeur incarne le rôle d'un analyste du renseignement au sein d'un centre de suivi de crise de l'Union Européenne.",
          modalities: [
            "8 à 20 auditeurs",
            "Cycle du renseignement : 1 journée",
            "Exercice de restitution : 2 à 3 jours",
            "3 scénarios : Balkans / Soudan / Pays Baltes",
          ],
          note: "",
        },
      ],
    },
    research: {
      overline: "Recherche & Technologie",
      title: "Recherche & Technologie",
      observation_title: "Notre constat",
      observations: [
        "Complexité pour la recherche et l'industrie à comprendre les enjeux du processus d'analyse de l'information stratégique.",
        "Absence d'environnement d'expérimentation pour tester et améliorer les outils de traitement de l'information stratégique (ergonomie, collaborativité, visualisation, renforcement des capacités d'analyse grâce à l'IA).",
        "Accès limité à la réalité des métiers liés au renseignement ou de l'intelligence économique et stratégique.",
      ],
      activities_title: "Nos activités au profit du monde de la recherche et du numérique",
      activities: [
        "Élaboration d'environnements numériques d'analyse fictifs, mais représentatifs de la réalité et des enjeux du cycle de production de l'information stratégique.",
        "Expérimentation d'outils de visualisation et d'aide à l'analyse, en particulier par l'intégration de l'Intelligence Artificielle Générative à différents moments du processus de production du renseignement.",
        "Création de tous types de scénarios de renseignement avec des données non protégées.",
        "Compréhension par la pratique des enjeux de l'exploitation de l'information et du renseignement pour différents publics (recherche, industrie, commanditaires, médias).",
      ],
      collab_title:
        "Notre application web de formation est le fruit de notre collaboration scientifique et technique avec l'unité de recherche Costech de l'Université de Technologie de Compiègne.",
      processes_title: "Quels sont les processus simulés ?",
      process_intel: {
        label: "Milieu Renseignement",
        desc:
          "Le chef opérationnel pose une question. Le plateau d'analystes exploite ses bases de données, oriente ses capteurs, analyse les informations collectées par les capteurs et formule une réponse au chef opérationnel.",
      },
      process_corp: {
        label: "Milieu Entreprise",
        desc:
          "Le CODIR exprime un besoin en information actionnable auprès de sa cellule de veille. Cette dernière sollicite un réseau de collaborateurs de confiance de l'entreprise sur le terrain, exploite les sources ouvertes et formule une réponse au CODIR.",
      },
    },
    contact: {
      overline: "Contact",
      title: "Parlons de votre projet.",
      subtitle:
        "Vous avez besoin d'un appui opérationnel, d'une action de formation ou d'une collaboration recherche ? Décrivez-nous votre contexte : nous revenons vers vous sous 48 h ouvrées.",
      name: "Nom et prénom",
      company: "Entreprise / Institution",
      email: "Email professionnel",
      phone: "Téléphone (facultatif)",
      subject: "Sujet",
      subject_options: {
        operations: "Appui opérationnel",
        training: "Formation",
        research: "Recherche & Technologie",
        other: "Autre",
      },
      message: "Votre message",
      submit: "Envoyer le message",
      submitting: "Envoi en cours…",
      success: "Message reçu. Nous vous répondons sous 48 h ouvrées.",
      error: "Une erreur est survenue. Merci de réessayer ou de nous écrire directement.",
      privacy:
        "En envoyant ce formulaire, vous acceptez que vos données soient traitées pour répondre à votre demande. Elles ne sont ni vendues ni partagées.",
      info_title: "Rester en contact",
      info_email: "Email",
      info_phone: "Téléphone",
      info_address: "Adresse",
    },
    legal: {
      title: "Mentions légales",
      body:
        "Éditeur : Anticiper — Cabinet de conseil. Directeur de la publication : Thierry Assonion. Hébergeur : OVHcloud. Pour toute question relative aux données personnelles, contactez-nous via le formulaire de contact.",
    },
    footer: {
      tagline:
        "Cabinet de conseil en intelligence économique, formation et recherche.",
      nav_title: "Navigation",
      legal_title: "Informations",
      legal_link: "Mentions légales",
      rights: "Tous droits réservés.",
      sister_site: "Site partenaire",
    },
  },
  en: {
    nav: {
      home: "Home",
      about: "About us",
      operations: "Operations",
      training: "Training",
      research: "Research",
      contact: "Contact",
      cta: "Get in touch",
    },
    common: {
      learnMore: "Learn more",
      seeTeam: "Meet the team",
      readMore: "Read more",
      modalities: "Modalities",
      backTop: "Back to top",
      scroll: "Scroll",
    },
    home: {
      overline: "Advisory firm",
      title_1: "Read the signals,",
      title_2: "secure your decisions.",
      intro:
        "\"In a world undergoing rapid change driven by new technologies, societal shifts and geopolitical upheaval, it is essential to mobilise every effort to understand the evolutions of a company's external ecosystem.",
      intro_2:
        "ANTICIPER has developed a robust approach, shaped by our team's defence DNA, to identify and address, as early as possible, signals that carry risks or opportunities.\"",
      founder: "Thierry Assonion, Anticiper's founder",
      pillars_overline: "Our three pillars",
      pillars_title: "A complete offer — from training to operations.",
      pillar_operations_title: "Operational support",
      pillar_operations_desc:
        "Since 2020, Anticiper has supported companies and public entities in setting up strategic information collection and analysis systems.",
      pillar_operations_cta: "Our operational support",
      pillar_training_title: "Training",
      pillar_training_desc:
        "Anticiper trains higher-education institutions, public entities, SMEs, start-ups and large corporations to detect interference operations and analyse strategic information.",
      pillar_training_cta: "Our training catalogue",
      pillar_research_title: "Research",
      pillar_research_desc:
        "Anticiper develops and runs a software platform simulating a strategic information collection and analysis system, used by research centres, industrial players and innovative companies.",
      pillar_research_cta: "Our research activities",
      metrics: {
        years: "years of support",
        clients: "clients supported",
        scenarios: "teaching scenarios",
        partners: "academic partners",
      },
      approach_overline: "Our approach",
      approach_title: "Our approach",
      approach_quote:
        "A trained company saves its means and focuses its efforts where they are truly needed.",
      approach_text_1: "We train companies so they can ",
      approach_text_strong_1: "autonomously",
      approach_text_2: " meet their needs in strategic information and ",
      approach_text_strong_2: "protection",
      approach_text_3: " — and, when relevant, draw on our anticipation, protection or influence services.",
      services_title: "Our services",
      services: [
        {
          step: "01",
          title: "Train",
          desc: "Transfer robust methods and lasting reflexes in economic intelligence.",
        },
        {
          step: "02",
          title: "Structure",
          desc: "Put in place concrete dispositions tailored to the company in matters of anticipation, information research and protection.",
        },
        {
          step: "03",
          title: "Deploy",
          desc: "Take operational lead to gather the required information, decipher a risk situation or reinforce influence communication.",
        },
      ],
    },
    about: {
      overline: "Our team",
      title: "Our team",
      h2_activities: "Our activities",
      activities_p1:
        "Anticiper is an advisory and services firm for companies.",
      activities_p2:
        "We offer a complete range — from training to operations — in the collection and processing of strategic information.",
      activities_p3:
        "We focus on strengthening managers' ability to read complex and volatile situations, by mobilising the talents of their teams with a forward-looking vision.",
      activities_p4:
        "The objective is to provide the keys to retain the initiative of action, instead of reacting to events.",
    },
    operations: {
      overline: "Operations",
      title: "Operational support",
      subtitle:
        "Tailored capabilities to collect, analyse and leverage strategic information.",
      items: [
        {
          title: "Setting up an intelligence cell",
          desc:
            "Anticiper provides a methodology and tools that enable companies to autonomously collect and analyse the strategic information needed for their development.",
        },
        {
          title: "Strategic information collection & analysis for companies",
          desc:
            "Identify and track changes in your external ecosystem to influence it better and accelerate sales (Due Diligence, strategic monitoring, reputation investigation, financial intelligence).",
        },
        {
          title: "Brand protection",
          desc:
            "Comprehensive web monitoring of the use of your trademarks or any other key terms of interest (technology, products, concepts, patents…).",
        },
      ],
    },
    training: {
      overline: "Training",
      title: "Training",
      intro:
        "Since 2020, Anticiper has trained public entities, research and higher-education institutions, SMEs, start-ups and large corporations in the collection and analysis of strategic information.",
      intro_2:
        "To elevate the quality of our training, we developed an immersive web platform, the heart of the Anticiper method. Participants are immersed in a fictional yet realistic situation. Learning happens through autonomous team problem-solving. The game experiences strengthen group cohesion.",
      scenarios: [
        {
          code: "PUNO",
          title: "Anticipation, field economic intelligence & reputation crisis management",
          scenario: "Puno scenario",
          desc:
            "You belong to an NGO active in Peru, specialised in ethical gold extraction. The information you can collect as a team from a network of trusted people will be essential to justify the continuation of your mission in South America and to detect weak signals preceding a reputational attack.",
          modalities: ["5 to 20 participants", "1 to 2 days"],
          note: "Players connect to our dedicated web app \"MailGame\". Each NGO member is played by a pair. AI is used to accelerate the pace and quality of the deliverables.",
        },
        {
          code: "STRATEGIS",
          title: "Corporate strategy & Competitive Intelligence",
          scenario: "Strategis scenario",
          desc:
            "You are a member of the executive committee of a company whose leader wants to triple revenue in 5 years. You collect and analyse the information needed to shape growth scenarios and the transformation initiatives to implement.",
          modalities: ["5 to 20 participants", "1 to 2 days"],
          note: "Players connect to our dedicated web app \"Anticiper\". Each executive is played by a pair.",
        },
        {
          code: "SECURE TRAIL",
          title: "Corporate protection",
          scenario: "Secure Trail scenario",
          desc:
            "You belong to an SME developing a sensitive breakthrough technology. You must secure funding, manage HR and communication, while detecting risks and threats from your external ecosystem.",
          modalities: ["5 to 20 participants", "1 or 2 days"],
          note: "",
        },
        {
          code: "GEO-CRISIS",
          title: "Anticipation & crisis management",
          scenario: "Geopolitical crisis",
          desc:
            "A team is immersed in managing a geopolitical crisis. Each participant plays an intelligence analyst within a European Union crisis monitoring centre.",
          modalities: [
            "8 to 20 participants",
            "Intelligence cycle: 1 day",
            "Debriefing exercise: 2 to 3 days",
            "3 scenarios: Balkans / Sudan / Baltic states",
          ],
          note: "",
        },
      ],
    },
    research: {
      overline: "Research & Technology",
      title: "Research & Technology",
      observation_title: "Our observation",
      observations: [
        "It is complex for research and industry to understand the stakes of the strategic information analysis process.",
        "There is no experimentation environment to test and improve tools for processing strategic information (ergonomics, collaboration, visualisation, AI-boosted analysis).",
        "Access to the reality of intelligence and economic/strategic intelligence professions is limited.",
      ],
      activities_title: "Our activities for research and digital",
      activities: [
        "Design of fictional yet representative digital analysis environments that reflect the stakes of the strategic-information production cycle.",
        "Experimentation of visualisation and analytical support tools, particularly integrating Generative AI at various steps of the intelligence production process.",
        "Creation of all types of intelligence scenarios with non-protected data.",
        "Hands-on understanding of information and intelligence exploitation for diverse audiences (research, industry, sponsors, media).",
      ],
      collab_title:
        "Our training web application is the result of our scientific and technical collaboration with the Costech research unit at the University of Technology of Compiègne.",
      processes_title: "What processes are simulated?",
      process_intel: {
        label: "Intelligence environment",
        desc:
          "An operational chief asks a question. A pool of analysts exploits its databases, tasks its sensors, analyses the collected information and provides a response to the operational chief.",
      },
      process_corp: {
        label: "Corporate environment",
        desc:
          "An executive committee expresses an actionable information need to its intelligence cell. The cell mobilises a network of trusted collaborators in the field, exploits open sources and provides a response to the committee.",
      },
    },
    contact: {
      overline: "Contact",
      title: "Let's discuss your project.",
      subtitle:
        "Need operational support, training or a research collaboration? Tell us about your context — we reply within 48 business hours.",
      name: "Full name",
      company: "Company / Institution",
      email: "Professional email",
      phone: "Phone (optional)",
      subject: "Subject",
      subject_options: {
        operations: "Operational support",
        training: "Training",
        research: "Research & Technology",
        other: "Other",
      },
      message: "Your message",
      submit: "Send message",
      submitting: "Sending…",
      success: "Message received. We'll reply within 48 business hours.",
      error: "Something went wrong. Please try again or write to us directly.",
      privacy:
        "By submitting this form you agree that your data is processed to respond to your request. It is neither sold nor shared.",
      info_title: "Stay in touch",
      info_email: "Email",
      info_phone: "Phone",
      info_address: "Address",
    },
    legal: {
      title: "Legal notice",
      body:
        "Publisher: Anticiper — advisory firm. Publication director: Thierry Assonion. Host: OVHcloud. For any question regarding personal data, please contact us through the contact form.",
    },
    footer: {
      tagline:
        "Advisory firm in economic intelligence, training and research.",
      nav_title: "Navigation",
      legal_title: "Information",
      legal_link: "Legal notice",
      rights: "All rights reserved.",
      sister_site: "Partner site",
    },
  },
};

const LangContext = createContext({ lang: "fr", setLang: () => {}, t: translations.fr });

export const LangProvider = ({ children }) => {
  const [lang, setLangState] = useState("fr");

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem(LS_KEY) : null;
    if (stored === "fr" || stored === "en") setLangState(stored);
  }, []);

  const setLang = (l) => {
    setLangState(l);
    if (typeof window !== "undefined") {
      localStorage.setItem(LS_KEY, l);
      document.documentElement.lang = l;
    }
  };

  const value = useMemo(() => ({
    lang,
    setLang,
    t: translations[lang] || translations.fr,
  }), [lang]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
};

export const useLang = () => useContext(LangContext);
