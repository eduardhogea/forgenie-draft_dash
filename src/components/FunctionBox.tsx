import React from 'react';
import { Abi, getFunctionSelector } from 'viem';
import { AbiFunction } from 'abitype';
import { parseFunctionSignature } from '@/utils/function';
import { UserDoc } from '@/utils/types';

interface FunctionBoxProps {
  functions: AbiFunction[];
  userdoc?: UserDoc;
}

const FunctionBox: React.FC<FunctionBoxProps> = ({ functions, userdoc }) => {
  const totalFunctions = functions.length;
  const minHeight = totalFunctions <= 3 ? `${totalFunctions * 100}px` : '300px';

  return (
    <div
      className="mt-8 h-auto w-full overflow-y-auto flex flex-col"
      style={{ minHeight }}
    >
      {functions.map((item) => {
        const functionSignature = parseFunctionSignature(item);
        const functionSelector = getFunctionSelector(item);
        const functionDoc = userdoc?.methods[functionSignature]?.notice;

        return (
          <div
            key={functionSelector}
            className="bg-gray-800 rounded-md p-4 mb-4 flex-grow grid grid-cols-2 gap-4"
          >
            {/* Function name and selector */}
            <div>
              <p className="text-lg font-semibold mb-2 text-indigo-300">
                {item.name}{' '}
                <span className="text-sm font-mono text-yellow-300">
                  {functionSelector}
                </span>
              </p>
              {/* Function Parameters */}
              <div>
                {item.inputs.map((input) => (
                  <p key={input.name} className="text-sm">
                    <span className="font-bold text-pink-300">
                      {input.type}
                    </span>{' '}
                    <span className="font-bold text-green-300">
                      {input.name}
                    </span>
                  </p>
                ))}
              </div>
              {/* Function docs if there are any */}
            </div>
            {functionDoc && (
              <div className="col-span-1">
                <p className="text-sm text-gray-400">{functionDoc}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FunctionBox;
