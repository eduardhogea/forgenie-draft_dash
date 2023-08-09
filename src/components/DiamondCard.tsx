'use client';
import React, { useEffect, useState } from 'react';
import Image, { ImageLoaderProps } from 'next/image';
import Link from 'next/link';
import { Address } from 'wagmi';
import { FoundryAdapter } from '@/adapter/Adapters';

interface DiamondCardProps {
  tokenId: number;
}

const imageLoader = ({ src, width, quality }: ImageLoaderProps) => {
  return `https://bafybeifihtwqxo7lomqihdnpls7hjof4evjfqduboynsrdhk3l5aotfcqq.ipfs.dweb.link${src}?w=${width}&q=${
    quality || 75
  }`;
};

const DiamondCard: React.FC<DiamondCardProps> = ({ tokenId }) => {
  const [address, setAddress] = useState<Address | undefined>(undefined);

  useEffect(() => {
    const fetchDiamondAddresses = async () => {
      const diamondAddress = await FoundryAdapter.diamondAddress(tokenId);
      setAddress(diamondAddress);
    };

    fetchDiamondAddresses().catch(console.error);
  });

  return (
    <Link
      href={`/diamonds/${address}`}
      className="block w-full bg-gray-800 rounded-md transition transform hover:scale-105"
    >
      <Image
        className="self-center"
        loader={imageLoader}
        src={'/' + tokenId + '.svg'}
        alt="Logo"
        width={400}
        height={400}
      />
      <div className="p-5">
        <p className="text-xl font-bold">{tokenId.toString()}</p>
        <div className="grid-cols-2 gap-x-2">
          {address ? (
            <p
              className={`text-sm text-gray-400 ${
                address.length > 10 ? 'truncate' : ''
              }`}
            >
              {address}
            </p>
          ) : (
            <p className="text-sm text-gray-400">Loading...</p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default DiamondCard;
