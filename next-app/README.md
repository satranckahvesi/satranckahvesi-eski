# Satranç Kahvesi — Next.js ana sayfa önerisi

Ana sayfa tasarımının Next.js (App Router, React 19, TypeScript) uyarlaması. Statik dışa aktarım (`output: "export"`)
kullanır; Jekyll sitesinden bağımsızdır.

```bash
npm install
npm run dev        # geliştirme sunucusu
npm run typecheck  # tip denetimi
npm run lint       # ESLint
npm run build      # ./out klasörüne statik çıktı
```

İçerik `lib/content.ts` içindedir. Şimdilik elle yazılmış örnek veridir; üretimde Jekyll `_posts` front matter'ından
(ya da site `feed.xml`'inden) üretilmelidir.
