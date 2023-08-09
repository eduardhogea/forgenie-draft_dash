import { FacetAdapter } from '@/adapter/FacetAdapter';
import { Address, Hex } from 'viem';

export const MULTI_INIT_ADDRESS = '0xD1a302d1A302d1A302d1A302d1A302D1A302D1a3';

export type UserDoc = {
  kind: string;
  methods: Record<string, { notice: string }>;
};

export enum FacetCutAction {
  Add = 0,
  Replace = 1,
  Remove = 2,
}

export type FacetCut = {
  facet: Address;
  action: FacetCutAction;
  selectors: Hex[];
};

export type DiamondInitParams = {
  baseFacets: FacetCut[];
  init: Address;
  initData: Hex;
};

export type DiamondMultiInit = {
  init: Address;
  initData: Hex;
};

export type FacetInit = {
  facet: FacetAdapter;
  initParams: unknown[];
};

export const MultiInitAbi = [
  {
    components: [
      {
        name: 'init',
        type: 'address',
      },
      {
        name: 'initData',
        type: 'bytes',
      },
    ],
    name: 'MultiInit',
    type: 'tuple[]',
  },
];
