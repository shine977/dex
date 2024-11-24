"use client";

import { useTheme } from "@/contexts/ThemeContext";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function ThemeSwitch() {
  const { theme, setTheme, themes } = useTheme();
  const t = useTranslations("common.theme");

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="p-1.5 hover:bg-button-hover rounded-lg transition-colors duration-200">
          <Image
            src={
              themes.find((t) => t.id === theme)?.icon ||
              "/icons/theme-auto.svg"
            }
            alt={t("system")}
            width={18}
            height={18}
            className="invert dark:invert-0 transition-transform duration-200 group-hover:scale-105"
          />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[180px] bg-card-background rounded-lg p-1.5 shadow-lg dropdown-content border border-divider"
          sideOffset={5}
          align="end"
        >
          {themes.map((themeOption) => (
            <DropdownMenu.Item
              key={themeOption.id}
              className="text-text text-sm rounded-md px-2.5 py-2 cursor-pointer outline-none data-[highlighted]:bg-button-hover flex items-center space-x-2.5 transition-colors duration-200"
              onSelect={() => setTheme(themeOption.id)}
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <Image
                  src={themeOption.icon}
                  alt={themeOption.name}
                  width={16}
                  height={16}
                  className={`invert dark:invert-0 ${
                    theme === themeOption.id ? "opacity-100" : "opacity-60"
                  }`}
                />
              </div>
              <span>{t(`${themeOption.id}`)}</span>
              {theme === themeOption.id && (
                <span className="ml-auto text-primary">✓</span>
              )}
            </DropdownMenu.Item>
          ))}
          <DropdownMenu.Arrow className="fill-card-background stroke-divider" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
