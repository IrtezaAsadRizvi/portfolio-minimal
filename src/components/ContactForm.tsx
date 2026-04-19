"use client";

import content from "@/data/contact.json";
import Reveal from "./Reveal";

const { fields, submitLabel } = content.form;

export default function ContactForm() {
  return (
    <form className="space-y-12 max-w-2xl mb-24">
      {fields.map((field, i) => (
        <Reveal key={field.id} delay={i * 0.1}>
          <div className="flex flex-col">
            <label
              className="text-[0.75rem] uppercase tracking-widest text-on-surface-variant/60 font-mono mb-2"
              htmlFor={field.id}
            >
              {field.label}
            </label>
            <div className="flex items-start border-b border-outline-variant/30 focus-within:border-accent transition-all duration-300">
              <span className="font-mono text-accent/30 pr-3 pt-3">
                {field.prompt}
              </span>
              {field.type === "textarea" ? (
                <textarea
                  id={field.id}
                  name={field.id}
                  placeholder={field.placeholder}
                  rows={field.rows}
                  className="bg-transparent border-none py-3 text-on-surface placeholder:text-on-surface-variant/20 focus:ring-0 flex-1 resize-none focus:outline-none"
                />
              ) : (
                <input
                  id={field.id}
                  name={field.id}
                  type={field.type}
                  placeholder={field.placeholder}
                  className="bg-transparent border-none py-3 text-on-surface placeholder:text-on-surface-variant/20 focus:ring-0 flex-1 focus:outline-none"
                />
              )}
            </div>
          </div>
        </Reveal>
      ))}
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
