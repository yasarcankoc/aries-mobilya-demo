"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import products from "../data/products.json";

export default function Navbar() {
  // Arama çubuğuna yazılan metni ve bulunan sonuçları tuttuğumuz hafıza
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Kullanıcının arama kutusu DIŞINA tıkladığını anlamak için bir referans
  const searchRef = useRef(null);

  // Müşteri her harf yazdığında çalışacak olan filtreleme motoru
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    // Hem ürün isminde hem de kategorisinde arama yapıyoruz
    const results = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setSearchResults(results);
  }, [searchQuery]);

  // Sayfada boş bir yere tıklanırsa arama menüsünü kapatma mantığı
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchQuery(""); // Aramayı temizle ve kutuyu kapat
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-8 py-4 flex flex-col lg:flex-row justify-between items-center gap-6">
        {/* Logo Alanı */}
        <Link
          href="/"
          className="text-3xl font-black text-gray-900 tracking-tighter"
        >
          aries<span className="text-blue-600">design</span>
        </Link>

        {/* Menü Linkleri */}
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

        {/* Sağ Taraf - Canlı Arama ve Buton */}
        <div
          className="flex items-center gap-4 w-full lg:w-auto relative"
          ref={searchRef}
        >
          {/* Arama Çubuğu */}
          <div className="relative w-full lg:w-72 border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all">
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

          {/* CANLI ARAMA SONUÇLARI (Müşteri yazı yazmaya başlayınca açılır) */}
          {searchQuery && (
            <div className="absolute top-full mt-2 right-0 lg:right-auto w-full lg:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col z-50">
              {searchResults.length > 0 ? (
                <div className="max-h-96 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-gray-200">
                  {searchResults.map((product) => (
                    <Link
                      href={`/urun/${product.slug}`}
                      key={product.id}
                      onClick={() => setSearchQuery("")} // Tıklanınca menüyü kapat
                      className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors group"
                    >
                      {/* Küçük Ürün Fotoğrafı */}
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform"
                        />
                      </div>
                      {/* Ürün Bilgileri */}
                      <div>
                        <p className="text-sm font-bold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                          {product.name}
                        </p>
                        <p className="text-xs text-gray-500 mb-1">
                          {product.category}
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
                  <p className="text-gray-500 font-medium">
                    "{searchQuery}" için sonuç bulunamadı.
                  </p>
                  <p className="text-sm text-gray-400 mt-2">
                    Farklı bir kelime denemeye ne dersiniz?
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Bizi Arayın Butonu */}
          <button className="hidden lg:block bg-blue-50 text-blue-600 px-6 py-3 rounded-xl font-bold cursor-pointer hover:bg-blue-600 hover:text-white transition-colors text-sm whitespace-nowrap">
            Bizi Arayın
          </button>
        </div>
      </div>
    </nav>
  );
}
