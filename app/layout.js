import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"; // Footer'ı içeri aktardık

export const metadata = {
  title: "Mobilya Mağazası | Şıklık ve Konfor",
  description: "Eviniz için en modern ve kaliteli mobilyalar.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body className="antialiased bg-white text-gray-900 flex flex-col min-h-screen">
        <Navbar />
        {/* Ana içerik alanı tüm boşluğu kaplasın diye flex-grow verdik */}
        <main className="flex-grow">{children}</main>
        <Footer /> {/* Footer'ı en alta yerleştirdik */}
      </body>
    </html>
  );
}
