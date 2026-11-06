import type { MetadataRoute } from "next";
import { SITE, absoluteUrl } from "@/lib/site";

// AI search and assistant crawlers, named so it's explicit they're welcome (answer-engine visibility).
// Remove a name here to opt that crawler out.
const AI_CRAWLERS = [
  "GPTBot", // OpenAI training
  "OAI-SearchBot", // ChatGPT search
  "ChatGPT-User", // ChatGPT browsing on a user's request
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended", // Gemini / Vertex AI
  "Applebot-Extended", // Apple Intelligence
  "Amazonbot",
  "Bingbot",
  "DuckAssistBot",
  "meta-externalagent",
  "CCBot", // Common Crawl, used by many open models
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/api/" },
      { userAgent: AI_CRAWLERS, allow: "/", disallow: "/api/" },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: SITE.url,
  };
}
