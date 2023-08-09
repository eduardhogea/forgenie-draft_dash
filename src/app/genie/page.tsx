'use client';
import React, { useState } from 'react';
import MintButton from '@/components/MintButton';
import { FacetAdapter } from '@/adapter/FacetAdapter';
import { FormControlLabel, Checkbox, Typography } from '@material-ui/core';
import { FacetAdapters } from '@/adapter/Adapters';

const GeniePage = () => {
  const [selectedFacets, setSelectedFacets] = useState<FacetAdapter[]>([]);

  const handleFacetSelection = (facet: FacetAdapter) => {
    setSelectedFacets((prevSelectedFacets) =>
      prevSelectedFacets.includes(facet)
        ? prevSelectedFacets.filter((f) => f !== facet)
        : [...prevSelectedFacets, facet]
    );
  };

  // Create an array of FacetInit based on selectedFacets
  const facetInits = selectedFacets.map((facet) => ({
    facet,
    initParams: [], // Add your initParams here if needed
  }));

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-start space-y-4 bg-gray-500">
        <Typography variant="h6" gutterBottom>
          Select Facets:
        </Typography>
        {FacetAdapters.map((facet) => (
          <FormControlLabel
            key={facet.name}
            control={
              <Checkbox
                checked={selectedFacets.includes(facet)}
                onChange={() => handleFacetSelection(facet)}
              />
            }
            label={facet.name}
          />
        ))}
        {/* Pass facetInits and any other required props to MintButton */}
        <MintButton facetInits={facetInits} />
      </div>
    </div>
  );
};

export default GeniePage;
