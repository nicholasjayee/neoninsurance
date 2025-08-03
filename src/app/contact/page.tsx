import React from "react";

// Importing the child components for the Contact page structure
import ContactHeroSection from "@/components/pages/contact/ContactHeroSection";
import ContactDetailsSection from "@/components/pages/contact/ContactDetailsSection";
import ContactFormSection from "@/components/pages/contact/ContactFormSection";
import FaqSection from "@/components/pages/contact/FaqSection";

export default function ContactPage() {
  return (
    // Using a <main> tag for better semantic HTML
    <main>
      <ContactHeroSection />
      <ContactDetailsSection />
      <ContactFormSection />
      <FaqSection />
    </main>
  );
}
