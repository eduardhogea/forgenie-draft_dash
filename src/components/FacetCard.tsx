import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface FacetCardProps {
  name: string;
  address: string;
}

const FacetCard: React.FC<FacetCardProps> = ({ name, address }) => {
  return (
    <Link
      href={`/facets/${address}`}
      className="block w-full bg-gray-800 rounded-md transition transform hover:scale-105"
    >
      <Image
        className="self-center"
        src="/facet.svg"
        alt="Facet"
        width={512}
        height={512}
      />
      <div className="p-5">
        <p className="text-xl font-bold">{name}</p>
        <div className="grid-cols-2 gap-x-2">
          <p
            className={`text-sm text-gray-400 ${
              address.length > 10 ? 'truncate' : ''
            }`}
          >
            {address}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default FacetCard;
