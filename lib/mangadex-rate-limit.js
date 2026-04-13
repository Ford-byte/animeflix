export const MANGADEX_LIMITS = {
  // MangaDex@Home (image loading)
  AT_HOME_SERVER: {
    endpoint: "/at-home/server",
    limit: 40,
    windowMs: 60 * 1000, // 1 minute
  },

  // Authentication
  AUTH_LOGIN: {
    endpoint: "/auth/login",
    limit: 30,
    windowMs: 60 * 60 * 1000, // 60 minutes
  },

  AUTH_REFRESH: {
    endpoint: "/auth/refresh",
    limit: 60,
    windowMs: 60 * 60 * 1000,
  },

  // Author
  AUTHOR_CREATE: {
    endpoint: "/author",
    method: "POST",
    limit: 10,
    windowMs: 60 * 60 * 1000,
  },

  AUTHOR_UPDATE: {
    endpoint: "/author",
    method: "PUT",
    limit: 10,
    windowMs: 60 * 1000,
  },

  AUTHOR_DELETE: {
    endpoint: "/author",
    method: "DELETE",
    limit: 10,
    windowMs: 10 * 60 * 1000,
  },

  // Captcha
  CAPTCHA_SOLVE: {
    endpoint: "/captcha/solve",
    limit: 10,
    windowMs: 10 * 60 * 1000,
  },

  // Cover
  COVER_CREATE: {
    endpoint: "/cover",
    method: "POST",
    limit: 100,
    windowMs: 10 * 60 * 1000,
  },

  COVER_UPDATE: {
    endpoint: "/cover",
    method: "PUT",
    limit: 100,
    windowMs: 10 * 60 * 1000,
  },

  COVER_DELETE: {
    endpoint: "/cover",
    method: "DELETE",
    limit: 10,
    windowMs: 10 * 60 * 1000,
  },

  // Chapter
  CHAPTER_READ: {
    endpoint: "/chapter/read",
    method: "POST",
    limit: 300,
    windowMs: 10 * 60 * 1000,
  },

  CHAPTER_UPDATE: {
    endpoint: "/chapter",
    method: "PUT",
    limit: 10,
    windowMs: 60 * 1000,
  },

  CHAPTER_DELETE: {
    endpoint: "/chapter",
    method: "DELETE",
    limit: 10,
    windowMs: 60 * 1000,
  },

  // Manga
  MANGA_CREATE: {
    endpoint: "/manga",
    method: "POST",
    limit: 10,
    windowMs: 60 * 60 * 1000,
  },

  MANGA_SEARCH: {
    limit: 5, // requests per window
    windowMs: 60 * 1000, // 1 minute
  },

  MANGA_UPDATE: {
    endpoint: "/manga",
    method: "PUT",
    limit: 10,
    windowMs: 60 * 60 * 1000,
  },

  MANGA_DELETE: {
    endpoint: "/manga",
    method: "DELETE",
    limit: 10,
    windowMs: 10 * 60 * 1000,
  },

  MANGA_RANDOM: {
    endpoint: "/manga/random",
    limit: 60,
    windowMs: 60 * 1000,
  },

  // Report
  REPORT: {
    endpoint: "/report",
    method: "POST",
    limit: 10,
    windowMs: 60 * 1000,
  },

  REPORT_GET: {
    endpoint: "/report",
    method: "GET",
    limit: 10,
    windowMs: 60 * 1000,
  },

  // Upload
  UPLOAD_SESSION: {
    endpoint: "/upload",
    method: "GET",
    limit: 30,
    windowMs: 60 * 1000,
  },

  UPLOAD_BEGIN: {
    endpoint: "/upload/begin",
    method: "POST",
    limit: 20,
    windowMs: 60 * 1000,
  },

  UPLOAD_COMMIT: {
    endpoint: "/upload/commit",
    method: "POST",
    limit: 10,
    windowMs: 60 * 1000,
  },

  UPLOAD_FILE: {
    endpoint: "/upload/file",
    method: "POST",
    limit: 250,
    windowMs: 60 * 1000,
  },
};
