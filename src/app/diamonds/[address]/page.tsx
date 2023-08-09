'use client';
import DiamondCard from '@/components/DiamondCard';
import React, { useEffect } from 'react';
import { Address } from 'viem';
import { FacetAdapters, FoundryAdapter } from '@/adapter/Adapters';
import { DiamondAdapter } from '@/adapter/DiamondAdapter';
import FacetCard from '@/components/FacetCard';
import { FacetAdapter } from '@/adapter/FacetAdapter';

interface DiamondDetailProps {
  address: Address;
}

const DiamondDetail = ({ params }: { params: DiamondDetailProps }) => {
  const diamondAdapter = new DiamondAdapter(params.address);
  const [tokenId, setTokenId] = React.useState<number | null>(null);
  const [facets, setFacets] = React.useState<FacetAdapter[]>([]);

  useEffect(() => {
    const fetchTokenId = async () => {
      const tokenId = await FoundryAdapter.diamondId(params.address);
      setTokenId(tokenId);
    };

    fetchTokenId().catch(console.error);
  }, []);

  useEffect(() => {
    const fetchFacets = async () => {
      const facets = await diamondAdapter.facets();
      setFacets(facets);
    };

    fetchFacets().catch(console.error);
  }, []);

  // Mock data for Transactions, Events, and Total Facets (replace with actual data)
  const transactionsCount = 10;
  const eventsCount = 5;
  const totalFacets = 30;

  return (
    <div className="p-4">
      <div className="text-2xl font-semibold mb-2">
        Diamond
        <span className="text-sm text-gray-400"> ({params.address})</span>
      </div>
      <div className="grid grid-cols-2 gap-10">
        {!tokenId ? (
          <div>Loading...</div>
        ) : (
          <div>
            <DiamondCard tokenId={tokenId} address={params.address} />
          </div>
        )}
        <div className="w-1/2">
          {/* Transaction Card */}
          <div className="bg-gray-600 p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Transactions</h2>
            <p>{transactionsCount} transactions</p>
          </div>

          {/* Events Card */}
          <div className="bg-gray-600 mt-4 p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Events</h2>
            <p>{eventsCount} events</p>
          </div>

          {/* Total Facets Card */}
          <div className="bg-gray-600 mt-4 p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Total Facets</h2>
            <p>{totalFacets} facets</p>
          </div>
        </div>
      </div>
      {/* Facets */}
      <div>
        <h2 className="text-2xl font-semibold mt-10 mb-2">Facets</h2>
        <div className="grid lg:grid-cols-3 gap-6">
          {facets.map((facet) => (
            <FacetCard
              key={facet.name}
              name={facet.name}
              address={facet.address}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiamondDetail;
