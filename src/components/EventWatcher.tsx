'use client';
import { Address, Abi } from 'viem';
import { useChainId } from 'wagmi';
import DiamondFoundry from '@/artifacts/DiamondFoundry.json';
import { publicClient } from '@/utils/client';

export const EventWatcher = () => {
  const unwatch = publicClient({ chainId: useChainId() }).watchContractEvent({
    address: process.env.NEXT_PUBLIC_DIAMOND_FOUNDRY! as Address,
    abi: DiamondFoundry.abi as Abi,
    eventName: 'DiamondMinted',
    // todo: add to database
    onLogs: (logs) => console.log(logs),
  });

  return <div>Event Watcher</div>;
};
