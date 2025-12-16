'use client';

import { useFormStatus } from "react-dom";
import { subscribeToNewsletter } from "@/app/(app)/actions/newsletter";
import { FiMail, FiCheck, FiAlertCircle } from "react-icons/fi";
import { useEffect, useRef, useActionState } from "react";

const initialState = {
  success: false,
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-brand-primary hover:bg-brand-primary-dark text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed min-w-[140px]"
    >
      {pending ? (
        <span className="animate-pulse">Subscribing...</span>
      ) : (
        <>
          Subscribe <FiMail />
        </>
      )}
    </button>
  );
}

export default function NewsletterForm() {
  const [state, formAction] = useActionState(subscribeToNewsletter, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success && formRef.current) {
      formRef.current.reset();
    }
  }, [state.success]);

  return (
    <div className="bg-brand-dark/5 border border-brand-border rounded-2xl p-8 md:p-12 my-16 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-brand-text-primary mb-4">
          Join the <span className="text-brand-primary">Neon Pulse</span>
        </h2>
        <p className="text-brand-text-secondary mb-8 text-lg">
          Get the latest insurance insights, tech trends, and exclusive offers delivered straight to your inbox.
        </p>

        <form action={formAction} ref={formRef} className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto">
          <div className="grow relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-brand-text-tertiary">
              <FiMail />
            </div>
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email address"
              className="w-full pl-10 pr-4 py-3 bg-white border border-brand-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
            />
          </div>
          <SubmitButton />
        </form>

        {state.message && (
          <div
            className={`mt-4 flex items-center justify-center gap-2 text-sm font-medium animate-in fade-in slide-in-from-top-2 ${
              state.success ? "text-green-600" : "text-red-500"
            }`}
          >
            {state.success ? <FiCheck /> : <FiAlertCircle />}
            {state.message}
          </div>
        )}
      </div>
    </div>
  );
}
