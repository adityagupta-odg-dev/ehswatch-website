"use client";

import { useState, useRef } from "react";
import TurnstileField from "@/components/ui/TurnstileField";
import PhoneInput from "@/components/ui/PhoneInput";
import type { CmsForm, CmsFormField } from "@/lib/types";

export type FormVariant = "contact" | "support";

interface DynamicCmsFormProps {
  formAttrs: CmsForm["attributes"];
  slug: string;
  variant?: FormVariant;
  onSuccess?: () => void;
}

/* ── Per-variant style tokens ── */
const STYLES: Record<FormVariant, {
  inputClass: string;
  wrapClass: string;
  labelClass: string;
  showLabel: boolean;
}> = {
  contact: {
    inputClass:
      "w-full bg-transparent font-[family-name:var(--font-dm-sans)] text-[15px] text-[#0a0f1e] placeholder:text-[#9ca3af] outline-none py-2.5",
    wrapClass:
      "border-b border-[#e5e7eb] focus-within:border-[#1d4ed8] transition-colors duration-200",
    labelClass:
      "block font-[family-name:var(--font-dm-sans)] text-[11px] font-semibold uppercase tracking-[0.1em] text-[#6b7280] mb-1.5",
    showLabel: false,
  },
  support: {
    inputClass:
      "w-full rounded-[8px] border border-[#d1d9e6] bg-white px-4 py-[10px] font-[family-name:var(--font-dm-sans)] text-[14px] text-[#0f1728] placeholder:text-[#a0aec0] focus:outline-none focus:border-[#155eef] focus:ring-2 focus:ring-[#155eef]/10 transition-all",
    wrapClass: "",
    labelClass:
      "block font-[family-name:var(--font-dm-sans)] text-[11px] font-semibold text-[#374151] tracking-wide uppercase mb-1.5",
    showLabel: true,
  },
};

function FieldWidget({ field, variant }: { field: CmsFormField; variant: FormVariant }) {
  const { inputClass, wrapClass, labelClass, showLabel } = STYLES[variant];
  const placeholder = field.placeholder ?? field.label;

  const label = showLabel ? (
    <label className={labelClass}>
      {field.label}
      {field.required && <span className="text-[#e53e3e] ml-0.5">*</span>}
    </label>
  ) : null;

  const helpText = field.help_text ? (
    <p className="mt-1 text-[12px] text-[#6b7280] font-[family-name:var(--font-dm-sans)]">
      {field.help_text}
    </p>
  ) : null;

  if (field.field_type === "textarea") {
    return (
      <div>
        {label}
        <div className={wrapClass}>
          <textarea
            name={field.key}
            required={field.required}
            placeholder={placeholder}
            rows={5}
            className={inputClass + " resize-none"}
          />
        </div>
        {helpText}
      </div>
    );
  }

  if (field.field_type === "select") {
    return (
      <div>
        {label}
        <div className={wrapClass}>
          <select
            name={field.key}
            required={field.required}
            defaultValue=""
            className={inputClass + " cursor-pointer appearance-none"}
          >
            <option value="" disabled>
              {field.placeholder ?? `Select ${field.label}`}
            </option>
            {(field.options ?? []).map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
        {helpText}
      </div>
    );
  }

  if (field.field_type === "radio") {
    return (
      <div>
        <label className={labelClass}>
          {field.label}
          {field.required && <span className="text-[#e53e3e] ml-0.5">*</span>}
        </label>
        <div className="flex flex-wrap gap-3">
          {(field.options ?? []).map((opt) => (
            <label
              key={opt}
              className="flex items-center gap-2 font-[family-name:var(--font-dm-sans)] text-[14px] text-[#374151] cursor-pointer"
            >
              <input
                type="radio"
                name={field.key}
                value={opt}
                required={field.required}
                className="accent-[#155eef]"
              />
              {opt}
            </label>
          ))}
        </div>
        {helpText}
      </div>
    );
  }

  if (field.field_type === "checkboxes") {
    return (
      <div>
        <label className={labelClass}>
          {field.label}
          {field.required && <span className="text-[#e53e3e] ml-0.5">*</span>}
        </label>
        <div className="flex flex-col gap-2">
          {(field.options ?? []).map((opt) => (
            <label
              key={opt}
              className="flex items-center gap-2 font-[family-name:var(--font-dm-sans)] text-[14px] text-[#374151] cursor-pointer"
            >
              <input
                type="checkbox"
                name={field.key}
                value={opt}
                className="accent-[#155eef]"
              />
              {opt}
            </label>
          ))}
        </div>
        {helpText}
      </div>
    );
  }

  /* phone / tel → intl-tel-input widget */
  if (field.field_type === "phone" || field.field_type === "tel") {
    return (
      <div>
        {label}
        <div className={wrapClass}>
          <PhoneInput
            name={field.key}
            required={field.required}
            placeholder={placeholder}
            variant={variant}
          />
        </div>
        {helpText}
      </div>
    );
  }

  /* text, email, url, number */
  const htmlType =
    field.field_type === "email" ? "email"
    : field.field_type === "url" ? "url"
    : field.field_type === "number" ? "number"
    : "text";

  return (
    <div>
      {label}
      <div className={wrapClass}>
        <input
          type={htmlType}
          name={field.key}
          required={field.required}
          placeholder={placeholder}
          className={inputClass}
        />
      </div>
      {helpText}
    </div>
  );
}

/* Group fields into rows: full-width / multi-line fields get their own row; others pair up */
function buildRows(fields: CmsFormField[]): CmsFormField[][] {
  const SOLO_TYPES = new Set(["textarea", "radio", "checkboxes"]);
  const rows: CmsFormField[][] = [];
  let i = 0;
  while (i < fields.length) {
    const f = fields[i];
    if (f.full_width || SOLO_TYPES.has(f.field_type)) {
      rows.push([f]);
      i++;
    } else {
      const next = fields[i + 1];
      if (next && !next.full_width && !SOLO_TYPES.has(next.field_type)) {
        rows.push([f, next]);
        i += 2;
      } else {
        rows.push([f]);
        i++;
      }
    }
  }
  return rows;
}

export default function DynamicCmsForm({
  formAttrs,
  slug,
  variant = "contact",
  onSuccess,
}: DynamicCmsFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const fields = formAttrs.fields ?? [];
  const successHeading = formAttrs.success_heading || "Message Received";
  const successMessage =
    formAttrs.success_message || "Thank you! We'll be in touch shortly.";
  const submitLabel = formAttrs.submit_label || "Send Message";
  const siteKey =
    formAttrs.captcha?.site_key ||
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ||
    "1x00000000000000000000AA";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!captchaToken) return;
    const fd = new FormData(e.currentTarget);
    const data: Record<string, unknown> = { captcha_token: captchaToken };

    for (const field of fields) {
      if (field.field_type === "checkboxes") {
        data[field.key] = fd.getAll(field.key);
      } else {
        const val = fd.get(field.key);
        if (val !== null) data[field.key] = val;
      }
    }

    setSubmitting(true);
    try {
      const { submitForm } = await import("@/lib/api");
      await submitForm(slug, data);
      setSubmitted(true);
      onSuccess?.();
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-5 py-16 text-center">
        <div className="w-14 h-14 rounded-full bg-[#EEF4FF] flex items-center justify-center">
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1d4ed8"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="font-[family-name:var(--font-gothic-a1)] font-bold text-[22px] text-[#0a0f1e]">
          {successHeading}
        </h3>
        <p className="font-[family-name:var(--font-dm-sans)] text-[15px] text-[#6b7280] max-w-[320px] leading-[1.7]">
          {successMessage}
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            formRef.current?.reset();
            setCaptchaToken(null);
          }}
          className="font-[family-name:var(--font-dm-sans)] text-[13px] font-semibold text-[#1d4ed8] hover:underline cursor-pointer"
        >
          Submit another response
        </button>
      </div>
    );
  }

  const rows = buildRows(fields);
  const gapClass = variant === "contact" ? "gap-10" : "gap-4";

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className={`flex flex-col ${gapClass}`}
    >
      {rows.map((row, ri) => (
        <div
          key={ri}
          className={
            row.length === 2
              ? "grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12"
              : ""
          }
        >
          {row.map((field) => (
            <FieldWidget key={field.key} field={field} variant={variant} />
          ))}
        </div>
      ))}

      <TurnstileField
        siteKey={siteKey}
        onToken={setCaptchaToken}
        onExpire={() => setCaptchaToken(null)}
      />

      <div>
        <button
          type="submit"
          disabled={submitting || !captchaToken}
          className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-[family-name:var(--font-dm-sans)] font-semibold text-[14px] text-white transition-all duration-200"
          style={{
            backgroundImage:
              "linear-gradient(102.8deg, #ffa964 0.12%, #ff8e37 34.34%, #ff7812 50.27%, #ff6d00 119.92%)",
            opacity: submitting || !captchaToken ? 0.7 : 1,
            cursor: submitting || !captchaToken ? "not-allowed" : "pointer",
          }}
        >
          {submitting ? "Sending…" : submitLabel}
          {!submitting && (
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <path
                d="M2 7h10M8 3l4 4-4 4"
                stroke="white"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
      </div>
    </form>
  );
}
