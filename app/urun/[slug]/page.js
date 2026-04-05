import products from "../../../data/products.json";
import Link from "next/link";
import Image from "next/image"; // Resimler için Image bileşenini unutmuyoruz

export default async function ProductDetail({ params }) {
  const { slug } = await params;

  // 1. Mevcut ürünü bul
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="text-center p-20">
        <h1 className="text-3xl font-bold text-red-500 mb-4">
          Ürün Bulunamadı!
        </h1>
        <Link href="/" className="text-blue-600 hover:underline font-semibold">
          &larr; Ana Sayfaya Dön
        </Link>
      </div>
    );
  }

  // 2. BENZER ÜRÜNLERİ BUL: Aynı kategoride olan ama şuan baktığımız ürün OLMAYAN ilk 3 ürünü getir
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 3);

  return (
    <main className="container mx-auto px-8 py-12">
      <Link
        href="/kategoriler"
        className="text-gray-500 hover:text-blue-600 mb-8 inline-block font-medium transition-colors"
      >
        &larr; Koleksiyonlara Dön
      </Link>

      {/* ÜST KISIM: ÜRÜN DETAYI */}
      <div className="flex flex-col md:flex-row gap-12 mb-24">
        <div className="md:w-1/2 bg-gray-100 aspect-square rounded-2xl relative overflow-hidden border border-gray-200 shadow-inner">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="md:w-1/2 flex flex-col justify-center">
          <span className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-bold w-max mb-6">
            {product.category}
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            {product.name}
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            {product.description}
          </p>
          <div className="text-4xl font-black text-gray-800 mb-10">
            {product.price}
          </div>

          {/* Akıllı WhatsApp Butonu */}
          <a
            href={`https://wa.me/905551234567?text=${encodeURIComponent(`Merhaba, ${product.name} (${product.price}) ile ilgileniyorum. Detaylı bilgi alabilir miyim?`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-green-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-600 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 w-full md:w-auto"
          >
            {/* WhatsApp İkonu */}
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.082 21.166c-1.451-.001-2.883-.371-4.145-1.077l-4.636 1.216 1.242-4.516c-.785-1.297-1.199-2.793-1.198-4.329.002-4.782 3.896-8.674 8.681-8.675 4.786.001 8.679 3.894 8.68 8.676-.002 4.783-3.895 8.673-8.624 8.705z" />
            </svg>
            WhatsApp'tan Bilgi Alın
          </a>
        </div>
      </div>

      {/* ALT KISIM: BENZER ÜRÜNLER VİTRİNİ */}
      {relatedProducts.length > 0 && (
        <div className="border-t border-gray-200 pt-16 mb-10">
          <h2 className="text-3xl font-black text-gray-900 mb-10 text-center md:text-left">
            Bunlar da İlginizi Çekebilir
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProducts.map((related) => (
              <Link
                href={`/urun/${related.slug}`}
                key={related.id}
                className="group flex flex-col"
              >
                <div className="bg-gray-100 h-64 rounded-2xl mb-4 relative overflow-hidden shadow-sm">
                  <Image
                    src={related.image}
                    alt={related.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                </div>
                <div className="px-2">
                  <h3 className="text-lg font-bold mb-1 text-gray-900 group-hover:text-blue-600 transition-colors">
                    {related.name}
                  </h3>
                  <p className="text-xl font-black text-gray-800">
                    {related.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
