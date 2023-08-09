'use client';
import React from 'react';
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import DiamondFoundry from '@/artifacts/DiamondFoundry.json';
import { Abi } from 'viem';
import { FacetCutAction, FacetInit, MULTI_INIT_ADDRESS } from '@/utils/types';
import { encodeInitData } from '@/utils/function';
import { DIAMOND_FOUNDRY_ADDRESS } from '@/adapter/Adapters';

// Update MintButton to accept FacetInit props
interface MintButtonProps {
  facetInits: FacetInit[];
}

const MintButton: React.FC<MintButtonProps> = ({ facetInits }) => {
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: DIAMOND_FOUNDRY_ADDRESS,
    abi: DiamondFoundry.abi as Abi,
    args: [
      {
        baseFacets: facetInits.map((facetInit) =>
          facetInit.facet.makeFacetCut(FacetCutAction.Add)
        ),
        init: MULTI_INIT_ADDRESS,
        initData: encodeInitData(
          facetInits.map((facetInit) =>
            facetInit.facet.makeInitData(facetInit.initParams)
          )
        ),
      },
    ],
    functionName: 'mintDiamond',
    value: 0n,
  });
  const { data, error, isError, write } = useContractWrite(config);
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    <div className="text-center">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        disabled={!write || isLoading}
        onClick={() => write?.()}
      >
        {isLoading ? 'Minting...' : 'Mint'}
      </button>
      {isSuccess && (
        <div>
          Successfully minted your NFT!
          <div>
            <a
              href={`https://sepolia.etherscan.io/tx/${data?.hash}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Etherscan
            </a>
          </div>
        </div>
      )}
      {isPrepareError || isError ? (
        <div>Error: {(prepareError || error)?.message}</div>
      ) : null}
    </div>
  );
};

export default MintButton;
