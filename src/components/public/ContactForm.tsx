"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import toast from "react-hot-toast";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(7, "Phone number is required"),
  company: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10, "Please describe your advertising requirements (min 10 characters)"),
});

type FormData = z.infer<typeof schema>;

const serviceOptions = [
  { value: "", label: "Select a service (optional)" },
  { value: "airport", label: "Airport Advertising (TIA)" },
  { value: "billboard", label: "Highway & City Billboards" },
  { value: "digital", label: "Digital Screens (DOOH)" },
  { value: "transit", label: "Transit Advertising" },
  { value: "mall", label: "Mall Advertising" },
  { value: "street", label: "Street Furniture" },
  { value: "production", label: "Production & Printing" },
  { value: "other", label: "Other / Not sure yet" },
];

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Submission failed");
      }

      setSubmitted(true);
      reset();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to send enquiry. Please try again.");
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircleIcon className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Thank you! We&apos;ve received your enquiry.
        </h3>
        <p className="text-gray-600 mb-6">
          Our team will review your requirements and get back to you within 4 business hours
          with site recommendations and pricing.
        </p>
        <p className="text-sm text-gray-500">
          For urgent requirements, call us directly at{" "}
          <a href="tel:+97714444444" className="text-brand-blue-600 font-semibold">
            +977-1-4444444
          </a>
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 text-sm text-gray-500 hover:text-gray-700 underline"
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Input
          label="Your Name"
          placeholder="Rajesh Shrestha"
          required
          error={errors.name?.message}
          {...register("name")}
        />
        <Input
          label="Company / Brand Name"
          placeholder="ABC Company Pvt. Ltd."
          error={errors.company?.message}
          {...register("company")}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Input
          label="Email Address"
          type="email"
          placeholder="you@company.com"
          required
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          label="Phone Number"
          type="tel"
          placeholder="+977-98XXXXXXXX"
          required
          error={errors.phone?.message}
          leftAddon="+977"
          {...register("phone")}
        />
      </div>

      <Select
        label="Service of Interest"
        options={serviceOptions}
        error={errors.service?.message}
        {...register("service")}
      />

      <Textarea
        label="Campaign Brief / Message"
        placeholder="Please describe your advertising objective, target audience, preferred locations, budget range, and campaign duration..."
        required
        rows={5}
        error={errors.message?.message}
        {...register("message")}
      />

      <div className="bg-blue-50 rounded-lg p-4 text-sm text-gray-600">
        <p>
          <strong>What happens next?</strong> Our media team will review your brief and prepare a
          customised site recommendation with rates and availability — within 4 business hours
          on weekdays.
        </p>
      </div>

      <Button type="submit" loading={isSubmitting} size="lg" className="w-full">
        {isSubmitting ? "Sending Your Enquiry..." : "Send Enquiry — Get Free Media Plan"}
      </Button>

      <p className="text-xs text-gray-400 text-center">
        By submitting this form you agree to our{" "}
        <a href="/privacy-policy" className="underline">Privacy Policy</a>. We never share
        your information with third parties.
      </p>
    </form>
  );
}
