import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "../i18n";
import { OptimizedImage } from "./OptimizedImage";

const Footer = () => {
  const { t } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 border-t border-slate-200 mt-24" data-testid="footer">
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2">
              <OptimizedImage name="logo" alt="Anticiper" fallbackExt="png" className="h-8 w-8" />
              <span className="font-display font-semibold text-slate-900 text-lg">Anticiper</span>
            </div>
            <p className="mt-4 text-sm text-slate-600 max-w-xs leading-relaxed">{t.footer.tagline}</p>

            <a
              href="https://anticiper.app"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-1.5 text-xs font-mono-tactical uppercase tracking-wider text-[#34B2C8] hover:text-[#2a9ab0]"
              data-testid="footer-sister-site"
            >
              {t.footer.sister_site} — anticiper.app <ArrowUpRight size={14} />
            </a>
          </div>

          <div>
            <p className="font-mono-tactical text-xs uppercase tracking-wider text-slate-500 mb-4">
              {t.footer.nav_title}
            </p>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-slate-600 hover:text-slate-900">{t.nav.home}</Link></li>
              <li><Link to="/qui-sommes-nous" className="text-slate-600 hover:text-slate-900">{t.nav.about}</Link></li>
              <li><Link to="/appuis-operationnels" className="text-slate-600 hover:text-slate-900">{t.nav.operations}</Link></li>
              <li><Link to="/formation" className="text-slate-600 hover:text-slate-900">{t.nav.training}</Link></li>
              <li><Link to="/contact" className="text-slate-600 hover:text-slate-900">{t.nav.contact}</Link></li>
            </ul>
          </div>

          <div>
            <p className="font-mono-tactical text-xs uppercase tracking-wider text-slate-500 mb-4">
              {t.footer.legal_title}
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/mentions-legales" className="text-slate-600 hover:text-slate-900" data-testid="footer-legal-link">
                  {t.footer.legal_link}
                </Link>
              </li>
              <li>
                <a href="mailto:contact@anticiper.net" className="text-slate-600 hover:text-slate-900">
                  contact@anticiper.net
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <p className="text-xs text-slate-400">© {year} Anticiper. {t.footer.rights}</p>
          <p className="text-xs text-slate-400 font-mono-tactical uppercase tracking-wider">
            Made in France · OVHcloud
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
