// ============================================================
// YKS KONU VERİLERİ
// ============================================================

const YKS_DATA = {
  tyt: {
    label: "TYT",
    subjects: [
      {
        id: "tyt_turkce",
        label: "Türkçe",
        icon: "📖",
        color: "#6ee7f7",
        units: [
          {
            title: "1️⃣ Sözcükte Anlam",
            topics: [
              "Gerçek, mecaz, terim anlam",
              "Eş anlam, zıt anlam",
              "Yakın anlam",
              "Çok anlamlılık",
              "Deyimler ve atasözleri",
              "Sözcükler arası anlam ilişkileri"
            ]
          },
          {
            title: "2️⃣ Cümlede Anlam",
            topics: [
              "Cümlede anlam ilişkileri",
              "Amaç – sonuç, neden – sonuç",
              "Koşul, karşılaştırma",
              "Varsayım, çıkarım, öneri",
              "Duygu ve düşünce"
            ]
          },
          {
            title: "3️⃣ Paragrafta Anlam",
            topics: [
              "Ana fikir – yardımcı fikir",
              "Paragrafın konusu",
              "Paragrafın yapısı",
              "Paragraf tamamlama",
              "Paragraf sıralama",
              "Anlatım biçimleri",
              "Düşünceyi geliştirme yolları"
            ]
          },
          {
            title: "4️⃣ Ses Bilgisi",
            topics: [
              "Ünlü uyumu",
              "Ünlü daralması",
              "Ünsüz yumuşaması",
              "Ünsüz benzeşmesi",
              "Ünsüz türemesi",
              "Ses düşmesi"
            ]
          },
          {
            title: "5️⃣ Yazım Kuralları",
            topics: [
              "Büyük harflerin kullanımı",
              "Birleşik kelimeler",
              "Sayıların yazımı",
              "Kısaltmalar",
              "Eklerin yazımı"
            ]
          },
          {
            title: "6️⃣ Noktalama İşaretleri",
            topics: [
              "Nokta",
              "Virgül",
              "Noktalı virgül",
              "İki nokta",
              "Tırnak işareti",
              "Parantez",
              "Kesme işareti"
            ]
          },
          {
            title: "7️⃣ Biçim Bilgisi (Morfoloji)",
            topics: [
              "Kök ve ek",
              "Yapım eki – çekim eki",
              "İsim, sıfat, zamir",
              "Zarf",
              "Edat, bağlaç, ünlem"
            ]
          },
          {
            title: "8️⃣ Fiil Bilgisi",
            topics: [
              "Fiilde kip",
              "Fiilde kişi",
              "Ek-fiil",
              "Fiilde yapı",
              "Fiilimsiler",
              "Fiilde çatı"
            ]
          },
          {
            title: "9️⃣ Cümle Bilgisi",
            topics: [
              "Cümlenin ögeleri",
              "Cümle türleri",
              "Fiil cümlesi – isim cümlesi",
              "Olumlu – olumsuz cümle"
            ]
          },
          {
            title: "🔟 Anlatım Bozuklukları",
            topics: [
              "Anlam belirsizliği",
              "Gereksiz sözcük kullanımı",
              "Mantık hataları",
              "Özne – yüklem uyumsuzluğu"
            ]
          }
        ]
      },
      {
        id: "tyt_matematik",
        label: "Matematik",
        icon: "🔢",
        color: "#818cf8",
        units: [
          {
            title: "1️⃣ Temel Kavramlar",
            topics: [
              "Sayı kümeleri",
              "Tek – çift sayılar",
              "Ardışık sayılar",
              "Sayı basamakları",
              "Bölünebilme kuralları",
              "Asal sayılar",
              "EBOB – EKOK"
            ]
          },
          {
            title: "2️⃣ Rasyonel ve Reel Sayılar",
            topics: [
              "Rasyonel sayılar",
              "Ondalıklı sayılar",
              "Aralık kavramı"
            ]
          },
          {
            title: "3️⃣ Denklem ve Eşitsizlikler",
            topics: [
              "Birinci derece denklemler",
              "Mutlak değer",
              "Üslü ifadeler",
              "Köklü ifadeler",
              "İkinci derece denklemler",
              "Karmaşık sayılar"
            ]
          },
          {
            title: "4️⃣ Problemler",
            topics: [
              "Oran – orantı",
              "Yüzde",
              "Kâr – zarar",
              "Karışım",
              "Hareket",
              "İşçi",
              "Yaş problemleri"
            ]
          },
          {
            title: "5️⃣ Mantık",
            topics: [
              "Önermeler",
              "Bileşik önermeler",
              "Koşullu ve iki yönlü önerme",
              "Niceleyiciler"
            ]
          },
          {
            title: "6️⃣ Kümeler",
            topics: [
              "Küme kavramı",
              "Alt küme",
              "İşlemler (birleşim, kesişim, fark)"
            ]
          },
          {
            title: "7️⃣ Sayma ve Olasılık",
            topics: [
              "Saymanın temel ilkesi",
              "Permütasyon",
              "Kombinasyon",
              "Binom",
              "Olasılık"
            ]
          },
          {
            title: "8️⃣ Fonksiyonlar",
            topics: [
              "Fonksiyon tanımı",
              "Fonksiyon türleri",
              "Bileşke",
              "Ters fonksiyon",
              "Fonksiyon grafikleri"
            ]
          },
          {
            title: "9️⃣ Polinomlar ve Çarpanlara Ayırma",
            topics: [
              "Polinom işlemleri",
              "Özdeşlikler",
              "Rasyonel ifadeler"
            ]
          },
          {
            title: "🔟 İstatistik",
            topics: [
              "Veri",
              "Merkezi eğilim",
              "Grafikler"
            ]
          }
        ]
      },
      {
        id: "tyt_geometri",
        label: "Geometri",
        icon: "📐",
        color: "#34d399",
        units: [
          {
            title: "Konular",
            topics: [
              "Doğruda açılar",
              "Üçgende açılar",
              "Üçgende kenar – açı ilişkileri",
              "Üçgende alan",
              "Benzerlik",
              "Çokgenler",
              "Dörtgenler",
              "Yamuk",
              "Paralelkenar",
              "Eşkenar dörtgen",
              "Çember ve daire",
              "Katı cisimler (küre, silindir, prizma)"
            ]
          }
        ]
      },
      {
        id: "tyt_fizik",
        label: "Fizik",
        icon: "⚡",
        color: "#fbbf24",
        units: [
          {
            title: "1️⃣ Fizik Bilimine Giriş",
            topics: [
              "Fizik ve alt dalları",
              "Temel büyüklükler"
            ]
          },
          {
            title: "2️⃣ Madde ve Özellikleri",
            topics: [
              "Özkütle",
              "Dayanıklılık",
              "Adezyon – kohezyon"
            ]
          },
          {
            title: "3️⃣ Hareket ve Kuvvet",
            topics: [
              "Hareket türleri",
              "İvme",
              "Newton yasaları",
              "Sürtünme"
            ]
          },
          {
            title: "4️⃣ İş – Enerji – Güç",
            topics: [
              "Enerji türleri",
              "Enerji korunumu",
              "Verim"
            ]
          },
          {
            title: "5️⃣ Isı ve Sıcaklık",
            topics: [
              "Hâl değişimi",
              "Genleşme",
              "Isıl denge"
            ]
          },
          {
            title: "6️⃣ Elektrik ve Manyetizma",
            topics: [
              "Elektrik yükü",
              "Elektrik alan",
              "Akım",
              "Ohm yasası",
              "Manyetik alan"
            ]
          },
          {
            title: "7️⃣ Basınç ve Kaldırma",
            topics: [
              "Katı basıncı",
              "Sıvı basıncı",
              "Bernoulli",
              "Kaldırma kuvveti"
            ]
          },
          {
            title: "8️⃣ Dalgalar",
            topics: [
              "Yay dalgaları",
              "Su dalgaları",
              "Ses",
              "Deprem"
            ]
          },
          {
            title: "9️⃣ Optik",
            topics: [
              "Yansıma",
              "Kırılma",
              "Aynalar",
              "Mercekler",
              "Renk"
            ]
          }
        ]
      },
      {
        id: "tyt_kimya",
        label: "Kimya",
        icon: "🧪",
        color: "#f472b6",
        units: [
          {
            title: "1️⃣ Kimya Bilimi",
            topics: [
              "Simyadan kimyaya",
              "Kimya disiplinleri",
              "İş güvenliği"
            ]
          },
          {
            title: "2️⃣ Atom ve Periyodik Sistem",
            topics: [
              "Atom modelleri",
              "Atomun yapısı",
              "Periyodik özellikler"
            ]
          },
          {
            title: "3️⃣ Kimyasal Türler ve Etkileşimler",
            topics: [
              "İyonik bağ",
              "Kovalent bağ",
              "Zayıf etkileşimler"
            ]
          },
          {
            title: "4️⃣ Maddenin Hâlleri",
            topics: [
              "Katı",
              "Sıvı",
              "Gaz",
              "Plazma"
            ]
          },
          {
            title: "5️⃣ Kimyanın Temel Kanunları",
            topics: [
              "Mol kavramı",
              "Tepkimeler",
              "Hesaplamalar"
            ]
          },
          {
            title: "6️⃣ Karışımlar",
            topics: [
              "Homojen – heterojen",
              "Ayırma yöntemleri"
            ]
          },
          {
            title: "7️⃣ Asit – Baz – Tuz",
            topics: [
              "Özellikleri",
              "Tepkimeleri"
            ]
          },
          {
            title: "8️⃣ Günlük Hayat Kimyası",
            topics: [
              "Kozmetik",
              "İlaç",
              "Gıda"
            ]
          }
        ]
      },
      {
        id: "tyt_biyoloji",
        label: "Biyoloji",
        icon: "🧬",
        color: "#4ade80",
        units: [
          {
            title: "1️⃣ Canlıların Ortak Özellikleri",
            topics: [
              "Canlıların ortak özellikleri"
            ]
          },
          {
            title: "2️⃣ Biyomoleküller",
            topics: [
              "İnorganik bileşikler",
              "Organik bileşikler",
              "Karbonhidrat",
              "Lipit",
              "Protein",
              "Enzim",
              "Nükleik asit",
              "ATP"
            ]
          },
          {
            title: "3️⃣ Hücre",
            topics: [
              "Hücre teorisi",
              "Organeller",
              "Zar yapısı"
            ]
          },
          {
            title: "4️⃣ Madde Geçişleri",
            topics: [
              "Difüzyon",
              "Osmoz",
              "Aktif taşıma",
              "Endositoz"
            ]
          },
          {
            title: "5️⃣ Hücre Bölünmesi",
            topics: [
              "Mitoz",
              "Mayoz",
              "Hücre döngüsü"
            ]
          },
          {
            title: "6️⃣ Kalıtım",
            topics: [
              "Mendel",
              "Kan grupları",
              "Eşeye bağlı kalıtım",
              "Soyağacı"
            ]
          },
          {
            title: "7️⃣ Ekoloji",
            topics: [
              "Ekosistem",
              "Besin zinciri",
              "Madde döngüsü"
            ]
          },
          {
            title: "8️⃣ Çevre Sorunları ve Sürdürülebilirlik",
            topics: [
              "Çevre sorunları ve sürdürülebilirlik"
            ]
          }
        ]
      },
      {
        id: "tyt_tarih",
        label: "Tarih",
        icon: "🏛️",
        color: "#fb923c",
        units: [
          {
            title: "Konular",
            topics: [
              "Tarih bilimi ve zaman",
              "İlk Türk devletleri",
              "İslam tarihi",
              "Türk – İslam devletleri",
              "Osmanlı kuruluş ve yükselme",
              "Osmanlı değişim ve modernleşme",
              "I. Dünya Savaşı",
              "Milli Mücadele",
              "Atatürk ilke ve inkılapları"
            ]
          }
        ]
      },
      {
        id: "tyt_cografya",
        label: "Coğrafya",
        icon: "🌍",
        color: "#2dd4bf",
        units: [
          {
            title: "Konular",
            topics: [
              "Doğa ve insan",
              "Dünya’nın hareketleri",
              "Harita bilgisi",
              "Atmosfer ve iklim",
              "Türkiye’nin fiziki özellikleri",
              "Nüfus ve yerleşme",
              "Göç",
              "Ekonomik faaliyetler",
              "Afetler"
            ]
          }
        ]
      },
      {
        id: "tyt_felsefe",
        label: "Felsefe",
        icon: "🤔",
        color: "#c084fc",
        units: [
          {
            title: "Konular",
            topics: [
              "Felsefenin konusu",
              "Bilgi felsefesi",
              "Varlık felsefesi",
              "Ahlak felsefesi",
              "Siyaset felsefesi",
              "Din felsefesi"
            ]
          }
        ]
      },
      {
        id: "tyt_din",
        label: "Din Kültürü",
        icon: "☪️",
        color: "#e2e8f0",
        units: [
          {
            title: "Konular",
            topics: [
              "İnanç esasları",
              "İbadetler",
              "Hz. Muhammed’in hayatı",
              "Kur’an ve yorumu",
              "Ahlak ve değerler"
            ]
          }
        ]
      }
    ]
  },

  ayt: {
    label: "AYT",
    subjects: [
      {
        id: "ayt_matematik",
        label: "Matematik",
        icon: "📊",
        color: "#818cf8",
        units: [
          {
            title: "1️⃣ Fonksiyonlar ve Parabol",
            topics: [
              "Fonksiyon grafikleri",
              "Artan – azalan fonksiyon",
              "Ortalama değişim hızı",
              "İkinci dereceden fonksiyonlar",
              "Parabol"
            ]
          },
          {
            title: "2️⃣ Denklemler ve Eşitsizlikler",
            topics: [
              "İkinci dereceden denklem",
              "Denklem sistemleri",
              "Eşitsizlik sistemleri"
            ]
          },
          {
            title: "3️⃣ Olasılık",
            topics: [
              "Koşullu olasılık",
              "Bağımsız olaylar",
              "Bileşik olaylar"
            ]
          },
          {
            title: "4️⃣ Trigonometri",
            topics: [
              "Birim çember",
              "Trigonometrik fonksiyonlar",
              "Toplam – fark formülleri",
              "İki kat açı",
              "Trigonometrik denklemler"
            ]
          },
          {
            title: "5️⃣ Üstel ve Logaritma",
            topics: [
              "Üstel ve logaritma"
            ]
          },
          {
            title: "6️⃣ Diziler",
            topics: [
              "Aritmetik dizi",
              "Geometrik dizi",
              "Toplam formülleri"
            ]
          },
          {
            title: "7️⃣ Limit ve Süreklilik",
            topics: [
              "Limit ve süreklilik"
            ]
          },
          {
            title: "8️⃣ Türev",
            topics: [
              "Türev kuralları",
              "Ekstremum",
              "Maksimum – minimum problemleri"
            ]
          },
          {
            title: "9️⃣ İntegral",
            topics: [
              "Belirsiz integral",
              "Belirli integral",
              "Alan hesaplama"
            ]
          },
          {
            title: "🔟 Analitik Geometri",
            topics: [
              "Analitik düzlem",
              "Çember",
              "Çemberin analitik incelenmesi"
            ]
          },
          {
            title: "1️⃣1️⃣ Katı Cisimler",
            topics: [
              "Silindir",
              "Koni",
              "Küre"
            ]
          }
        ]
      },
      {
        id: "ayt_fizik",
        label: "Fizik",
        icon: "🔬",
        color: "#fbbf24",
        units: [
          {
            title: "1️⃣ Mekanik",
            topics: [
              "Vektörler ve hareket",
              "Vektörler",
              "Bağıl hareket",
              "Newton’ın hareket yasaları",
              "Bir boyutta sabit ivmeli hareket",
              "Serbest düşme ve hava direnç kuvveti",
              "Düşey atış (yukarı – aşağı)",
              "Yatay atış",
              "Eğik atış",
              "İş – enerji – momentum",
              "İş kavramı ve enerji türleri",
              "Enerjinin korunumu",
              "İtme ve çizgisel momentum",
              "Momentumun korunumu (1 ve 2 boyutlu çarpışmalar)",
              "Tork ve denge",
              "Tork",
              "Denge şartları",
              "Kütle ve ağırlık merkezi",
              "Basit makineler"
            ]
          },
          {
            title: "2️⃣ Elektrik ve Manyetizma",
            topics: [
              "Elektrik",
              "Elektriksel kuvvet",
              "Elektrik alan",
              "Elektriksel potansiyel enerji ve potansiyel",
              "Potansiyel fark ve elektriksel iş",
              "Düzgün elektrik alan",
              "Sığa ve sığaçlar",
              "Manyetizma ve elektromanyetizma",
              "Manyetik alan",
              "Manyetik kuvvet ve tel üzerindeki etkisi",
              "Yüklü parçacıkların manyetik alandaki hareketi",
              "Manyetik akı ve indüksiyon",
              "Öz indüksiyon ve elektromotor kuvvet",
              "Alternatif akım",
              "Transformatörler"
            ]
          },
          {
            title: "3️⃣ Çembersel Hareket ve Dönme",
            topics: [
              "Düzgün çembersel hareket",
              "Merkezcil kuvvet",
              "Virajlarda güvenli dönüş",
              "Öteleme ve dönme hareketi",
              "Eylemsizlik momenti",
              "Dönme kinetik enerjisi",
              "Açısal momentum"
            ]
          },
          {
            title: "4️⃣ Kütle Çekim ve Harmonik Hareket",
            topics: [
              "Kütle çekim kuvveti",
              "Kepler kanunları",
              "Basit harmonik hareket",
              "Basit sarkaç ve yay sarkacı"
            ]
          },
          {
            title: "5️⃣ Dalga Mekaniği ve Optik",
            topics: [
              "Su dalgalarında kırınım ve girişim",
              "Işığın çift yarıkta girişimi",
              "Işığın tek yarıkta kırınımı",
              "Işığın dalga doğası ve Doppler olayı",
              "Elektromanyetik dalgalar"
            ]
          },
          {
            title: "6️⃣ Modern Fizik",
            topics: [
              "Atomun tarihsel gelişimi",
              "Bohr atom modeli",
              "Büyük Patlama teorisi",
              "Radyoaktivite",
              "Özel görelilik",
              "Fotoelektrik olay",
              "Compton saçılması",
              "De Broglie dalga boyu"
            ]
          },
          {
            title: "7️⃣ Modern Teknoloji",
            topics: [
              "Görüntüleme cihazları",
              "LCD ve plazma teknolojisi",
              "Yarı iletkenler",
              "Süper iletkenler",
              "Nanoteknoloji",
              "LASER"
            ]
          }
        ]
      },
      {
        id: "ayt_kimya",
        label: "Kimya",
        icon: "⚗️",
        color: "#f472b6",
        units: [
          {
            title: "1️⃣ Modern Atom Teorisi",
            topics: [
              "Atomun kuantum modeli",
              "Elektron dizilimleri",
              "Periyodik özellikler",
              "Yükseltgenme basamakları"
            ]
          },
          {
            title: "2️⃣ Gazlar",
            topics: [
              "Gaz yasaları",
              "İdeal gaz",
              "Gaz karışımları",
              "Gerçek gazlar"
            ]
          },
          {
            title: "3️⃣ Çözeltiler",
            topics: [
              "Çözücü – çözünen etkileşimi",
              "Derişim birimleri",
              "Koligatif özellikler",
              "Çözünürlük"
            ]
          },
          {
            title: "4️⃣ Kimyasal Tepkimelerde Enerji ve Hız",
            topics: [
              "Tepkime entalpisi",
              "Bağ enerjileri",
              "Tepkime hızı",
              "Denge",
              "Asit – baz dengesi",
              "Tampon çözeltiler",
              "Çözünme – çökelme"
            ]
          },
          {
            title: "5️⃣ Elektrokimya",
            topics: [
              "Redoks tepkimeleri",
              "Elektrotlar",
              "Elektrot potansiyeli",
              "Elektroliz",
              "Korozyon"
            ]
          },
          {
            title: "6️⃣ Organik Kimya",
            topics: [
              "Organik bileşikler",
              "Lewis yapısı ve hibritleşme",
              "Hidrokarbonlar",
              "Fonksiyonel gruplar",
              "Alkoller",
              "Eterler",
              "Aldehitler",
              "Ketonlar",
              "Karboksilik asitler",
              "Esterler"
            ]
          },
          {
            title: "7️⃣ Kimya ve Enerji",
            topics: [
              "Fosil yakıtlar",
              "Alternatif enerji",
              "Sürdürülebilirlik",
              "Nanoteknoloji"
            ]
          }
        ]
      },
      {
        id: "ayt_biyoloji",
        label: "Biyoloji",
        icon: "🦠",
        color: "#4ade80",
        units: [
          {
            title: "1️⃣ İnsan Fizyolojisi",
            topics: [
              "Sinir ve endokrin sistem",
              "Sinir sistemi",
              "Sinir doku",
              "İmpuls oluşumu",
              "Merkezi ve çevresel sinir sistemi",
              "Hormonlar ve endokrin sistem",
              "Duyu ve destek sistemleri",
              "Duyu organları",
              "İskelet sistemi",
              "Kas sistemi",
              "Sindirim ve dolaşım",
              "Sindirim sistemi",
              "Kan dolaşımı",
              "Lenf sistemi",
              "Bağışıklık sistemi",
              "Solunum ve boşaltım",
              "Solunum sistemi",
              "Üriner sistem",
              "Üreme ve gelişim",
              "Erkek ve dişi üreme sistemi",
              "Menstrual döngü",
              "Döllenme",
              "Embriyonik gelişim"
            ]
          },
          {
            title: "2️⃣ Ekoloji",
            topics: [
              "Komünite ekolojisi",
              "Popülasyon ekolojisi",
              "Canlılar ve çevre"
            ]
          },
          {
            title: "3️⃣ Moleküler Biyoloji ve Genetik",
            topics: [
              "Nükleik asitler",
              "DNA’nın kendini eşlemesi",
              "Genetik şifre",
              "Protein sentezi",
              "Genetik mühendisliği",
              "Biyoteknoloji"
            ]
          },
          {
            title: "4️⃣ Metabolizma ve Enerji",
            topics: [
              "ATP",
              "Fotosentez",
              "Kemosentez",
              "Hücresel solunum",
              "Fermantasyon"
            ]
          },
          {
            title: "5️⃣ Bitki Biyolojisi",
            topics: [
              "Bitkisel dokular",
              "Bitkisel organlar",
              "Bitki hormonları",
              "Bitkilerde hareket",
              "Bitkilerde madde taşınması",
              "Bitkilerde eşeyli üreme"
            ]
          }
        ]
      },
      {
        id: "ayt_edebiyat",
        label: "Edebiyat",
        icon: "📜",
        color: "#6ee7f7",
        units: [
          {
            title: "Konular",
            topics: [
              "İslamiyet öncesi Türk edebiyatı",
              "Halk edebiyatı",
              "Divan edebiyatı",
              "Tanzimat",
              "Servet-i Fünun",
              "Fecr-i Ati",
              "Milli Edebiyat",
              "Cumhuriyet dönemi",
              "Edebi akımlar"
            ]
          }
        ]
      },
      {
        id: "ayt_tarih1",
        label: "Tarih-1",
        icon: "⚔️",
        color: "#fb923c",
        units: [
          {
            title: "Konular",
            topics: [
              "Osmanlı kültür ve medeniyeti",
              "İnkılap tarihi",
              "20. yy Türk tarihi"
            ]
          }
        ]
      },
      {
        id: "ayt_cografya1",
        label: "Coğrafya-1",
        icon: "🗺️",
        color: "#2dd4bf",
        units: [
          {
            title: "Konular",
            topics: [
              "Türkiye ekonomik coğrafyası",
              "Küresel ticaret",
              "Çevre sorunları"
            ]
          }
        ]
      },
      {
        id: "ayt_tarih2",
        label: "Tarih-2",
        icon: "🛡️",
        color: "#f59e0b",
        units: [
          {
            title: "Konular",
            topics: [
              "İlk Türk devletleri",
              "Osmanlı diplomasi",
              "Dünya tarihi (20. yy)",
              "Soğuk Savaş dönemi"
            ]
          }
        ]
      },
      {
        id: "ayt_cografya2",
        label: "Coğrafya-2",
        icon: "🌐",
        color: "#14b8a6",
        units: [
          {
            title: "Konular",
            topics: [
              "Enerji kaynakları",
              "Nüfus politikaları",
              "Bölgesel kalkınma",
              "Jeopolitik konum"
            ]
          }
        ]
      },
      {
        id: "ayt_felsefe_grubu",
        label: "Felsefe Grubu",
        icon: "🧠",
        color: "#c084fc",
        units: [
          {
            title: "Konular",
            topics: [
              "Psikoloji",
              "Sosyoloji",
              "Mantık"
            ]
          }
        ]
      },
      {
        id: "ayt_ydt",
        label: "Yabancı Dil (YDT)",
        icon: "🌍",
        color: "#e2e8f0",
        units: [
          {
            title: "Konular",
            topics: [
              "Kelime bilgisi",
              "Dil bilgisi",
              "Cloze test",
              "Paragraf",
              "Çeviri",
              "Diyalog tamamlama"
            ]
          }
        ]
      }
    ]
  }
};
