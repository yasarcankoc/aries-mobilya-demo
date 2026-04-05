"use client";
import { useState } from "react";
import products from "../data/products.json";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  // Formun gönderilme durumunu takip edeceğiz
  const [formDurumu, setFormDurumu] = useState("bekliyor");

  const handleHizliIletisim = (e) => {
    e.preventDefault();
    // 1. BAL KÜPÜ (HONEYPOT) KONTROLÜ
    // Eğer bot görünmez alanı doldurduysa, işlemi anında sessizce durduruyoruz
    const botTuzagi = e.target.bot_field.value;
    if (botTuzagi !== "") {
      console.log("Bot engellendi!");
      return;
    }

    // 2. SPAM KORUMASI (Cooldown)
    // Eğer form zaten gönderiliyorsa, art arda tıklanmasını engelle
    if (formDurumu === "gonderildi") return;

    setFormDurumu("gonderildi");

    setTimeout(() => {
      setFormDurumu("bekliyor");
      e.target.reset();
    }, 4000);
  };

  return (
    <div className="w-full">
      {/* 1. HERO BANNER */}
      <section className="relative h-[80vh] flex items-center justify-center bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <Image
            src="/images/header.jpeg"
            alt="Mobilya Kampanyası"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-sm font-bold tracking-wider mb-6">
            YENİ SEZON KOLEKSİYONU
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-2xl">
            Evinizin <span className="text-blue-400">Yeni</span> Yüzü
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-10 drop-shadow-md font-light">
            Modern, şık ve konforlu mobilyalarla yaşam alanlarınızı sanata
            dönüştürün. Yaza özel indirim fırsatlarını kaçırmayın.
          </p>
          <Link
            href="/kategoriler"
            className="inline-block bg-blue-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-blue-500 hover:-translate-y-1 transition-all shadow-[0_0_40px_rgba(37,99,235,0.4)]"
          >
            Koleksiyonu Keşfet
          </Link>
        </div>
      </section>

      {/* 2. MAĞAZA ÖZELLİKLERİ */}
      <section className="container mx-auto px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="text-5xl mb-6">🚚</div>
            <h3 className="text-xl font-black mb-3 text-gray-900">
              Ücretsiz Teslimat
            </h3>
            <p className="text-gray-600">
              Tüm Türkiye'ye sigortalı ve ücretsiz teslimat ile profesyonel
              kurulum hizmeti.
            </p>
          </div>
          <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="text-5xl mb-6">⭐</div>
            <h3 className="text-xl font-black mb-3 text-gray-900">
              1. Sınıf Kalite
            </h3>
            <p className="text-gray-600">
              Avrupa standartlarında üretilmiş, masif ahşap ve garantili
              dayanıklı malzemeler.
            </p>
          </div>
          <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="text-5xl mb-6">🛡️</div>
            <h3 className="text-xl font-black mb-3 text-gray-900">
              Güvenli Alışveriş
            </h3>
            <p className="text-gray-600">
              Satış sonrası 7/24 kesintisiz destek ve koşulsuz iade garantisiyle
              içiniz rahat olsun.
            </p>
          </div>
        </div>
      </section>

      {/* 3. ÖNE ÇIKAN ÜRÜNLER (Vitrin) */}
      <section className="container mx-auto px-8 pb-20">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-200 pb-6">
          <div>
            <h2 className="text-4xl font-black text-gray-900 mb-2">
              Öne Çıkan Ürünler
            </h2>
            <p className="text-gray-500 text-lg">
              Müşterilerimizin en çok tercih ettiği ikonik tasarımlar.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* SİHİR BURADA: products yerine products.slice(0, 6) yazıyoruz! */}
          {products.slice(0, 6).map((product) => (
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

        {/* YENİ EKLENEN ŞIK "TÜMÜNÜ GÖR" BUTONU */}
        <div className="mt-16 text-center">
          <Link
            href="/kategoriler"
            className="inline-flex items-center justify-center gap-3 bg-white border-2 border-gray-900 text-gray-900 px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-900 hover:text-white transition-all duration-300 shadow-sm hover:shadow-2xl transform hover:-translate-y-1"
          >
            Tüm Koleksiyonu İncele
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              ></path>
            </svg>
          </Link>
        </div>
      </section>

      {/* YENİ EKLENEN BÖLÜMLER AŞAĞIDADIR */}

      {/* 4. KATEGORİ KOLEKSİYONLARI (Büyük Görsel Blokları) */}
      <section className="bg-gray-50 py-24">
        <div className="container mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              Yaşam Alanlarınızı Keşfedin
            </h2>
            <p className="text-xl text-gray-500">
              Her odaya özel tasarlanmış eşsiz koleksiyonlar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Büyük Sol Blok */}
            <Link
              href="/kategoriler?kategori=Yatak Odası"
              className="relative h-[500px] md:h-[750px] group overflow-hidden rounded-3xl shadow-lg"
            >
              <Image
                src="/images/yatakodasi.jpg"
                alt="Yatak Odası"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {/* Karartma Efekti (Yazı okunsun diye) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-10 left-10 text-white">
                <h3 className="text-3xl font-bold mb-2">Yatak Odası</h3>
                <p className="text-gray-200 group-hover:text-white transition-colors flex items-center gap-2">
                  Huzuru Keşfet <span>&rarr;</span>
                </p>
              </div>
            </Link>

            <div className="grid grid-rows-2 gap-8">
              {/* Sağ Üst Blok */}
              <Link
                href="/kategoriler?kategori=Banyo"
                className="relative group overflow-hidden rounded-3xl shadow-lg"
              >
                <Image
                  src="/images/banyo.jpg"
                  alt="Banyo"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-8 left-8 text-white">
                  <h3 className="text-2xl font-bold mb-1">Banyo</h3>
                  <p className="text-sm text-gray-200 group-hover:text-white transition-colors">
                    Şık Konsept &rarr;
                  </p>
                </div>
              </Link>

              {/* Sağ Alt Blok */}
              <Link
                href="/kategoriler?kategori=Oturma Odası"
                className="relative group overflow-hidden rounded-3xl shadow-lg"
              >
                <Image
                  src="/images/oturmaodasi.jpg"
                  alt="Oturma Odası"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-8 left-8 text-white">
                  <h3 className="text-2xl font-bold mb-1">Oturma Odası</h3>
                  <p className="text-sm text-gray-200 group-hover:text-white transition-colors">
                    Günün Yorgunluğunu Atın &rarr;
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. MÜŞTERİ YORUMLARI (Sosyal Kanıt) */}
      <section className="container mx-auto px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-gray-900 mb-4">
            Mutlu Müşterilerimiz
          </h2>
          <p className="text-xl text-gray-500">
            Bizim için en büyük referans, evine dokunduğumuz insanların
            yüzündeki gülümsemedir.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Yorum Kartı 1 */}
          <div className="bg-white p-8 border border-gray-100 rounded-3xl shadow-lg shadow-gray-100/50">
            <div className="text-yellow-400 text-2xl mb-4 tracking-widest">
              ★★★★★
            </div>
            <h4 className="font-bold text-gray-900 text-lg mb-3">
              Harika Kalite
            </h4>
            <p className="text-gray-600 mb-6 italic">
              "Aldığımız yemek masası resmen evimizin havasını değiştirdi.
              Ahşabın dokusu ve kalitesi gerçekten inanılmaz. Kurulum ekibi de
              çok ilgiliydi."
            </p>
            <p className="font-bold text-gray-900">- Ayşe Yılmaz</p>
            <p className="text-sm text-gray-400">İstanbul, Kadıköy</p>
          </div>
          {/* Yorum Kartı 2 */}
          <div className="bg-white p-8 border border-gray-100 rounded-3xl shadow-lg shadow-gray-100/50">
            <div className="text-yellow-400 text-2xl mb-4 tracking-widest">
              ★★★★★
            </div>
            <h4 className="font-bold text-gray-900 text-lg mb-3">
              Tam İstediğim Gibi
            </h4>
            <p className="text-gray-600 mb-6 italic">
              "Chester koltuk takımı için haftalarca mağaza gezdim, buradaki
              işçiliği hiçbir yerde bulamadım. Kumaşı ve rahatlığı tek kelimeyle
              mükemmel."
            </p>
            <p className="font-bold text-gray-900">- Caner Özden</p>
            <p className="text-sm text-gray-400">Ankara, Çankaya</p>
          </div>
          {/* Yorum Kartı 3 */}
          <div className="bg-white p-8 border border-gray-100 rounded-3xl shadow-lg shadow-gray-100/50">
            <div className="text-yellow-400 text-2xl mb-4 tracking-widest">
              ★★★★★
            </div>
            <h4 className="font-bold text-gray-900 text-lg mb-3">
              Süper İletişim
            </h4>
            <p className="text-gray-600 mb-6 italic">
              "Siparişimden teslimata kadar her aşamada WhatsApp üzerinden
              bilgilendirildim. Satış sonrası bu kadar ilgili bir firma bulmak
              zor."
            </p>
            <p className="font-bold text-gray-900">- Elif Kaya</p>
            <p className="text-sm text-gray-400">İzmir, Karşıyaka</p>
          </div>
        </div>
      </section>

      {/* 6. HIZLI İLETİŞİM VE TEKLİF FORMU (Bülten Yerine) */}
      <section className="bg-blue-600 py-24 mt-10 relative overflow-hidden">
        {/* Dekoratif Arka Plan Işıkları */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-white blur-3xl"></div>
          <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-blue-400 blur-3xl"></div>
        </div>

        <div className="container mx-auto px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            {/* Sol Taraf: İkna Edici Metin ve İkonlar */}
            <div className="lg:w-1/2 text-white text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight drop-shadow-md">
                Hayalinizdeki Projeyi <br />
                <span className="text-blue-200">Birlikte Tasarlayalım</span>
              </h2>
              <p className="text-blue-100 text-lg mb-10 max-w-lg mx-auto lg:mx-0 font-light leading-relaxed">
                Özel ölçü mobilya üretiminden, iç mimari danışmanlığa kadar tüm
                ihtiyaçlarınız için bize yazın. Uzman ekibimiz en kısa sürede
                size özel fiyat teklifiyle dönüş yapsın.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-8">
                <div className="flex items-center gap-4 bg-white/10 px-6 py-3 rounded-2xl border border-white/20 backdrop-blur-sm">
                  <div className="text-3xl">📐</div>
                  <div className="text-left">
                    <p className="font-bold text-white tracking-wide">
                      Özel Ölçü
                    </p>
                    <p className="text-xs text-blue-200">Tam evinize göre</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-white/10 px-6 py-3 rounded-2xl border border-white/20 backdrop-blur-sm">
                  <div className="text-3xl">✏️</div>
                  <div className="text-left">
                    <p className="font-bold text-white tracking-wide">
                      Ücretsiz Çizim
                    </p>
                    <p className="text-xs text-blue-200">3D projelendirme</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sağ Taraf: Beyaz Kayan Form Kartı */}
            <div className="lg:w-1/2 w-full max-w-lg mx-auto lg:mx-0">
              <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-2xl relative overflow-hidden">
                {/* Başarı Mesajı (Form gönderildiğinde burası üstünü kapatır) */}
                {formDurumu === "gonderildi" && (
                  <div className="absolute inset-0 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center z-20">
                    <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center text-4xl mb-6">
                      ✓
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 mb-2">
                      Talebiniz Alındı!
                    </h3>
                    <p className="text-gray-600 font-medium">
                      Ekibimiz en kısa sürede sizinle iletişime geçecektir.
                    </p>
                  </div>
                )}

                <h3 className="text-2xl font-extrabold text-gray-900 mb-6">
                  Hızlı Fiyat & Bilgi Alın
                </h3>

                <form onSubmit={handleHizliIletisim} className="space-y-5">
                  {/* BOT TUZAĞI (HONEYPOT) - Ekranda görünmez, insan tıklayamaz */}
                  <input
                    type="text"
                    name="bot_field"
                    className="hidden"
                    tabIndex="-1"
                    autoComplete="off"
                  />
                  <div>
                    <input
                      required
                      type="text"
                      placeholder="Adınız Soyadınız"
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-700 font-medium"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-5">
                    <input
                      required
                      type="tel"
                      placeholder="Telefon Numaranız"
                      className="w-full sm:w-1/2 px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-700 font-medium"
                    />
                    <input
                      type="email"
                      placeholder="E-Posta (Opsiyonel)"
                      className="w-full sm:w-1/2 px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-700 font-medium"
                    />
                  </div>
                  <div>
                    <textarea
                      required
                      rows="3"
                      placeholder="İlgilendiğiniz ürün, özel ölçüleriniz veya projenizden bahsedin..."
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none text-gray-700 font-medium"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gray-900 cursor-pointer text-white font-bold text-lg py-4 rounded-xl hover:bg-blue-600 transition-colors shadow-xl shadow-blue-900/20 transform hover:-translate-y-1"
                  >
                    Teklif İste
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
