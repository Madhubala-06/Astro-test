import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

// Sanity Client Configuration
export const sanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || "YOUR_PROJECT_ID",
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01", // Use today's date
  useCdn: true, // `true` for faster, cached responses
});

// Image URL Builder
const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Helper function to fetch data
export async function sanityFetch<T>(query: string, params = {}): Promise<T> {
  return sanityClient.fetch<T>(query, params);
}
