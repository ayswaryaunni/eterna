"use client";

import React, { useState } from "react";
import { ContactFormData } from "@/types";
import { Button } from "@/components/common/Button";

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    phone: "",
    email: "",
    eventType: "Wedding Planning",
    eventDate: "",
    location: "",
    message: "",
  });

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

  if (submitted) {
    return (
      <div className="p-8 sm:p-12 bg-white border border-linen text-center space-y-4">
        <span className="text-xs uppercase tracking-[0.25em] text-champagne-dark font-medium">
          Thank You
        </span>
        <h3 className="font-serif text-3xl text-ink">
          Your Inquiry Has Been Received
        </h3>
        <p className="text-sm text-neutral-600 font-light max-w-md mx-auto leading-relaxed">
          Our concierge team will review your event details and connect with
          you within 24 business hours to schedule an initial consultation.
        </p>
        <div className="pt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSubmitted(false)}
          >
            Submit Another Inquiry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-8 sm:p-10 bg-white border border-linen shadow-sm space-y-6"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Name */}
        <div className="space-y-2">
          <label htmlFor="name" className="block text-xs uppercase tracking-widest text-neutral-700 font-medium">
            Full Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Lady Genevieve & Lord Sterling"
            className="w-full px-4 py-3 text-sm bg-ivory border border-linen focus:border-champagne focus:outline-none transition-colors"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-xs uppercase tracking-widest text-neutral-700 font-medium">
            Email Address *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="genevieve@example.com"
            className="w-full px-4 py-3 text-sm bg-ivory border border-linen focus:border-champagne focus:outline-none transition-colors"
          />
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <label htmlFor="phone" className="block text-xs uppercase tracking-widest text-neutral-700 font-medium">
            Phone Number *
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1 (555) 000-0000"
            className="w-full px-4 py-3 text-sm bg-ivory border border-linen focus:border-champagne focus:outline-none transition-colors"
          />
        </div>

        {/* Event Type */}
        <div className="space-y-2">
          <label htmlFor="eventType" className="block text-xs uppercase tracking-widest text-neutral-700 font-medium">
            Event Type *
          </label>
          <select
            id="eventType"
            name="eventType"
            value={formData.eventType}
            onChange={handleChange}
            className="w-full px-4 py-3 text-sm bg-ivory border border-linen focus:border-champagne focus:outline-none transition-colors"
          >
            <option value="Wedding Planning">Full-Service Wedding Planning</option>
            <option value="Destination Wedding">Destination Wedding</option>
            <option value="Event Design">Event Design & Floral Styling</option>
            <option value="Private Gala">Private Celebration or Gala</option>
          </select>
        </div>

        {/* Event Date */}
        <div className="space-y-2">
          <label htmlFor="eventDate" className="block text-xs uppercase tracking-widest text-neutral-700 font-medium">
            Estimated Date / Season
          </label>
          <input
            id="eventDate"
            name="eventDate"
            type="text"
            value={formData.eventDate}
            onChange={handleChange}
            placeholder="e.g. Summer 2026 / Oct 24, 2026"
            className="w-full px-4 py-3 text-sm bg-ivory border border-linen focus:border-champagne focus:outline-none transition-colors"
          />
        </div>

        {/* Location */}
        <div className="space-y-2">
          <label htmlFor="location" className="block text-xs uppercase tracking-widest text-neutral-700 font-medium">
            Desired Location / Venue
          </label>
          <input
            id="location"
            name="location"
            type="text"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g. Lake Como, Italy or New York"
            className="w-full px-4 py-3 text-sm bg-ivory border border-linen focus:border-champagne focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <label htmlFor="message" className="block text-xs uppercase tracking-widest text-neutral-700 font-medium">
          Your Vision & Estimated Guest Count
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us about the atmosphere, aesthetic aspirations, and guest expectations for your celebration..."
          className="w-full px-4 py-3 text-sm bg-ivory border border-linen focus:border-champagne focus:outline-none transition-colors resize-none"
        />
      </div>

      <Button type="submit" size="lg" className="w-full">
        Send Confidential Inquiry
      </Button>
    </form>
  );
}
