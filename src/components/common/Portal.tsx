"use client"; // This must be a Client Component as it interacts with the DOM.

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

// --- Type Definition for Component Props ---
interface PortalProps {
  children: ReactNode;
}

// --- Main Exported Component --- (Preserved as an arrow function)
const Portal: React.FC<PortalProps> = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Preserving your original cleanup function.
    return () => setMounted(false);
  }, []); // The empty dependency array is preserved.

  // The logic to only render the portal on the client-side is preserved.
  // We add a check to ensure the target element exists before attempting to create the portal.
  const portalRoot =
    typeof window !== "undefined"
      ? document.querySelector("#portal-root")
      : null;

  return mounted && portalRoot ? createPortal(children, portalRoot) : null;
};

// --- Export Statement --- (Preserved exactly)
export default Portal;
