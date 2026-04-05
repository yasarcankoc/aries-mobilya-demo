"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation"; // Sayfa değişimini takip etmek için
import products from "../data/products.json";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const searchRef = useRef(null);

  // YENİ: Mobil Menü State'i
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // YENİ: Sayfa değiştiğinde mobil menüyü otomatik kapat
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setSearchQuery("");
  }, [pathname]);

  // YENİ: Mobil menü açıkken arka planın kaymasını engelle
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    // Temizlik
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // Canlı Arama Mantığı
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }
    const results = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setSearchResults(results);
  }, [searchQuery]);

  // Boşa Tıklanınca Aramayı Kapatma
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchQuery("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-6 lg:px-8 py-4 flex justify-between items-center gap-6">
        {/* Logo Alanı (Z-indeksi yüksek tutuyoruz ki menü açıldığında üstte kalsın) */}
        <Link
          href="/"
          className="text-3xl font-black text-gray-900 tracking-tighter relative z-[60]"
        >
          aries<span className="text-blue-600">design</span>
        </Link>

        {/* Masaüstü Menü Linkleri */}
        <div className="hidden lg:flex gap-8 font-medium text-gray-600">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Ana Sayfa
          </Link>
          <Link
            href="/kategoriler"
            className="hover:text-blue-600 transition-colors"
          >
            Kategoriler
          </Link>
          <Link
            href="/hakkimizda"
            className="hover:text-blue-600 transition-colors"
          >
            Hakkımızda
          </Link>
          <Link
            href="/iletisim"
            className="hover:text-blue-600 transition-colors"
          >
            İletişim
          </Link>
        </div>

        {/* Sağ Taraf - Masaüstü Arama ve Butonlar */}
        <div
          className="hidden lg:flex items-center gap-4 relative"
          ref={searchRef}
        >
          {/* Masaüstü Arama Çubuğu */}
          <div className="relative w-72 border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 transition-all">
            <input
              type="text"
              placeholder="Ürün veya kategori ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50/50 outline-none px-4 py-3 text-sm text-gray-700"
            />
            <div className="absolute right-3 top-3 text-gray-400">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
          </div>

          {/* Masaüstü Arama Sonuçları */}
          {searchQuery && (
            <div className="absolute top-full mt-2 right-0 w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col z-50">
              {searchResults.length > 0 ? (
                <div className="max-h-96 overflow-y-auto p-2 scrollbar-thin">
                  {searchResults.map((product) => (
                    <Link
                      href={`/urun/${product.slug}`}
                      key={product.id}
                      onClick={() => setSearchQuery("")}
                      className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors group"
                    >
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                          {product.name}
                        </p>
                        <p className="text-sm text-blue-600 font-black">
                          {product.price}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <p className="text-gray-500 font-medium">Sonuç bulunamadı.</p>
                </div>
              )}
            </div>
          )}

          {/* Masaüstü Bizi Arayın Butonu */}
          <button className="bg-blue-50 text-blue-600 px-6 py-3 cursor-pointer rounded-xl font-bold hover:bg-blue-600 hover:text-white transition-colors text-sm whitespace-nowrap">
            Bizi Arayın
          </button>
        </div>

        {/* YENİ: Mobil Hamburger / Kapat Butonu */}
        <button
          className="lg:hidden relative z-[60] p-2 text-gray-900 bg-gray-50 rounded-lg"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Menüyü Aç/Kapat"
        >
          {isMobileMenuOpen ? (
            // Kapat (X) İkonu
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          ) : (
            // Hamburger (Üç Çizgi) İkonu
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          )}
        </button>
      </div>

      {/* YENİ: Tam Ekran Mobil Menü (Aşağı kayarak açılır) */}
      <div
        className={`fixed inset-0 bg-white z-50 flex flex-col pt-24 px-6 transition-transform duration-500 ease-in-out lg:hidden overflow-y-auto ${isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"}`}
      >
        {/* Mobil Canlı Arama Çubuğu */}
        <div className="relative w-full border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 transition-all mb-8">
          <input
            type="text"
            placeholder="Ne aramıştınız? (Örn: Ceviz)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-50 outline-none px-5 py-4 text-base text-gray-700"
          />
        </div>

        {/* Mobil Arama Sonuçları (Yazı yazıldığında görünür) */}
        {searchQuery && (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden flex flex-col z-50 mb-8">
            {searchResults.length > 0 ? (
              <div className="max-h-64 overflow-y-auto p-2">
                {searchResults.map((product) => (
                  <Link
                    href={`/urun/${product.slug}`}
                    key={product.id}
                    className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors"
                  >
                    <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 line-clamp-1">
                        {product.name}
                      </p>
                      <p className="text-sm text-blue-600 font-black">
                        {product.price}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center">
                <p className="text-gray-500">Sonuç bulunamadı.</p>
              </div>
            )}
          </div>
        )}

        {/* Mobil Menü Linkleri (Arama yapılmıyorsa görünür) */}
        {!searchQuery && (
          <div className="flex flex-col gap-6 text-2xl font-black text-gray-900">
            <Link
              href="/"
              className="hover:text-blue-600 transition-colors border-b border-gray-100 pb-4"
            >
              Ana Sayfa
            </Link>
            <Link
              href="/kategoriler"
              className="hover:text-blue-600 transition-colors border-b border-gray-100 pb-4"
            >
              Tüm Koleksiyonlar
            </Link>
            <Link
              href="/hakkimizda"
              className="hover:text-blue-600 transition-colors border-b border-gray-100 pb-4"
            >
              Hikayemiz
            </Link>
            <Link
              href="/iletisim"
              className="hover:text-blue-600 transition-colors border-b border-gray-100 pb-4"
            >
              İletişim
            </Link>

            <button className="mt-4 bg-gray-900 text-white px-6 py-4 rounded-xl font-bold text-lg text-center shadow-lg active:scale-95 transition-transform">
              Bizi Arayın: 0555 123 45 67
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
