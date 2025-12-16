import { useState, useEffect } from 'react';
import { SiteConfig } from '@prisma/client';

export function useSiteConfig() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchConfig() {
      try {
        const res = await fetch('/api/cms/site/config');
        if (res.ok) {
          const data = await res.json();
          setConfig(data);
        }
      } catch (error) {
        console.error('Failed to fetch site config:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchConfig();
  }, []);

  return { config, loading };
}
