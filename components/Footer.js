import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16 mt-20">
      <div className="container mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Marka ve Açıklama */}
        <div>
          <h3 className="text-3xl font-black text-white mb-6 tracking-tighter">
            MO<span className="text-blue-500">BİLYA</span>
          </h3>
          <p className="text-sm leading-relaxed text-gray-400">
            Modern yaşam alanları için özenle tasarlanmış, yüksek kaliteli
            mobilya koleksiyonları. Evinizi baştan yaratın ve konforun tadını
            çıkarın.
          </p>
        </div>

        {/* Hızlı Linkler */}
        <div>
          <h4 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">
            Hızlı Bağlantılar
          </h4>
          <ul className="space-y-3 text-sm">
            <li>
              <Link href="/" className="hover:text-blue-400 transition-colors">
                Ana Sayfa
              </Link>
            </li>
            <li>
              <Link
                href="/kategoriler"
                className="hover:text-blue-400 transition-colors"
              >
                Koleksiyonlar
              </Link>
            </li>
            <li>
              <Link
                href="/hakkimizda"
                className="hover:text-blue-400 transition-colors"
              >
                Hakkımızda
              </Link>
            </li>
            <li>
              <Link
                href="/teslimat"
                className="hover:text-blue-400 transition-colors"
              >
                Teslimat ve Kurulum
              </Link>
            </li>
          </ul>
        </div>

        {/* İletişim Bilgileri */}
        <div>
          <h4 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">
            İletişim
          </h4>
          <div className="space-y-4 text-sm text-gray-400">
            <p className="flex items-center gap-3">
              <span className="text-xl">📍</span> Merkez Mah. Mobilyacılar Sok.
              No:1, İstanbul
            </p>
            <p className="flex items-center gap-3">
              <span className="text-xl">📞</span> +90 (555) 123 45 67
            </p>
            <p className="flex items-center gap-3">
              <span className="text-xl">✉️</span> bilgi@mobilya.com
            </p>
          </div>
        </div>
      </div>

      {/* Telif Hakkı Çizgisi */}
      <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Mobilya Mağazası. Tüm hakları
        saklıdır.
      </div>
    </footer>
  );
}
