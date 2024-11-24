"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
// 直接导入 SVG 文件
import SearchIcon from "@/icons/search.svg";
import MarketIcon from "@/icons/market.svg";
import FavoriteIcon from "@/icons/favorite.svg";

export default function SideNav() {
  const t = useTranslations("nav");
  const [activeTab, setActiveTab] = useState("search");

  const navItems = [
    {
      id: "search",
      Icon: SearchIcon,
      label: t("search"),
    },
    {
      id: "market",
      Icon: MarketIcon,
      label: t("market"),
    },
    {
      id: "favorite",
      Icon: FavoriteIcon,
      label: t("favorite"),
    },
  ];

  return (
    <div className="w-16 bg-header-background border-r border-divider shadow-sm">
      <div className="flex flex-col items-center py-4 space-y-4">
        {navItems.map((item) => {
          const IconComponent = item.Icon;
          return (
            <button
              key={item.id}
              className={`p-2.5 rounded-lg transition-all duration-200 ease-in-out group
                ${
                  activeTab === item.id
                    ? "bg-button-active text-primary"
                    : "text-text-secondary hover:bg-button-hover hover:text-text"
                }
                focus:outline-none focus:ring-2 focus:ring-primary/20`}
              onClick={() => setActiveTab(item.id)}
              title={item.label}
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <IconComponent
                  className={`w-5 h-5 transition-all duration-200 group-hover:scale-105
                    ${activeTab === item.id ? "stroke-[1.75]" : "stroke-1"}
                  `}
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
