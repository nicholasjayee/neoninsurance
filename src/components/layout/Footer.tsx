import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { getSiteConfig } from "@/lib/siteConfig";

// This is a Server Component by default - no 'use client' needed.
export default async function Footer() {
  const config = await getSiteConfig();

  if (!config) return null;

  return (
    <footer className="bg-brand-light text-brand-text-secondary">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand Info */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <Link href="/" className="mb-4 flex items-center gap-2">
              <Image
                src={"/Neon logo orig.svg"}
                width={40} // Specify width for next/image
                height={40} // Specify height for next/image
                alt={`${config.name} Logo`}
              />
              <span className="text-xl font-bold text-brand-text-primary">
                {config.name}
              </span>
            </Link>
            <p className="text-sm">
              Clarity in complexity. Your unwavering advocates in securing your
              world.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="mb-4 font-bold text-brand-text-primary">Navigate</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-brand-primary"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="transition-colors hover:text-brand-primary"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="transition-colors hover:text-brand-primary"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="transition-colors hover:text-brand-primary"
                >
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="mb-4 font-bold text-brand-text-primary">
              Contact Us
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="text-brand-text-tertiary">
                {config.addressLine1}
              </li>
              <li className="text-brand-text-tertiary">
                {config.poBox}, {config.addressLine2}
              </li>
              <li className="font-medium text-brand-text-secondary">
                Tel: <a href={`tel:${config.telephone.replace(/\s/g, '')}`} className="hover:text-brand-primary">{config.telephone}</a>
              </li>
              <li className="font-medium text-brand-text-secondary">
                <a href={`mailto:${config.email}`} className="hover:text-brand-primary">{config.email}</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Social Media */}
          <div>
            <h4 className="mb-4 font-bold text-brand-text-primary">Connect</h4>
            <div className="flex space-x-4">
              {config.facebookUrl && (
                <a
                  href={config.facebookUrl}
                  className="transition-colors hover:text-brand-primary"
                  aria-label="Facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebook size={20} />
                </a>
              )}
              {config.twitterUrl && (
                <a
                  href={config.twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-brand-primary"
                  aria-label="Twitter"
                >
                  <FaTwitter size={20} />
                </a>
              )}
              {config.instagramUrl && (
                <a
                  href={config.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-brand-primary"
                  aria-label="Instagram"
                >
                  <FaInstagram size={20} />
                </a>
              )}
              {config.linkedinUrl && (
                <a
                  href={config.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-brand-primary"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin size={20} />
                </a>
              )}
              {config.youtubeUrl && (
                <a
                  href={config.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-brand-primary"
                  aria-label="YouTube"
                >
                  <FaYoutube size={20} />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Copyright Section */}
        <div className="mt-12 border-t border-brand-border pt-8 text-center text-sm text-brand-text-tertiary">
          <p>
            © {new Date().getFullYear()} {config.name}. All
            Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
