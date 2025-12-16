"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";

export default function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem("neon-cookie-consent");
    if (!hasConsented) {
      // Show banner after a short delay
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("neon-cookie-consent", "true");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("neon-cookie-consent", "false");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-md border border-brand-border shadow-2xl rounded-2xl p-6 md:flex items-center justify-between gap-6">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-bold text-brand-text-primary mb-2">
                We value your privacy
              </h3>
              <p className="text-sm text-brand-text-secondary">
                We use cookies to enhance your browsing experience, serve
                personalized content, and analyze our traffic. By clicking
                &quot;Accept All&quot;, you consent to our use of cookies.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Button variant="ghost" onClick={handleDecline} size="sm">
                Decline
              </Button>
              <Button variant="primary" onClick={handleAccept} size="sm">
                Accept All
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
