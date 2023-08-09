import React from 'react';
import FunctionBox from '@/components/FunctionBox';
import { FacetAdapters } from '@/adapter/Adapters';
import { Address } from 'viem';

interface FacetDetailProps {
  address: Address;
}

const FacetDetail = ({ params }: { params: FacetDetailProps }) => {
  const facet = FacetAdapters.find((item) => item.address === params.address);

  if (!facet) {
    throw new Error('Facet not found');
  }

  const initializer = facet.initializer();
  return (
    <div className="p-4">
      <div className="text-2xl font-semibold mb-2">
        {facet.name}
        <span className="text-sm text-gray-400"> ({params.address})</span>
      </div>
      {initializer && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Initializer</h2>
          <FunctionBox functions={[facet.initializer()]} />
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold ">View Methods</h2>
          <FunctionBox
            functions={facet.viewFunctions()}
            userdoc={facet.userdoc}
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold">Write Methods</h2>
          <FunctionBox
            functions={facet.writeFunctions()}
            userdoc={facet.userdoc}
          />
        </div>
      </div>
    </div>
  );
};

export default FacetDetail;
