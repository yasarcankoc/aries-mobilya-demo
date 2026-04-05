"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import products from "../../data/products.json";
import Link from "next/link";
import Image from "next/image";

// 1. ASIL İÇERİĞİMİZ: Filtreleme işlemini yapan özel bileşenimiz
function CategoriesContent() {
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get("kategori"); // URL'den "kategori" parametresini çektik

  // Başlangıç durumunu (state) ayarlıyoruz: URL'de kategori varsa onu yap, yoksa 'Tümü' yap
  const [activeCategory, setActiveCategory] = useState(urlCategory || "Tümü");

  // JSON dosyamızdaki benzersiz kategori isimlerini çıkarıyoruz
  const uniqueCategories = [
    "Tümü",
    ...new Set(products.map((p) => p.category)),
  ];

  // Aktif kategoriye göre ürünleri filtreliyoruz
  const filteredProducts =
    activeCategory === "Tümü"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="container mx-auto px-8 py-16">
      {/* Sayfa Başlığı */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
          {activeCategory === "Tümü"
            ? "Tüm Koleksiyonlar"
            : `${activeCategory} Koleksiyonu`}
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          Aradığınız tarzı bulmak için kategorilerimiz arasında gezinin.
        </p>
      </div>

      {/* İnteraktif Filtreleme Butonları */}
      <div className="flex flex-wrap justify-center gap-4 mb-16">
        {uniqueCategories.map((category, index) => (
          <button
            key={index}
            onClick={() => setActiveCategory(category)}
            className={`px-8 py-3 rounded-full font-bold text-sm md:text-base transition-all duration-300 shadow-sm
              ${
                activeCategory === category
                  ? "bg-blue-600 text-white shadow-blue-500/30 -translate-y-1"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
              }
            `}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Filtrelenmiş Ürünler Izgarası */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredProducts.map((product) => (
          <Link
            href={`/urun/${product.slug}`}
            key={product.id}
            className="group flex flex-col"
          >
            <div className="bg-gray-100 h-80 rounded-2xl mb-6 relative overflow-hidden shadow-sm">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
            </div>
            <div className="px-2">
              <p className="text-sm text-blue-600 font-black tracking-widest uppercase mb-2">
                {product.category}
              </p>
              <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">
                {product.name}
              </h3>
              <p className="text-gray-500 text-base mb-4 line-clamp-2 leading-relaxed">
                {product.description}
              </p>
              <p className="text-3xl font-black text-gray-900">
                {product.price}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-2xl text-gray-400 font-medium">
            Bu kategoride henüz ürün bulunmuyor.
          </p>
        </div>
      )}
    </div>
  );
}

// 2. ANA SAYFA KORUYUCUSU: Next.js'in URL parametresi okuyabilmesi için sayfayı Suspense ile sarıyoruz
export default function CategoriesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[50vh] flex items-center justify-center text-xl font-bold text-gray-500">
          Koleksiyonlar Yükleniyor...
        </div>
      }
    >
      <CategoriesContent />
    </Suspense>
  );
}
