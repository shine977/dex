"use client";

import { useAccount, useDisconnect } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export default function WalletConnect() {
  const { address, isConnected } = useAccount();
  const { open } = useWeb3Modal();
  const { disconnect } = useDisconnect();

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

  if (!isConnected) {
    return (
      <button
        onClick={handleWalletClick}
        className="px-3 py-1 rounded-lg text-sm transition-colors bg-blue-500 hover:bg-blue-600"
      >
        连接钱包
      </button>
    );
  }

  return (
    <DropdownMenu.Root>
      {/* ... 钱包连接后的下拉菜单代码 ... */}
    </DropdownMenu.Root>
  );
}
