'use server';

import { unstable_cache } from "next/cache";
import { globalSearchCore } from "@/lib/search";

export const globalSearch = async (query: string) => {
  return unstable_cache(
    async () => {
      return globalSearchCore(query);
    },
    [`global-search-${query}`],
    { revalidate: 60 }
  )();
};
