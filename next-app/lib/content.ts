export type Post = {
  slug: string;
  title: string;
  column: string;
  author: string;
};

export type Column = { name: string; href: string };

export const SITE = {
  name: "Satranç Kahvesi",
  tagline: "Kahve eşliğinde satranç sohbetleri.",
  url: "https://satranckahvesi.com",
} as const;

export const NAV = [
  { label: "Köşeler", href: "#koseler" },
  { label: "Yazılar", href: "#yazilar" },
  { label: "Yazarlar", href: "#yazarlar" },
  { label: "Hakkında", href: "https://satranckahvesi.com/hakkinda/" },
] as const;

export const FEATURED: Post & { excerpt: string } = {
  slug: "mar-del-plata-1982-jan-timman-ve-bir-zaferin-anatomisi",
  title: "Mar del Plata 1982: Jan Timman ve bir zaferin anatomisi",
  column: "Satranç tarihi",
  author: "FM Nazmi Can Doğan",
  excerpt:
    "Bir turnuvayı kazanmak ne demektir? Timman'ın Mar del Plata'daki zaferini, oyun oyun ve karar karar yeniden izliyoruz.",
};

export const COLUMNS: Column[] = [
  "Analizli oyunlar",
  "Satranç açılışları",
  "Satranç tarihi",
  "Turnuva günlükleri",
  "Kitap incelemeleri",
  "Başlangıç düzeyi",
  "Fragmanlar",
].map((name) => ({ name, href: `${SITE.url}/koseler/` }));

export const POSTS: Post[] = [
  { slug: "once-hamle-yap-sonra-dusun", title: "Önce hamle yap sonra düşün", column: "Kitap incelemeleri", author: "FM Nazmi Can Doğan" },
  { slug: "whitsun-acik-horvath-ve-arlesli-kiz", title: "Whitsun Açık, Horváth ve Arlesli Kız", column: "Turnuva günlükleri", author: "FM Tarık Selbes" },
  { slug: "capablanca-maglup-edilebilir-mi", title: "Capablanca mağlup edilebilir mi?", column: "Satranç tarihi", author: "FM Tarık Selbes" },
  { slug: "yarim-tempo-onde-acilisi-tersten-oynamak", title: "Yarım tempo önde: Açılışı tersten oynamak", column: "Analizli oyunlar", author: "Özgün Yalçın" },
  { slug: "avro-1938-tarihin-en-guclu-turnuvasi", title: "AVRO 1938: Tarihin en güçlü turnuvası", column: "Satranç tarihi", author: "FM Nazmi Can Doğan" },
  { slug: "ammandan-muglaya-reytingler-yalan-mi-soyluyor", title: "Amman'dan Muğla'ya: Reytingler yalan mı söylüyor?", column: "Analizli oyunlar", author: "GM Ahmad Al-Khatib" },
];

export const AUTHORS = [
  { name: "FM Nazmi Can Doğan", note: "Tarih, açılış, kitap" },
  { name: "FM Tarık Selbes", note: "Tarih, turnuva" },
  { name: "Özgün Yalçın", note: "Analizli oyunlar" },
  { name: "GM Ahmad Al-Khatib", note: "Analizli oyunlar" },
  { name: "Görkem Sivri", note: "Başlangıç düzeyi" },
];

export const postUrl = (slug: string) => `${SITE.url}/posts/${slug}/`;
