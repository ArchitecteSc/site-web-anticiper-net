import React from "react";
import { Helmet } from "react-helmet-async";
import { useLang } from "../i18n";

const SITE_URL = "https://anticiper.net";
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/hero-home.jpg`;

/**
 * Per-page SEO component.
 * Sets <title>, meta description, canonical, OG/Twitter cards and hreflang.
 *
 * Props:
 *  - title:   page title (without site name suffix)
 *  - description: meta description (FR or EN depending on lang)
 *  - path:    canonical path of the page (e.g. "/qui-sommes-nous")
 *  - keywords (optional): comma-separated keywords
 *  - image (optional): absolute URL of OG image
 *  - type (optional): "website" | "article", default "website"
 */
export const Seo = ({
  title,
  description,
  path = "/",
  keywords,
  image = DEFAULT_OG_IMAGE,
  type = "website",
}) => {
  const { lang } = useLang();
  const url = `${SITE_URL}${path}`;
  const fullTitle = title ? `${title} — Anticiper` : "Anticiper — Cabinet de conseil en intelligence économique";
  const ogLocale = lang === "fr" ? "fr_FR" : "en_US";

  return (
    <Helmet>
      <html lang={lang} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}

      <link rel="canonical" href={url} />
      <link rel="alternate" hrefLang="fr" href={url} />
      <link rel="alternate" hrefLang="en" href={url} />
      <link rel="alternate" hrefLang="x-default" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:locale" content={ogLocale} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Anticiper" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Robots */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
    </Helmet>
  );
};

export default Seo;
