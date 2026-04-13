import { useRouter } from "next/router";
import Link from "next/link";

export default function Menu() {
  const router = useRouter();

  const menuItems = [
    { name: "Anime", path: "/anime" },
    { name: "Trending", path: "/trending" },
    { name: "Popular", path: "/popular" },
  ];

  return (
    <div className="sticky top-0 z-50 shadow-md bg-gray-900 text-white">
      <div className="container flex justify-between items-center">
        <Link href="/" className="flex items-center text-[42px] py-4 font-bold">
          <span className="text-white">Anime</span>

          <span className="bg-yellow-500 text-black px-2 ml-1 rounded-sm leading-none">
            flix
          </span>
        </Link>

        <div className="flex gap-6">
          {menuItems.map((item) => {
            const isActive = router.pathname === item.path;

            return (
              <Link
                key={item.name}
                href={item.path}
                className={`px-3 py-2 text-lg font-medium border-b-2 transition ${
                  isActive
                    ? "border-yellow-500"
                    : "border-transparent hover:border-gray-500"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
