import { Address, Abi } from 'viem';
import { publicClient } from '../utils/client';

export class DiamondFoundryAdapter {
  constructor(public readonly address: Address, public readonly abi: Abi) {}

  public async totalSupply(): Promise<number> {
    const data = await publicClient({}).readContract({
      address: this.address,
      abi: this.abi,
      functionName: 'totalSupply',
    });
    return Number(data);
  }

  public async diamondId(address: Address): Promise<number> {
    const data = await publicClient({}).readContract({
      address: this.address,
      abi: this.abi,
      functionName: 'diamondId',
      args: [address],
    });
    return data as number;
  }

  public async diamondAddress(diamondId: number): Promise<Address> {
    const data = await publicClient({}).readContract({
      address: this.address,
      abi: this.abi,
      functionName: 'diamondAddress',
      args: [diamondId],
    });
    return data as Address;
  }

  public async diamondAddresses(): Promise<Address[]> {
    const totalSupply = await this.totalSupply();
    const addresses: Address[] = [];
    for (let i = 1; i < totalSupply; i++) {
      const address = await this.diamondAddress(i);
      addresses.push(address);
    }
    return addresses;
  }
}
