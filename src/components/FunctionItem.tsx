import React from 'react';
import { AbiFunction } from 'abitype';
import { getFunctionSelector } from 'viem';

interface FunctionItemProps {
  item: AbiFunction;
}

const FunctionItem: React.FC<FunctionItemProps> = ({ item }) => {
  const functionSelector = React.useMemo(
    () => getFunctionSelector(item),
    [item]
  );

  return (
    <div className="bg-gray-800 rounded-md p-4 mb-4 flex-grow">
      <p className="text-lg font-semibold mb-2 text-indigo-300">
        {item.name}{' '}
        <span className="text-sm font-mono text-yellow-300">
          {functionSelector}
        </span>
      </p>
      <div>
        {item.inputs.map((input) => (
          <p key={input.name} className="text-sm">
            <span className="font-bold text-pink-300">{input.type}</span>{' '}
            <span className="font-bold text-green-300">{input.name}</span>
          </p>
        ))}
      </div>
    </div>
  );
};

export default FunctionItem;
