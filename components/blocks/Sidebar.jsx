import { Search } from "lucide-react";
import { useRouter } from "next/router";
import { useState } from "react";

// ✅ Your genre map (UUIDs)
const genreMap = {
  action: "391b0423-d847-456f-aff0-8b0cfc03066b",
  romance: "423e2eae-a7a2-4a8b-ac03-a8351462d71d",
  comedy: "4d32cc48-9f00-4cca-9b5a-a839f0764984",
  fantasy: "cdc58593-87dd-415e-bbc0-2ec27bf404cc",
  horror: "cdad7e68-1419-41dd-bdce-27753074a640",
};

// ✅ Convert keys → UI labels
const genres = Object.keys(genreMap).map((key) => ({
  label: key.charAt(0).toUpperCase() + key.slice(1),
  value: key, // IMPORTANT: still send "action", not UUID
}));

export default function Sidebar({ activeGenre, search }) {
  const router = useRouter();
  const [value, setValue] = useState(search || "");

  const changeGenre = (genre) => {
    const current = router.query.genre;
    const newQuery = { ...router.query };

    if (current === genre) {
      delete newQuery.genre; // toggle off
    } else {
      newQuery.genre = genre;
    }

    newQuery.page = 1;

    router.push({
      pathname: "/anime",
      query: newQuery,
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();

    router.push({
      pathname: "/anime",
      query: {
        ...router.query,
        search: value,
        page: 1,
      },
    });
  };

  const colors = {
    bg: "#111827",
    surface: "#1F2937",
    border: "rgba(255,255,255,0.08)",
    text: "#F9FAFB",
    muted: "rgba(255,255,255,0.6)",
    accent: "#EAB308",
  };

  return (
    <div
      style={{
        fontFamily: "'DM Sans', sans-serif",
        background: colors.bg,
        border: `1px solid ${colors.border}`,
        borderRadius: 16,
        padding: 18,
        width: "100%",
      }}
    >
      {/* 🔍 SEARCH */}
      <form
        onSubmit={handleSearch}
        style={{ position: "relative", marginBottom: 24 }}
      >
        <Search
          size={16}
          style={{
            position: "absolute",
            left: 12,
            top: "50%",
            transform: "translateY(-50%)",
            color: colors.muted,
          }}
        />

        <input
          type="text"
          placeholder="Search anime…"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={{
            width: "100%",
            background: colors.surface,
            border: `1px solid ${colors.border}`,
            borderRadius: 12,
            padding: "10px 12px 10px 36px",
            color: colors.text,
            fontSize: 13,
            outline: "none",
          }}
        />
      </form>

      {/* 🎯 GENRES */}
      <p
        style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: colors.muted,
          marginBottom: 12,
        }}
      >
        Genres
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {genres.map((g) => {
          const isActive = activeGenre === g.value;

          return (
            <button
              key={g.value}
              onClick={() => changeGenre(g.value)}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                padding: "10px 12px",
                borderRadius: 10,
                cursor: "pointer",
                background: isActive ? colors.accent : colors.surface,
                border: `1px solid ${isActive ? colors.accent : colors.border}`,
                color: isActive ? "#111827" : colors.muted,
                fontSize: 13,
                fontWeight: 500,
                transition: "all 0.15s ease",
              }}
            >
              {g.label}

              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: isActive ? "#111827" : "rgba(255,255,255,0.2)",
                }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
