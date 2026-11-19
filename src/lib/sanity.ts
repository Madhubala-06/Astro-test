import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

// Sanity Client Configuration
export const sanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || "YOUR_PROJECT_ID",
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: true, 
  perspective: 'published',
});

// Image URL Builder
const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  // auto("format") serves WebP/AVIF when the browser supports it
  return builder.image(source).auto("format").quality(75);
}

// Helper function to fetch data
export async function sanityFetch<T>(query: string, params = {}): Promise<T> {
  return sanityClient.fetch<T>(query, params);
}
