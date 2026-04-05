import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-8 py-16">
      {/* Başlık Alanı */}
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
          Hikayemiz
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          Sadece mobilya değil, yaşam alanlarınıza ruh katan sanat eserleri
          tasarlıyoruz. Yarım asırlık tecrübemizle ahşabın sıcaklığını
          evlerinize taşıyoruz.
        </p>
      </div>

      {/* Hikaye ve Görsel Alanı */}
      <div className="flex flex-col md:flex-row gap-16 items-center mb-24">
        <div className="md:w-1/2 relative h-96 w-full rounded-3xl overflow-hidden shadow-2xl">
          {/* Elimizdeki rustik masa fotoğrafını burada dekoratif olarak kullanıyoruz */}
          <Image
            src="/images/rustik.jpg"
            alt="Atölyemiz"
            fill
            className="object-cover hover:scale-105 transition-transform duration-1000"
          />
        </div>
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ustalık ve Tutku
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed text-lg">
            Kurulduğumuz ilk günden beri tek bir mottomuz var:{" "}
            <span className="font-bold text-gray-900">
              "Sadece kendi evimizde kullanacağımız kalitede ürünler üretmek."
            </span>{" "}
            Fabrikasyon üretimlerin ruhsuzluğundan uzaklaşıp, her bir parçaya
            ustalarımızın el emeğini ve sevgisini katıyoruz.
          </p>
          <p className="text-gray-600 mb-8 leading-relaxed text-lg">
            Sürdürülebilir ormancılık sertifikasına sahip ağaçlar kullanıyor,
            doğadan aldığımızı yine doğaya ve insanlığa en estetik biçimde
            sunuyoruz.
          </p>
          <Link
            href="/kategoriler"
            className="font-bold text-blue-600 hover:text-blue-800 flex items-center gap-2 transition-colors"
          >
            Koleksiyonlarımızı İnceleyin <span>&rarr;</span>
          </Link>
        </div>
      </div>

      {/* Değerlerimiz Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
        <div className="bg-gray-50 p-10 rounded-3xl border border-gray-100">
          <div className="text-4xl mb-4">🌿</div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Doğa Dostu</h3>
          <p className="text-gray-600">
            Üretimimizin her aşamasında çevreye duyarlı malzemeler ve geri
            dönüştürülebilir paketleme kullanıyoruz.
          </p>
        </div>
        <div className="bg-gray-50 p-10 rounded-3xl border border-gray-100">
          <div className="text-4xl mb-4">💎</div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            Premium Kalite
          </h3>
          <p className="text-gray-600">
            En kaliteli masif ahşaplar ve leke tutmaz özel dokuma kumaşlarla
            uzun ömürlü kullanım garantisi.
          </p>
        </div>
        <div className="bg-gray-50 p-10 rounded-3xl border border-gray-100">
          <div className="text-4xl mb-4">🤝</div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            Koşulsuz Destek
          </h3>
          <p className="text-gray-600">
            Satış sürecinden kuruluma ve sonrasına kadar her zaman bir telefon
            uzağınızdayız.
          </p>
        </div>
      </div>
    </div>
  );
}
