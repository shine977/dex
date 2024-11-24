import { useEffect } from "react";
import { languages } from "@/config/languages";

export function usePreloadTranslations() {
  useEffect(() => {
    languages.forEach((lang) => {
      const link = document.createElement("link");
      link.rel = "prefetch";
      link.href = `/locales/${lang.id}.json`;
      document.head.appendChild(link);
    });
  }, []);
}
