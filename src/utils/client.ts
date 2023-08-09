'use client';
import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { sepolia } from 'viem/chains';
import { configureChains, createConfig } from 'wagmi';
import { infuraProvider } from '@wagmi/core/providers/infura';

const { chains, publicClient } = configureChains(
  [sepolia],
  [infuraProvider({ apiKey: 'c2ff8a92611a49c0835d6fbc3e2e87bc' })]
);
const { connectors } = getDefaultWallets({
  appName: 'Forgenie Studio',
  projectId: '52b80331929f350be81093286ff596fa',
  chains,
});
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export { wagmiConfig, chains, publicClient };
