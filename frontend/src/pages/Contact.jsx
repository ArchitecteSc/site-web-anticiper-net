import React, { useState } from "react";
import axios from "axios";
import { ArrowRight, Mail, Phone, MapPin, Check } from "lucide-react";
import { useLang } from "../i18n";
import { Reveal } from "../components/Reveal";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Contact = () => {
  const { t, lang } = useLang();
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [state, setState] = useState({ loading: false, success: false, error: "" });

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setState({ loading: true, success: false, error: "" });
    try {
      await axios.post(`${API}/contact`, { ...form, locale: lang });
      setState({ loading: false, success: true, error: "" });
      setForm({ name: "", company: "", email: "", phone: "", subject: "", message: "" });
    } catch (err) {
      setState({ loading: false, success: false, error: t.contact.error });
    }
  };

  const subjects = [
    t.contact.subject_options.operations,
    t.contact.subject_options.training,
    t.contact.subject_options.research,
    t.contact.subject_options.other,
  ];

  return (
    <div data-testid="page-contact">
      <section className="container-anticiper pt-16 md:pt-24 pb-10">
        <Reveal>
          <p className="overline">{t.contact.overline}</p>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl text-slate-900 font-light tracking-tight leading-[1.05] max-w-3xl">
            {t.contact.title}
          </h1>
          <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-2xl">
            {t.contact.subtitle}
          </p>
        </Reveal>
      </section>

      <section className="container-anticiper pb-24">
        <div className="grid lg:grid-cols-12 gap-10">
          <Reveal className="lg:col-span-7">
            <form
              onSubmit={onSubmit}
              className="rounded-3xl border border-slate-200/70 bg-white p-8 md:p-10"
              data-testid="contact-form"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label={t.contact.name} name="name" value={form.name} onChange={onChange} required testId="input-name" />
                <Field label={t.contact.company} name="company" value={form.company} onChange={onChange} testId="input-company" />
                <Field label={t.contact.email} name="email" type="email" value={form.email} onChange={onChange} required testId="input-email" />
                <Field label={t.contact.phone} name="phone" value={form.phone} onChange={onChange} testId="input-phone" />
              </div>

              <div className="mt-5">
                <label className="block font-mono-tactical text-[11px] uppercase tracking-wider text-slate-500 mb-2">
                  {t.contact.subject}
                </label>
                <select
                  name="subject"
                  value={form.subject}
                  onChange={onChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#34B2C8]/40 focus:border-[#34B2C8]"
                  data-testid="input-subject"
                >
                  <option value="">—</option>
                  {subjects.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div className="mt-5">
                <label className="block font-mono-tactical text-[11px] uppercase tracking-wider text-slate-500 mb-2">
                  {t.contact.message} *
                </label>
                <textarea
                  name="message"
                  rows={6}
                  required
                  value={form.message}
                  onChange={onChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 resize-y focus:outline-none focus:ring-2 focus:ring-[#34B2C8]/40 focus:border-[#34B2C8]"
                  data-testid="input-message"
                />
              </div>

              <p className="mt-4 text-xs text-slate-500 leading-relaxed">{t.contact.privacy}</p>

              <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4">
                <button
                  type="submit"
                  disabled={state.loading}
                  className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
                  data-testid="contact-submit"
                >
                  {state.loading ? t.contact.submitting : t.contact.submit}
                  {!state.loading && <ArrowRight size={16} />}
                </button>

                {state.success && (
                  <div className="flex items-center gap-2 text-sm text-[#34B2C8]" data-testid="contact-success">
                    <Check size={16} />
                    {t.contact.success}
                  </div>
                )}
                {state.error && (
                  <div className="text-sm text-[#E25A6E]" data-testid="contact-error">{state.error}</div>
                )}
              </div>
            </form>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="rounded-3xl bg-slate-50 border border-slate-200/70 p-8 md:p-10">
              <p className="font-mono-tactical text-xs uppercase tracking-wider text-[#34B2C8]">
                {t.contact.info_title}
              </p>

              <ul className="mt-8 space-y-6">
                <li className="flex gap-4">
                  <div className="h-10 w-10 shrink-0 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[#34B2C8]">
                    <Mail size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-mono-tactical uppercase tracking-wider text-slate-500">{t.contact.info_email}</p>
                    <a href="mailto:contact@anticiper.net" className="mt-1 block text-slate-900 font-medium hover:text-[#34B2C8]">
                      contact@anticiper.net
                    </a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="h-10 w-10 shrink-0 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[#34B2C8]">
                    <Phone size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-mono-tactical uppercase tracking-wider text-slate-500">{t.contact.info_phone}</p>
                    <p className="mt-1 text-slate-900 font-medium">+33 (0)1 00 00 00 00</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="h-10 w-10 shrink-0 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[#34B2C8]">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-mono-tactical uppercase tracking-wider text-slate-500">{t.contact.info_address}</p>
                    <p className="mt-1 text-slate-900 font-medium leading-relaxed">
                      Paris, France
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

const Field = ({ label, name, type = "text", value, onChange, required, testId }) => (
  <div>
    <label className="block font-mono-tactical text-[11px] uppercase tracking-wider text-slate-500 mb-2">
      {label} {required && "*"}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      data-testid={testId}
      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#34B2C8]/40 focus:border-[#34B2C8]"
    />
  </div>
);

export default Contact;
