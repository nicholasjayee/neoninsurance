/**
 * Utility functions for handling external image URLs.
 */

/**
 * Converts a Google Drive "view" link to a direct image link.
 * Example input: https://drive.google.com/file/d/1XjwY2JRVDTm26Ohu4Q3xuukv0DzxnD-7/view?usp=drivesdk
 * Example output: https://drive.google.com/uc?export=view&id=1XjwY2JRVDTm26Ohu4Q3xuukv0DzxnD-7
 * 
 * @param url The URL to check and potentially convert.
 * @returns The converted URL or the original URL if no conversion is needed.
 */
export function getDirectImageUrl(url: string): string {
  if (!url) return "";

  // Handle Google Drive links
  if (url.includes("drive.google.com") || url.includes("docs.google.com")) {
    // Extract the ID
    const idMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (idMatch && idMatch[1]) {
      return `https://drive.google.com/uc?export=view&id=${idMatch[1]}`;
    }
  }

  return url;
}

/**
 * Checks if a URL is a Cloudinary URL.
 * @param url The URL to check.
 * @returns True if it is a Cloudinary URL, false otherwise.
 */
export function isCloudinaryUrl(url: string): boolean {
  return url.includes("cloudinary.com");
}
