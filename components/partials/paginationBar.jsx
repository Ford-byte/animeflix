import { useRouter } from "next/router";

export default function PaginationBar({ page = 1, totalPages = 102 }) {
  const router = useRouter();

  const changePage = (newPage) => {
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        page: newPage,
      },
    });
  };

  const getPages = () => {
    const pages = [];
    const delta = 2;

    const left = page - delta;
    const right = page + delta;

    let lastPage = 0;

    for (let i = 1; i <= totalPages; i++) {
      const isFirst = i === 1;
      const isLast = i === totalPages;
      const isNear = i >= left && i <= right;

      if (isFirst || isLast || isNear) {
        if (lastPage && i - lastPage > 1) {
          pages.push("...");
        }
        pages.push(i);
        lastPage = i;
      }
    }

    return pages;
  };

  return (
    <div className="flex flex-wrap justify-center items-center gap-2 mt-8">
      {/* Prev */}
      <button
        disabled={page <= 1}
        onClick={() => changePage(page - 1)}
        className="px-4 py-2 rounded bg-gray-800 text-white disabled:opacity-40"
      >
        Prev
      </button>

      {/* Pages */}
      {getPages().map((p, idx) =>
        p === "..." ? (
          <span key={idx} className="px-2 text-gray-400">
            ...
          </span>
        ) : (
          <button
            key={idx}
            onClick={() => changePage(p)}
            className={`px-3 py-1 rounded ${
              p === page
                ? "bg-yellow-500 text-black font-bold"
                : "bg-gray-700 text-white hover:bg-gray-600"
            }`}
          >
            {p}
          </button>
        ),
      )}

      {/* Next */}
      <button
        onClick={() => changePage(page + 1)}
        className="px-4 py-2 rounded bg-gray-800 text-white"
      >
        Next
      </button>
    </div>
  );
}
