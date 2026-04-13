import AnimeTiles from "@/components/blocks/AnimeTiles";
import Sidebar from "@/components/blocks/Sidebar";

export async function getServerSideProps(context) {
  const { genre = "action", search = "", page = 1 } = context.query;

  const limit = 9;

  const url = `http://localhost:3000/api/manga?genre=${genre}&search=${search}&limit=${limit}&page=${page}`;

  const res = await fetch(url);
  const data = await res.json();

  return {
    props: {
      manga: data?.data || [],
      genre,
      search,
      page: Number(page),
    },
  };
}

export default function Page({ manga, genre, search, page }) {
  return (
    <div className="container">
      <div className="py-4 flex gap-6">
        <div className="lg:w-1/4">
          <Sidebar activeGenre={genre} search={search} />
        </div>

        <div className="flex-1 w-full">
          <AnimeTiles data={manga?.data} page={page} />
        </div>
      </div>
    </div>
  );
}
