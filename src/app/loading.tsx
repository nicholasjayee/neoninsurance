import { LoadingOverlay } from "@/components/layout/LoadingOverlay";

// This is a special Next.js file. It's a Server Component by default.
// It will automatically be shown as a fallback while page content loads.
export default function Loading() {
  // We just need to render our client-side animation component here.
  return <LoadingOverlay />;
}
