import React, { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "../i18n";

const LOGO = "https://customer-assets.emergentagent.com/job_5cdbc63d-d5b1-4e79-aca3-cba0bfe3b8fa/artifacts/uwhw7jb6_Logo%20Anticiper.png";

const LangToggle = () => {
  const { lang, setLang } = useLang();
  return (
    <div
      className="inline-flex items-center rounded-full border border-slate-200 bg-white/70 backdrop-blur px-1 py-1 text-xs font-mono-tactical"
      data-testid="lang-toggle"
    >
      {["fr", "en"].map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          data-testid={`lang-${l}`}
          className={`uppercase tracking-wider px-2.5 py-1 rounded-full transition-all ${
            lang === l ? "bg-[#34B2C8] text-white" : "text-slate-600 hover:text-slate-900"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
};

const Navbar = () => {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  const links = [
    { to: "/", label: t.nav.home, end: true },
    { to: "/qui-sommes-nous", label: t.nav.about },
    { to: "/appuis-operationnels", label: t.nav.operations },
    { to: "/formation", label: t.nav.training },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled ? "bg-white/80 backdrop-blur-xl border-b border-slate-200/70" : "bg-white/60 backdrop-blur-xl border-b border-transparent"
      }`}
      data-testid="navbar"
    >
      <div className="container-anticiper h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2" data-testid="navbar-logo">
          <img src={LOGO} alt="Anticiper" className="h-8 w-8 object-contain" />
          <span className="font-display font-semibold text-lg text-slate-900 tracking-tight">Anticiper</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              data-testid={`nav-${l.to.replace(/\//g, "") || "home"}`}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? "text-[#34B2C8]" : "text-slate-600 hover:text-slate-900"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <LangToggle />
          <Link to="/contact" className="btn-primary text-sm" data-testid="navbar-cta">
            {t.nav.cta} <ArrowRight size={16} />
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-full border border-slate-200 bg-white/80"
          aria-label="Menu"
          data-testid="burger-menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="lg:hidden border-t border-slate-200/70 bg-white"
            data-testid="mobile-menu"
          >
            <div className="container-anticiper py-6 flex flex-col gap-4">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.end}
                  data-testid={`mobile-nav-${l.to.replace(/\//g, "") || "home"}`}
                  className={({ isActive }) =>
                    `text-base font-medium ${isActive ? "text-[#34B2C8]" : "text-slate-700"}`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <LangToggle />
                <Link to="/contact" className="btn-primary text-sm" data-testid="mobile-navbar-cta">
                  {t.nav.cta} <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
