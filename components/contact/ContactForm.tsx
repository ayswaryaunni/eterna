"use client";

import React, { useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { ContactFormData } from "@/types";
import { Button } from "@/components/common/Button";
import { cn } from "@/lib/utils";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } } };
const rise: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const EVENT_TYPES = [
  { value: "Wedding Planning", label: "Full-Service Wedding Planning" },
  { value: "Destination Wedding", label: "Destination Wedding" },
  { value: "Event Design", label: "Event Design & Floral Styling" },
  { value: "Private Gala", label: "Private Celebration or Gala" },
];

const EMPTY: ContactFormData = {
  name: "",
  phone: "",
  email: "",
  eventType: EVENT_TYPES[0].value,
  eventDate: "",
  location: "",
  message: "",
};

const inputClass =
  "peer w-full px-4 pt-6 pb-2.5 text-sm bg-ivory border border-linen text-ink placeholder-transparent focus:border-purple focus:bg-white focus:outline-none focus:ring-4 focus:ring-purple/10 transition-all duration-300";
const labelClass =
  "pointer-events-none absolute left-4 top-4 text-[11px] uppercase tracking-[0.2em] text-neutral-500 transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-[11px] peer-focus:top-2 peer-focus:text-[9px] peer-focus:text-purple peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[9px]";

interface FieldProps {
  id: keyof ContactFormData;
  label: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  className?: string;
}

function Field({ id, label, type = "text", required, value, onChange, className }: FieldProps) {
  return (
    <motion.div variants={rise} className={cn("relative", className)}>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={label}
        className={inputClass}
      />
      <label htmlFor={id} className={labelClass}>
        {label}
        {required && <span className="text-purple ml-0.5">*</span>}
      </label>
    </motion.div>
  );
}

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(EMPTY);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // UI-only for now; prepared for future Frappe API integration
    console.log("Submitting enquiry to Frappe endpoint:", formData);
    setSubmitted(true);
  };

  const reset = () => {
    setFormData(EMPTY);
    setSubmitted(false);
  };

  return (
    <div className="relative bg-white border border-linen shadow-[0_30px_80px_-40px_rgba(90,37,72,0.25)]">
      {/* Plum accent rule */}
      <span className="absolute top-0 left-0 w-full h-1 bg-purple" />

      <AnimatePresence mode="wait" initial={false}>
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="p-10 sm:p-16 text-center space-y-5"
          >
            <motion.span
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.15 }}
              className="inline-flex w-16 h-16 rounded-full bg-purple/[0.08] text-purple items-center justify-center"
            >
              <CheckCircle2 size={30} strokeWidth={1.5} />
            </motion.span>
            <span className="block text-[11px] uppercase tracking-[0.3em] text-purple font-medium">Thank you</span>
            <h3 className="font-serif text-3xl sm:text-4xl font-light text-ink">
              Your inquiry has been <span className="italic text-purple">received</span>
            </h3>
            <p className="text-sm text-neutral-600 font-light max-w-md mx-auto leading-relaxed">
              Our concierge team will review your event details and connect with you within 24 business
              hours to arrange a private consultation.
            </p>
            <div className="pt-3">
              <Button variant="outline" size="sm" onClick={reset}>
                Submit another inquiry
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            variants={stagger}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, y: -16, transition: { duration: 0.3 } }}
            className="p-7 sm:p-10 lg:p-12 space-y-8"
          >
            {/* Section: You */}
            <div className="space-y-5">
              <motion.div variants={rise} className="flex items-center gap-3">
                <span className="font-serif text-lg text-purple/60">01</span>
                <span className="text-[11px] uppercase tracking-[0.25em] text-neutral-500">About you</span>
                <span className="flex-1 h-px bg-linen" />
              </motion.div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field id="name" label="Full name" required value={formData.name} onChange={handleChange} />
                <Field id="email" label="Email address" type="email" required value={formData.email} onChange={handleChange} />
                <Field id="phone" label="Phone number" type="tel" required value={formData.phone} onChange={handleChange} className="sm:col-span-2" />
              </div>
            </div>

            {/* Section: The celebration */}
            <div className="space-y-5">
              <motion.div variants={rise} className="flex items-center gap-3">
                <span className="font-serif text-lg text-purple/60">02</span>
                <span className="text-[11px] uppercase tracking-[0.25em] text-neutral-500">The celebration</span>
                <span className="flex-1 h-px bg-linen" />
              </motion.div>

              {/* Event type as selectable chips */}
              <motion.fieldset variants={rise} className="space-y-3">
                <legend className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">
                  Event type <span className="text-purple">*</span>
                </legend>
                <div className="flex flex-wrap gap-2">
                  {EVENT_TYPES.map((t) => {
                    const active = formData.eventType === t.value;
                    return (
                      <label
                        key={t.value}
                        className={cn(
                          "cursor-pointer select-none px-4 py-2.5 text-[11px] uppercase tracking-[0.15em] border transition-all duration-300",
                          active
                            ? "bg-purple border-purple text-white shadow-md"
                            : "bg-ivory border-linen text-neutral-600 hover:border-purple/40 hover:text-purple"
                        )}
                      >
                        <input
                          type="radio"
                          name="eventType"
                          value={t.value}
                          checked={active}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        {t.label}
                      </label>
                    );
                  })}
                </div>
              </motion.fieldset>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field id="eventDate" label="Estimated date / season" value={formData.eventDate} onChange={handleChange} />
                <Field id="location" label="Desired location / venue" value={formData.location} onChange={handleChange} />
              </div>

              <motion.div variants={rise} className="relative">
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your vision & estimated guest count"
                  className={cn(inputClass, "resize-none")}
                />
                <label htmlFor="message" className={labelClass}>
                  Your vision &amp; estimated guest count <span className="text-purple">*</span>
                </label>
              </motion.div>
            </div>

            {/* Submit */}
            <motion.div variants={rise} className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pt-2">
              <p className="inline-flex items-center gap-2 text-[11px] text-neutral-500 font-light">
                <ShieldCheck size={14} className="text-purple" />
                Your details remain strictly confidential.
              </p>
              <Button type="submit" size="lg" className="gap-3 group/btn w-full sm:w-auto">
                Send confidential inquiry
                <ArrowRight size={15} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
              </Button>
            </motion.div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
