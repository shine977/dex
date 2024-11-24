"use client";

import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Image from "next/image";
import { languages } from "@/config/languages";
import { useLocale } from "next-intl";

export default function LanguageSelector() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const t = useTranslations("common");

  const handleLanguageChange = (locale: string) => {
    const newPath = pathname.replace(`/${currentLocale}`, `/${locale}`);
    window.location.href = newPath;
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="p-1.5 hover:bg-gray-700/30 rounded-lg flex items-center space-x-1">
          <Image
            src="/icons/language.svg"
            alt={t("language")}
            width={18}
            height={18}
          />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[200px] bg-gray-800 rounded-lg p-1 shadow-lg dropdown-content"
          sideOffset={5}
          align="end"
        >
          {languages.map((language) => (
            <DropdownMenu.Item
              key={language.id}
              className="text-gray-300 text-sm rounded-md px-2 py-2 cursor-pointer outline-none data-[highlighted]:bg-gray-700 data-[highlighted]:text-white flex items-center space-x-2"
              onSelect={() => handleLanguageChange(language.id)}
            >
              <span className="text-base">{language.flag}</span>
              <span>{language.localName}</span>
              {language.region && (
                <span className="text-xs text-gray-400">
                  ({language.region})
                </span>
              )}
              {language.id === currentLocale && (
                <span className="ml-auto text-blue-400">✓</span>
              )}
            </DropdownMenu.Item>
          ))}
          <DropdownMenu.Arrow className="fill-gray-800" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
