import {
  Abi,
  Address,
  getFunctionSelector,
  getAbiItem,
  encodeFunctionData,
  Hex,
} from 'viem';
import {
  DiamondMultiInit,
  FacetCut,
  FacetCutAction,
  UserDoc,
} from '../utils/types';
import { AbiFunction } from 'abitype';
import { parseFunctionSignature } from '../utils/function';

export class FacetAdapter {
  constructor(
    public readonly name: string,
    public readonly address: Address,
    public readonly abi: Abi,
    public readonly userdoc?: UserDoc
  ) {}

  public initializer(): AbiFunction {
    return getAbiItem({
      abi: this.abi,
      name: this.name + '_init',
    }) as AbiFunction;
  }

  public functions(): AbiFunction[] {
    return this.abi.filter(
      (item) => item.type === 'function' && this.initializer().name
    ) as AbiFunction[];
  }

  public viewFunctions(): AbiFunction[] {
    return this.functions().filter((func) => func.stateMutability === 'view');
  }

  public writeFunctions(): AbiFunction[] {
    return this.functions().filter(
      (func) =>
        func.stateMutability === 'nonpayable' ||
        func.stateMutability === 'payable'
    );
  }

  public functionSelectors(): Hex[] {
    return this.functions().map((func) => getFunctionSelector(func));
  }

  public functionUserDoc(func: AbiFunction): string | undefined {
    return this.userdoc?.methods[parseFunctionSignature(func)]?.notice;
  }

  public getFunctionFromSelector(selector: Hex): AbiFunction | undefined {
    return this.functions().find(
      (func) => getFunctionSelector(func) === selector
    );
  }

  public makeFacetCut(action: FacetCutAction): FacetCut {
    return {
      facet: this.address,
      action: action,
      selectors: this.functions()
        .filter((func) => func.name !== this.name + '_init')
        .map((func) => getFunctionSelector(func)),
    };
  }

  public makeInitData(args: unknown[]): DiamondMultiInit {
    return {
      init: this.address,
      initData: encodeFunctionData({
        abi: [this.initializer()],
        args: args,
      }),
    };
  }
}
