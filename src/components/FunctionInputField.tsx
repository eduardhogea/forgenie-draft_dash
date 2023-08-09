'use client';
import { encodeAbiParameters } from 'viem';
import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import { AbiFunction } from 'abitype';

interface FunctionInputFieldProps {
  abiFunction: AbiFunction;
}

const FunctionInputField: React.FC<FunctionInputFieldProps> = ({
  abiFunction,
}) => {
  const [inputValues, setInputValues] = useState<Record<string, string>>({});
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const handleInputChange = (inputName: string, value: string) => {
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [inputName]: value,
    }));

    // Clear the validation error for the input when the user starts typing again
    setValidationErrors((prevValidationErrors) => ({
      ...prevValidationErrors,
      [inputName]: '',
    }));
  };

  const handleInputBlur = (inputName: string) => {
    // Perform validation against ABI types using encodeAbiParameters
    try {
      const inputIndex = abiFunction.inputs.findIndex(
        (input) => input.name === inputName
      );
      encodeAbiParameters(
        [abiFunction.inputs[inputIndex]],
        [inputValues[inputName]]
      );
    } catch (error) {
      setValidationErrors((prevValidationErrors) => ({
        ...prevValidationErrors,
        [inputName]: `Invalid input value: ${error}}`,
      }));
    }
  };

  return (
    <div className="bg-gray-500">
      <div>{abiFunction.name}</div>
      {abiFunction.inputs.map((input) => (
        <div key={input.name}>
          <TextField
            label={`${input.type} ${input.name}`}
            value={inputValues[input.name!] || ''}
            onChange={(e) => handleInputChange(input.name!, e.target.value)}
            onBlur={() => handleInputBlur(input.name!)}
            error={Boolean(validationErrors[input.name!])}
            helperText={validationErrors[input.name!]}
          />
        </div>
      ))}
    </div>
  );
};

export default FunctionInputField;
