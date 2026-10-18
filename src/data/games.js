// Oyun tanımları — isim, kural özeti ve renkler Figma "06 · Ana Sayfa" ekranından.
export const GAMES = [
  {
    id: 'sayisal-loto',
    name: 'Sayısal Loto',
    rule: '6 sayı (1–90) + 1 Joker',
    color: '#f5333b',
    main: { count: 6, min: 1, max: 90 },
    extra: { label: 'Joker', count: 1, min: 1, max: 90, distinctFromMain: true },
  },
  {
    id: 'super-loto',
    name: 'Süper Loto',
    rule: '6 sayı (1–60)',
    color: '#ffa62b',
    main: { count: 6, min: 1, max: 60 },
    extra: null,
  },
  {
    id: 'sans-topu',
    name: 'Şans Topu',
    rule: '5 sayı (1–34) + 1 sayı (1–14)',
    color: '#ff49a3',
    main: { count: 5, min: 1, max: 34 },
    extra: { label: '+1', count: 1, min: 1, max: 14, distinctFromMain: false },
  },
  {
    id: 'on-numara',
    name: 'On Numara',
    rule: '10 sayı (1–80)',
    color: '#9d62ff',
    main: { count: 10, min: 1, max: 80 },
    extra: null,
  },
  {
    id: 'hizli-on',
    name: 'Hızlı On',
    rule: '1–10 sayı seç (1–80)',
    color: '#6c8bff',
    main: { count: 5, min: 1, max: 80, selectable: { min: 1, max: 10 } },
    extra: null,
  },
]

export const gameById = (id) => GAMES.find((g) => g.id === id)
