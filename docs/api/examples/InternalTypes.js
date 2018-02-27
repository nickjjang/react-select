// @flow
import React from 'react';
import { TypeDefinition } from '../../PrettyProp';

export default () => (
  <TypeDefinition
    children={`
type OptionType = { [string]: any }
type OptionsType = Array<OptionType>

type GroupType = {
  [string]: any, // group label
  options: OptionsType,
}

type ValueType = OptionType | OptionsType | null | void

type CommonProps = {
clearValue: () => void,
getStyles: (string, any) => {},
getValue: () => ValueType,
hasValue: boolean,
isMulti: boolean,
options: OptionsType,
selectOption: OptionType => void,
selectProps: any,
setValue: (ValueType, ActionTypes) => void,
}

// passed as the second argument to \`onChange\`
type ActionTypes =
| 'clear'
| 'create-option'
| 'deselect-option'
| 'pop-value'
| 'remove-value'
| 'select-option'
| 'set-value'
`}
  />
);
