"use client";

import { useState } from "react";

export default function ContactPage() {
  const [gonderildi, setGonderildi] = useState(false);

  // Form gönderildiğinde çalışacak sahte (fake) işlem fonksiyonu
  const handleSubmit = (e) => {
    e.preventDefault(); // Sayfanın yenilenmesini engeller
    setGonderildi(true);

    // 4 saniye sonra teşekkür mesajını gizleyip formu sıfırlar
    setTimeout(() => {
      setGonderildi(false);
      e.target.reset();
    }, 4000);
  };

  return (
    <div className="container mx-auto px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
          Bize Ulaşın
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          Sorularınız, özel siparişleriniz veya kahve içmek için kapımız her
          zaman açık.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-16 max-w-6xl mx-auto">
        {/* Sol Taraf: İletişim Bilgileri */}
        <div className="md:w-1/3 space-y-8">
          <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              İletişim Bilgileri
            </h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="text-2xl">📍</div>
                <div>
                  <p className="font-bold text-gray-900">Adres</p>
                  <p className="text-gray-600 text-sm">
                    Merkez Mah. Mobilyacılar Sok. No:1, İstanbul
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-2xl">📞</div>
                <div>
                  <p className="font-bold text-gray-900">Telefon</p>
                  <p className="text-gray-600 text-sm">+90 (555) 123 45 67</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-2xl">✉️</div>
                <div>
                  <p className="font-bold text-gray-900">E-Posta</p>
                  <p className="text-gray-600 text-sm">bilgi@mobilya.com</p>
                </div>
              </div>
            </div>

            <hr className="my-8 border-gray-200" />

            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Çalışma Saatleri
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p className="flex justify-between">
                <span>Pazartesi - Cuma:</span> <span>09:00 - 19:00</span>
              </p>
              <p className="flex justify-between">
                <span>Cumartesi:</span> <span>10:00 - 18:00</span>
              </p>
              <p className="flex justify-between text-red-500 font-medium">
                <span>Pazar:</span> <span>Kapalı</span>
              </p>
            </div>
          </div>
        </div>

        {/* Sağ Taraf: Akıllı İletişim Formu */}
        <div className="md:w-2/3">
          <div className="bg-white p-8 md:p-12 rounded-3xl border border-gray-200 shadow-xl shadow-gray-200/50">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Mesaj Gönderin
            </h2>

            {/* Gönderildi Mesajı (Sadece state true ise görünür) */}
            {gonderildi && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-xl mb-8 flex items-center gap-3 animate-pulse">
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
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span className="font-medium">
                  Harika! Mesajınız bize ulaştı. En kısa sürede size dönüş
                  yapacağız.
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">
                    Adınız Soyadınız
                  </label>
                  <input
                    required
                    type="text"
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="Ahmet Yılmaz"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">
                    E-Posta Adresiniz
                  </label>
                  <input
                    required
                    type="email"
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="ahmet@ornek.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Konu</label>
                <input
                  required
                  type="text"
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="Sipariş, Bilgi, Destek..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">
                  Mesajınız
                </label>
                <textarea
                  required
                  rows="5"
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                  placeholder="Size nasıl yardımcı olabiliriz?"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gray-900 text-white font-bold text-lg py-4 rounded-xl hover:bg-blue-600 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Mesajı Gönder
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
