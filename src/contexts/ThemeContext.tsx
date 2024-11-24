"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type ThemeMode = "system" | "light" | "dark" | string;

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  resolvedTheme: string; // 实际应用的主题
  themes: ThemeOption[];
}

interface ThemeOption {
  id: ThemeMode;
  name: string;
  icon: string;
}

const defaultThemes: ThemeOption[] = [
  {
    id: "system",
    name: "Auto",
    icon: "/icons/theme.svg",
  },
  {
    id: "light",
    name: "Light",
    icon: "/icons/theme.svg",
  },
  {
    id: "dark",
    name: "Dark",
    icon: "/icons/theme.svg",
  },
];

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>("system");
  const [resolvedTheme, setResolvedTheme] = useState<string>("dark");
  const [themes, setThemes] = useState<ThemeOption[]>(defaultThemes);

  // 设置主题
  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    localStorage.setItem("theme", newTheme);
    updateResolvedTheme(newTheme);
  };

  // 更新实际应用的主题
  const updateResolvedTheme = (currentTheme: ThemeMode) => {
    if (currentTheme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      setResolvedTheme(systemTheme);
      document.documentElement.setAttribute("data-theme", systemTheme);
    } else {
      setResolvedTheme(currentTheme);
      document.documentElement.setAttribute("data-theme", currentTheme);
    }
  };

  // 监听系统主题变化
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (theme === "system") {
        updateResolvedTheme("system");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  // 初始化主题
  useEffect(() => {
    const savedTheme = (localStorage.getItem("theme") as ThemeMode) || "system";
    setThemeState(savedTheme);
    updateResolvedTheme(savedTheme);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
