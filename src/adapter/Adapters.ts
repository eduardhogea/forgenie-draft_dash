import { Address } from 'viem';
import { Abi } from 'abitype';
import DiamondFoundry from '../artifacts/DiamondFoundry.json';
import DiamondCutFacet from '../artifacts/DiamondCutFacet.json';
import DiamondLoupeFacet from '../artifacts/DiamondLoupeFacet.json';
import OwnableFacet from '../artifacts/OwnableFacet.json';
import AccessControlFacet from '../artifacts/AccessControlFacet.json';
import Ownable2StepFacet from '../artifacts/Ownable2StepFacet.json';
import NFTOwnedFacet from '../artifacts/NFTOwnedFacet.json';
import ERC20Facet from '../artifacts/ERC20Facet.json';
import ERC20MintableFacet from '../artifacts/ERC20MintableFacet.json';
import ERC20BurnableFacet from '../artifacts/ERC20BurnableFacet.json';
import { FacetAdapter } from './FacetAdapter';
import { DiamondFoundryAdapter } from './DiamondFoundryAdapter';

export const DIAMOND_FOUNDRY_ADDRESS = process.env
  .NEXT_PUBLIC_DIAMOND_FOUNDRY as Address;

export const FoundryAdapter = new DiamondFoundryAdapter(
  DIAMOND_FOUNDRY_ADDRESS,
  DiamondFoundry.abi as Abi
);
export const DiamondLoupeAdapter = new FacetAdapter(
  'DiamondLoupe',
  process.env.NEXT_PUBLIC_DIAMOND_LOUPE_FACET! as Address,
  DiamondLoupeFacet.abi as Abi
);
export const DiamondCutAdatper = new FacetAdapter(
  'DiamondCut',
  process.env.NEXT_PUBLIC_DIAMOND_CUT_FACET! as Address,
  DiamondCutFacet.abi as Abi
);
export const OwnableAdapter = new FacetAdapter(
  'Ownable',
  process.env.NEXT_PUBLIC_OWNABLE_FACET! as Address,
  OwnableFacet.abi as Abi
);
export const AccessControlAdapter = new FacetAdapter(
  'AccessControl',
  process.env.NEXT_PUBLIC_ACCESS_CONTROL_FACET! as Address,
  AccessControlFacet.abi as Abi
);
export const Ownable2StepAdapter = new FacetAdapter(
  'Ownable2Step',
  process.env.NEXT_PUBLIC_OWNABLE2STEP_FACET! as Address,
  Ownable2StepFacet.abi as Abi
);
export const NFTOwnedAdapter = new FacetAdapter(
  'NFTOwned',
  process.env.NEXT_PUBLIC_NFT_OWNED_FACET! as Address,
  NFTOwnedFacet.abi as Abi
);
export const ERC20Adapter = new FacetAdapter(
  'ERC20',
  process.env.NEXT_PUBLIC_ERC20_FACET! as Address,
  ERC20Facet.abi as Abi
);
export const ERC20MintableAdapter = new FacetAdapter(
  'ERC20Mintable',
  process.env.NEXT_PUBLIC_ERC20_MINTABLE_FACET! as Address,
  ERC20MintableFacet.abi as Abi
);
export const ERC20BurnableAdapter = new FacetAdapter(
  'ERC20Burnable',
  process.env.NEXT_PUBLIC_ERC20_BURNABLE_FACET! as Address,
  ERC20BurnableFacet.abi as Abi
);
export const FacetAdapters: FacetAdapter[] = [
  DiamondLoupeAdapter,
  DiamondCutAdatper,
  OwnableAdapter,
  AccessControlAdapter,
  Ownable2StepAdapter,
  NFTOwnedAdapter,
  ERC20Adapter,
  ERC20MintableAdapter,
  ERC20BurnableAdapter,
];
