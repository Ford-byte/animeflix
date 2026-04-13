import { rateLimit } from "@/lib/rate-limit";
import { MANGADEX_LIMITS } from "@/lib/mangadex-rate-limit";

export default async function handler(req, res) {
  const { BASE_URL } = process.env;

  const config = MANGADEX_LIMITS.MANGA_SEARCH;

  if (!config) {
    return res.status(500).json({
      message: "Rate limit config missing",
    });
  }

  const limiter = rateLimit("manga-search-api", config.limit, config.windowMs);

  if (!limiter(req, res)) return;

  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({
      message: `Method ${req.method} Not Allowed`,
    });
  }

  try {
    const { title } = req.query;

    if (!title) {
      return res.status(400).json({
        message: "Title is required",
      });
    }

    const response = await fetch(
      `${BASE_URL}/manga?title=${encodeURIComponent(title)}&limit=10`,
    );

    if (!response.ok) {
      return res.status(response.status).json({
        message: "Failed to search MangaDex",
      });
    }

    const data = await response.json();

    return res.status(200).json({
      message: "Search successful",
      query: title,
      data,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Internal Server Error",
    });
  }
}
