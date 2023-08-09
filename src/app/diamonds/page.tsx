'use client';
import React, { useEffect, useState } from 'react';
import DiamondCard from '@/components/DiamondCard';
import { FoundryAdapter } from '@/adapter/Adapters';

export const DiamondsPage = () => {
  const [totalSupply, setTotalSupply] = useState<number>(0);

  useEffect(() => {
    const fetchTotalSupply = async () => {
      const totalSupply = await FoundryAdapter.totalSupply();
      setTotalSupply(totalSupply);
    };

    fetchTotalSupply().catch(console.error);
  }, [totalSupply]);

  return (
    <div className="grid lg:grid-cols-5 gap-6 md:grid-cols-4 sm:grid-cols-3">
      {Array.from({ length: totalSupply }).map((_, index) => (
        <DiamondCard key={index} tokenId={index + 1} />
      ))}
    </div>
  );
};

export default DiamondsPage;
