import PaginationBar from "../partials/paginationBar";

export default function AnimeTiles({ data, page }) {
  if (!data) return null;

  return (
    <div className="container mx-auto px-4 py-6 bg-[#111827] flex flex-col  gap-y-[24px]">
      <PaginationBar page={page} totalPages={30} />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {Array.isArray(data) ? (
          data.map((item) => <AnimeCard key={item.id} item={item} />)
        ) : (
          <AnimeCard item={data} />
        )}
      </div>
      <PaginationBar page={page} totalPages={30} />
    </div>
  );
}

function AnimeCard({ item }) {
  const title =
    item?.attributes?.title?.en ||
    item?.attributes?.title?.["ja-ro"] ||
    "Unknown Title";

  const altTitles = item?.attributes?.altTitles || [];
  const tags = item?.attributes?.tags || [];
  const englishAltTitle = altTitles.find((t) => t.en)?.en;

  return (
    <div className="bg-[#1F2937] border border-[rgba(255,255,255,0.08)] rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between text-[#F9FAFB]">
      {/* Header */}
      <div className="p-4 border-b border-[rgba(255,255,255,0.08)]">
        <h2 className="font-bold text-lg line-clamp-2 text-[#F9FAFB]">
          {title}
        </h2>

        <p className="text-xs text-[rgba(255,255,255,0.6)] mt-1">
          {item?.attributes?.year || "Unknown Year"} •{" "}
          {item?.attributes?.status || "Unknown Status"}
        </p>
      </div>

      {/* Alt Titles */}
      <div className="p-4 space-y-1">
        <p className="text-xs font-semibold text-[rgba(255,255,255,0.6)]">
          Alternative Titles
        </p>

        <div className="text-xs text-[rgba(255,255,255,0.6)] line-clamp-3">
          {englishAltTitle || "No alternative titles available."}
        </div>
      </div>

      {/* Tags */}
      <div className="p-4 flex flex-wrap gap-1">
        {tags.slice(0, 5).map((tag) => (
          <span
            key={tag.id}
            className="text-[10px] px-2 py-1 rounded-full bg-[#111827] border border-[rgba(255,255,255,0.08)] text-[rgba(255,255,255,0.7)]"
          >
            {tag.attributes.name.en}
          </span>
        ))}
      </div>

      {/* Button */}
      <div className="p-4">
        <button className="w-full py-2 text-sm rounded-lg bg-[#EAB308] text-[#111827] font-semibold hover:opacity-90 transition">
          View Details
        </button>
      </div>
    </div>
  );
}
