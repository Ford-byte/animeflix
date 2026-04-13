import Menu from "@/components/_layout/Menu";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Menu />
      <Component {...pageProps} />
    </div>
  );
}
