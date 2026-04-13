const store = new Map();

export function rateLimit(endpoint, limit, windowMs) {
  return (req, res) => {
    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress;

    const key = `${ip}:${endpoint}`;
    const now = Date.now();

    if (!store.has(key)) {
      store.set(key, []);
    }

    const timestamps = store.get(key);

    const filtered = timestamps.filter((t) => now - t < windowMs);

    filtered.push(now);
    store.set(key, filtered);

    if (filtered.length > limit) {
      const retryAfter = Math.ceil((filtered[0] + windowMs - now) / 1000);

      res.status(429).json({
        message: "Rate limit exceeded",
        retryAfter,
      });

      return false;
    }

    return true;
  };
}
