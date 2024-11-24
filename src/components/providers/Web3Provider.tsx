"use client";

import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, createConfig, http } from "wagmi";
import { mainnet } from "wagmi/chains";
import { walletConnect } from "wagmi/connectors";

// 创建 wagmi 配置
const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "";

const metadata = {
  name: "DEX Platform",
  description: "DEX Platform Example",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const chains = [mainnet] as const;
const config = createConfig({
  chains: chains,
  transports: {
    [mainnet.id]: http(),
  },
  connectors: [walletConnect({ projectId, metadata, showQrModal: false })],
});

// 创建 query client
const queryClient = new QueryClient();

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // 在这里初始化 web3modal
    const { createWeb3Modal } = require("@web3modal/wagmi/react");
    createWeb3Modal({
      wagmiConfig: config,
      projectId,
      chains,
      themeMode: "dark",
    });
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
