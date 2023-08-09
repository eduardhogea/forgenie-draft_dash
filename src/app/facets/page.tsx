import { FacetAdapters } from '@/adapter/Adapters';
import FacetCard from '@/components/FacetCard';
import React from 'react';

export const FacetsPage = () => {
  return (
    <div className="flex-grow">
      <div className="grid lg:grid-cols-5 gap-6 md:grid-cols-4 sm:grid-cols-3">
        {FacetAdapters.map((facet) => (
          <FacetCard
            key={facet.name}
            name={facet.name}
            address={facet.address}
          />
        ))}
      </div>
    </div>
  );
};

export default FacetsPage;
