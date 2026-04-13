export default function Banner() {
  return (
    <div className="h-screen flex items-center w-full bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white">
      <div className="container mx-auto px-4 py-20 flex flex-col items-center text-center">
        {/* 🔍 Search Bar */}
        <div className="w-full max-w-3/5 mb-8">
          <input
            type="text"
            placeholder="Search anime..."
            className="w-full px-5 py-5 rounded-full bg-white text-black outline-none border border-gray-700 focus:border-yellow-500 transition"
          />
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold">
          Discover Unlimited Anime
        </h1>

        {/* Description */}
        <p className="mt-4 text-gray-300 max-w-2xl">
          Watch trending, popular, and latest anime updates in one place. Stay
          updated with your favorite shows anytime.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex gap-4">
          <button className="px-6 py-3 bg-yellow-500 text-black font-semibold rounded-md hover:bg-yellow-400 transition">
            Explore Now
          </button>

          <button className="px-6 py-3 border border-gray-500 rounded-md hover:bg-gray-800 transition">
            Trending Anime
          </button>
        </div>
      </div>
    </div>
  );
}
