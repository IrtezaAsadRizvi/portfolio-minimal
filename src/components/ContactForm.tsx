"use client";

import { useState, type FormEvent } from "react";
import { getContent, type Locale } from "@/lib/i18n";
import Reveal from "./Reveal";

type Errors = Record<string, string>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Validation = {
  nameRequired: string;
  nameTooShort: string;
  emailRequired: string;
  emailInvalid: string;
  messageRequired: string;
  messageTooShort: string;
};

function validate(
  values: Record<string, string>,
  v: Validation,
): Errors {
  const errors: Errors = {};
  const name = (values.name ?? "").trim();
  const email = (values.email ?? "").trim();
  const message = (values.message ?? "").trim();

  if (!name) errors.name = v.nameRequired;
  else if (name.length < 2) errors.name = v.nameTooShort;

  if (!email) errors.email = v.emailRequired;
  else if (!EMAIL_RE.test(email)) errors.email = v.emailInvalid;

  if (!message) errors.message = v.messageRequired;
  else if (message.length < 10) errors.message = v.messageTooShort;

  return errors;
}

export default function ContactForm({ locale }: { locale: Locale }) {
  const { fields, submitLabel, validation } = getContent(locale).contact.form;
  const [errors, setErrors] = useState<Errors>({});

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    const form = e.currentTarget;
    const data = new FormData(form);
    const values: Record<string, string> = {};
    fields.forEach((f) => {
      values[f.id] = String(data.get(f.id) ?? "");
    });

    const nextErrors = validate(values, validation);
    if (Object.keys(nextErrors).length > 0) {
      e.preventDefault();
      setErrors(nextErrors);
      const firstInvalid = form.querySelector<HTMLElement>(
        `[name="${Object.keys(nextErrors)[0]}"]`,
      );
      firstInvalid?.focus();
    }
  }

  function clearError(id: string) {
    setErrors((prev) => {
      if (!prev[id]) return prev;
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }

  return (
    <form
      className="space-y-12 max-w-2xl mb-24"
      action="https://api.web3forms.com/submit"
      method="POST"
      noValidate
      onSubmit={handleSubmit}
    >
      <input
        type="hidden"
        name="access_key"
        value="9a7a3209-df37-44e6-af76-988488877d24"
      />
      <input
        type="hidden"
        name="apikey"
        value="9a7a3209-df37-44e6-af76-988488877d24"
      />
      <input
        type="hidden"
        name="redirect"
        value="https://web3forms.com/success"
      />
      {fields.map((field, i) => {
        const error = errors[field.id];
        const errorId = `${field.id}-error`;
        return (
          <Reveal key={field.id} delay={i * 0.1}>
            <div className="flex flex-col">
              <label
                className="text-[0.75rem] uppercase tracking-widest text-on-surface-variant/80 font-mono mb-2"
                htmlFor={field.id}
              >
                {field.label}
              </label>
              <div
                className={`flex items-start border-b transition-all duration-300 ${
                  error
                    ? "border-red-400/70 focus-within:border-red-400"
                    : "border-outline-variant/30 focus-within:border-accent"
                }`}
              >
                <span
                  className={`font-mono pr-3 pt-3 ${
                    error ? "text-red-400" : "text-accent/80"
                  }`}
                >
                  {field.prompt}
                </span>
                {field.type === "textarea" ? (
                  <textarea
                    id={field.id}
                    name={field.id}
                    placeholder={field.placeholder}
                    rows={field.rows}
                    aria-invalid={error ? true : undefined}
                    aria-describedby={error ? errorId : undefined}
                    onChange={() => clearError(field.id)}
                    className="bg-transparent border-none py-3 text-on-surface placeholder:text-on-surface-variant/60 focus:ring-0 flex-1 resize-none focus:outline-none"
                  />
                ) : (
                  <input
                    id={field.id}
                    name={field.id}
                    type={field.type}
                    placeholder={field.placeholder}
                    aria-invalid={error ? true : undefined}
                    aria-describedby={error ? errorId : undefined}
                    onChange={() => clearError(field.id)}
                    className="bg-transparent border-none py-3 text-on-surface placeholder:text-on-surface-variant/60 focus:ring-0 flex-1 focus:outline-none"
                  />
                )}
              </div>
              {error && (
                <p
                  id={errorId}
                  role="alert"
                  className="mt-2 text-[0.7rem] font-mono uppercase tracking-widest text-red-400"
                >
                  {error}
                </p>
              )}
            </div>
          </Reveal>
        );
      })}
      <Reveal delay={0.35}>
        <div className="pt-4">
          <button
            type="submit"
            className="group flex items-center gap-4 text-accent text-base font-medium tracking-tight hover-lift"
          >
            <span className="nav-link pb-0.5">{submitLabel}</span>
            <span className="material-symbols-outlined text-sm opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
              arrow_forward
            </span>
          </button>
        </div>
      </Reveal>
    </form>
  );
}
