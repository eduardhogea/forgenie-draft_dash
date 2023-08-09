'use client';
import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { WagmiConfig } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { ReactNode } from 'react';
import { chains, wagmiConfig } from '@/utils/client';

type Props = {
  children: ReactNode;
};

export default function WalletConfig({ children }: Props) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        modalSize="compact"
        initialChain={sepolia}
        chains={chains}
        theme={darkTheme()}
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
