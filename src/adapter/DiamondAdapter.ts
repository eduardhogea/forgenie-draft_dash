import { Address } from 'abitype';
import IDiamondLoupe from '@/artifacts/IDiamondLoupe.json';
import { publicClient } from '@/utils/client';
import { FacetAdapter } from './FacetAdapter';
import { FacetAdapters, FoundryAdapter } from './Adapters';

export class DiamondAdapter {
  private id?: number;
  constructor(public readonly address: Address) {}

  public async facetAddresses(): Promise<Address[]> {
    const data = await publicClient({}).readContract({
      address: this.address,
      abi: IDiamondLoupe.abi,
      functionName: 'facetAddresses',
    });
    return data as Address[];
  }

  public async facets(): Promise<FacetAdapter[]> {
    const addresses = await this.facetAddresses();
    return FacetAdapters.filter((adapter) =>
      addresses.includes(adapter.address)
    );
  }

  public async tokenId(): Promise<number> {
    if (!this.id) {
      this.id = await FoundryAdapter.diamondId(this.address);
    }
    return this.id;
  }
}
