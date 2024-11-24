import { http } from "wagmi";
import { mainnet, arbitrum, base } from "wagmi/chains";
import { createConfig } from "wagmi";
import { createWeb3Modal } from "@web3modal/wagmi/react";

// 确保在 .env.local 中设置了这个环境变量
const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "";

const metadata = {
  name: "Web3 DEX",
  description: "Web3 DEX Platform",
  url: "https://your-url.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

export const config = createConfig({
  chains: [mainnet, arbitrum, base],
  transports: {
    [mainnet.id]: http(),
    [arbitrum.id]: http(),
    [base.id]: http(),
  },
});

export const modal = createWeb3Modal({
  wagmiConfig: config,
  projectId,
  chains: [mainnet, arbitrum, base],
  themeMode: "dark",
  themeVariables: {
    "--w3m-font-family": "Roboto, sans-serif",
    "--w3m-accent-color": "#3b82f6", // blue-500
  },
});
