"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useAccount, useDisconnect } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import LanguageSelector from "./LanguageSelector";
import { useTranslations } from "next-intl";
import ThemeSwitch from "./ThemeSwitch";

interface Chain {
  id: string;
  name: string;
  icon: string;
  price: string;
  change: string;
}

export default function TopNav() {
  const [mounted, setMounted] = useState(false);
  const [selectedChain, setSelectedChain] = useState("all");
  const { address, isConnected } = useAccount();
  const { open } = useWeb3Modal();
  const { disconnect } = useDisconnect();
  const t = useTranslations("nav");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const chains: Chain[] = [
    {
      id: "all",
      name: t("all_chains"),
      icon: "/icons/all-chains.svg",
      price: "",
      change: "",
    },
    {
      id: "solana",
      name: "Solana",
      icon: "/icons/solana.svg",
      price: "$91.85",
      change: "+0.11%",
    },
    {
      id: "bsc",
      name: "BSC",
      icon: "/icons/bsc.svg",
      price: "$434/444k",
      change: "+1.2%",
    },
    {
      id: "base",
      name: "Base",
      icon: "/icons/base.svg",
      price: "$2480/2851",
      change: "-0.5%",
    },
    {
      id: "ethereum",
      name: "Ethereum",
      icon: "/icons/ethereum.svg",
      price: "1887/3029",
      change: "+0.8%",
    },
  ];

  const handleWalletClick = async () => {
    if (isConnected) {
      disconnect();
    } else {
      open();
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getAvatarColor = (address: string) => {
    const hash = address.slice(2, 10);
    const color = parseInt(hash, 16);
    return `hsl(${color % 360}, 100%, 50%)`;
  };

  return (
    <div className="bg-header-background px-4 h-12 flex items-center justify-between border-b border-divider">
      {/* 左侧区块链列表 */}
      <div className="flex items-center space-x-4 overflow-x-auto">
        {chains.map((chain) => (
          <button
            key={chain.id}
            onClick={() => setSelectedChain(chain.id)}
            className={`flex items-center space-x-2 px-2.5 py-1 rounded-lg text-sm whitespace-nowrap
              ${
                selectedChain === chain.id
                  ? "bg-button-active text-text"
                  : "text-text-secondary hover:bg-button-hover"
              }`}
          >
            <div className="flex items-center space-x-1.5">
              <Image
                src={chain.icon}
                alt={chain.name}
                width={16}
                height={16}
                className={`rounded-full transition-transform duration-200 invert dark:invert-0 ${
                  selectedChain === chain.id ? "opacity-100" : "opacity-60"
                }`}
              />
              <span>{chain.name}</span>
            </div>
            {chain.price && (
              <div className="flex flex-col items-start ml-1.5">
                <span className="text-xs text-text-secondary">
                  {chain.price}
                </span>
                <span
                  className={`text-xs ${
                    chain.change.startsWith("+")
                      ? "text-positive"
                      : "text-negative"
                  }`}
                >
                  {chain.change}
                </span>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* 右侧功能区 */}
      <div className="flex items-center space-x-3">
        {!isConnected ? (
          <button
            onClick={handleWalletClick}
            className="px-3 py-1 rounded-lg text-sm text-white transition-colors bg-primary hover:bg-primary-hover"
          >
            连接钱包
          </button>
        ) : (
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className="flex items-center space-x-2 px-3 py-1 rounded-lg text-sm bg-button-active hover:bg-button-hover transition-colors outline-none">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center text-xs text-white"
                  style={{ backgroundColor: getAvatarColor(address!) }}
                >
                  {address?.slice(2, 4)}
                </div>
                <span className="text-text">{formatAddress(address!)}</span>
                <ChevronDownIcon className="h-4 w-4 text-text-secondary" />
              </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className="min-w-[220px] bg-card-background rounded-lg p-1 shadow-lg dropdown-content border border-border"
                sideOffset={5}
                align="end"
              >
                <DropdownMenu.Item
                  className="text-text text-sm rounded-md px-2 py-2 cursor-pointer outline-none data-[highlighted]:bg-button-hover"
                  onSelect={() => {
                    navigator.clipboard.writeText(address!);
                  }}
                >
                  复制地址
                </DropdownMenu.Item>

                <DropdownMenu.Separator className="h-[1px] bg-divider m-1" />

                <DropdownMenu.Item
                  className="text-error text-sm rounded-md px-2 py-2 cursor-pointer outline-none data-[highlighted]:bg-button-hover"
                  onSelect={() => disconnect()}
                >
                  断开连接
                </DropdownMenu.Item>

                <DropdownMenu.Arrow className="fill-card-background stroke-border" />
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        )}

        <LanguageSelector />
        <ThemeSwitch />
      </div>
    </div>
  );
}
