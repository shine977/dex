export const locales = [
  "zh-CN",
  "en",
  "ja",
  "ko",
  "fr",
  "zh-TW",
  "zh-HK",
  "yue",
] as const;
export type Locale = (typeof locales)[number];

export interface Language {
  id: Locale;
  name: string;
  localName: string;
  flag: string;
  region?: string;
}

export const languages: Language[] = [
  {
    id: "zh-CN",
    name: "Simplified Chinese",
    localName: "简体中文",
    flag: "🇨🇳",
  },
  {
    id: "zh-TW",
    name: "Traditional Chinese (Taiwan)",
    localName: "繁體中文",
    flag: "🇹🇼",
    region: "台灣",
  },
  {
    id: "zh-HK",
    name: "Traditional Chinese (Hong Kong)",
    localName: "繁體中文",
    flag: "🇭🇰",
    region: "香港",
  },
  {
    id: "yue",
    name: "Cantonese",
    localName: "粤语",
    flag: "🇭🇰",
  },
  {
    id: "en",
    name: "English",
    localName: "English",
    flag: "🇺🇸",
  },
  {
    id: "ja",
    name: "Japanese",
    localName: "日本語",
    flag: "🇯🇵",
  },
  {
    id: "ko",
    name: "Korean",
    localName: "한국어",
    flag: "🇰🇷",
  },
  {
    id: "fr",
    name: "French",
    localName: "Français",
    flag: "🇫🇷",
  },
];
