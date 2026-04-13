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
    const {
      title,
      status,
      year,
      sort,
      genre,
      limit = 10,
      page = 1,
    } = req.query;

    // ✅ Parse numbers properly
    const parsedLimit = parseInt(limit, 10);
    const parsedPage = parseInt(page, 10);

    // ✅ Genre → MangaDex Tag IDs
    const genreMap = {
      action: "391b0423-d847-456f-aff0-8b0cfc03066b",
      romance: "423e2eae-a7a2-4a8b-ac03-a8351462d71d",
      comedy: "4d32cc48-9f00-4cca-9b5a-a839f0764984",
      fantasy: "cdc58593-87dd-415e-bbc0-2ec27bf404cc",
      horror: "cdad7e68-1419-41dd-bdce-27753074a640",
      drama: "b9af3a63-f058-46de-a9a0-e0c13906197a",
      sliceoflife: "e5301a23-ebd9-49dd-a0cb-2add944c7fe9",
    };

    const params = new URLSearchParams();

    // ✅ Basic filters
    if (title) params.append("title", title);
    if (status) params.append("status", status);
    if (year) params.append("year", year);

    // ✅ Genre filter (single or multiple)
    if (genre) {
      const genres = Array.isArray(genre) ? genre : [genre];

      genres.forEach((g) => {
        const tagId = genreMap[g.toLowerCase()];
        if (tagId) {
          params.append("includedTags[]", tagId);
        }
      });
    }

    // ✅ Pagination
    params.append("limit", parsedLimit);
    params.append("offset", (parsedPage - 1) * parsedLimit);

    // ✅ Sorting (rating, followCount, latestUploadedChapter, etc.)
    if (sort) {
      params.append("order[rating]", sort); // asc | desc
    }

    // ✅ Fetch from MangaDex
    const response = await fetch(`${BASE_URL}/manga?${params.toString()}`);

    if (!response.ok) {
      return res.status(response.status).json({
        message: "Failed to fetch from MangaDex",
      });
    }

    const data = await response.json();

    return res.status(200).json({
      message: "Search successful",
      filters: req.query,
      pagination: {
        page: parsedPage,
        limit: parsedLimit,
      },
      data,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Internal Server Error",
    });
  }
}
