import { AbiFunction } from 'abitype';
import { DiamondMultiInit, MultiInitAbi } from './types';
import { encodeAbiParameters } from 'viem';

export const parseFunctionSignature = (abiItem: AbiFunction) => {
  const { name, inputs } = abiItem;
  const inputTypes = inputs.map((input) => input.type);
  return `${name}(${inputTypes.join(',')})`;
};

export const encodeInitData = (multiInit: DiamondMultiInit[]) => {
  return encodeAbiParameters(MultiInitAbi, [multiInit]);
};
