// @flow

import {
  type ActionMeta,
  type OptionType,
  type OptionsType,
  type ValueType,
} from '../types';

export type FocusedType = 'option' | 'value'; // | 'group-option';

export type GuidanceType = 'menu' | 'input' | 'value';

export type OptionContext = {
  // deriveed label of selected "thing" via getOptionLabel
  // Note: different aria attributes could potentially introduce need for DOM query selectors
  label?: string,
  // selected option was disabled, used only for accessibility purposes
  isDisabled?: boolean,
};

export type SelectionContext = ActionMeta &
  OptionContext & {
    // selected "thing" (option, removedValue, removedValues)
    selected?: ValueType | OptionType,
  };

export type FocusedContext = OptionContext & {
  type: FocusedType,
  options: OptionsType,
  value?: ValueType,
};

export type GuidanceContext = OptionContext & {
  isSearchable?: boolean,
  isMulti?: boolean,
  isDisabled?: boolean,
  tabSelectsValue?: boolean,
};

export type AriaSelectionType = SelectionContext & {
  // first parameter passed in onChange
  value?: ValueType,
};

export type AriaLiveMessagesProps = {
  onChange?: (value: ValueType, context: SelectionContext) => string,
  onFocus?: (focused: OptionType, context: FocusedContext) => string,
  onFilter?: (args: {
    inputValue: string,
    screenReaderMessage: string,
  }) => string,
  guidance?: (type: GuidanceType, context?: GuidanceContext) => string,
};

export function getAriaLiveMessages() {
  return {
    guidance: (type: GuidanceType, context?: GuidanceContext = {}) => {
      const {
        isSearchable,
        isMulti,
        label,
        isDisabled,
        tabSelectsValue,
      } = context;
      switch (type) {
        case 'menu':
          return `Use Up and Down to choose options${
            isDisabled
              ? ''
              : ', press Enter to select the currently focused option'
          }, press Escape to exit the menu${
            tabSelectsValue
              ? ', press Tab to select the option and exit the menu'
              : ''
          }.`;
        case 'input':
          return `${label || 'Select'} is focused ${
            isSearchable ? ',type to refine list' : ''
          }, press Down to open the menu, ${
            isMulti ? ' press left to focus selected values' : ''
          }`;
        case 'value':
          return 'Use left and right to toggle between focused values, press Backspace to remove the currently focused value';
        default:
          return '';
      }
    },

    onChange: (value: ValueType, context: SelectionContext) => {
      const { action, label, isDisabled } = context;
      if (!label) return '';
      switch (action) {
        case 'deselect-option':
        case 'pop-value':
        case 'remove-value':
          return `option ${label}, deselected.`;
        case 'select-option':
          return isDisabled
            ? `option ${label} is disabled. Select another option.`
            : `option ${label}, selected.`;
        default:
          return '';
      }
    },

    onFocus: (focused: OptionType, context: FocusedContext) => {
      const { type, value, options, label = '' } = context;

      if (type === 'value' && value) {
        return `value ${label} focused, ${value.indexOf(focused) + 1} of ${
          value.length
        }.`;
      }

      if (type === 'option') {
        return `option ${label} focused${
          focused.isDisabled ? ' disabled' : ''
        }, ${options.indexOf(focused) + 1} of ${options.length}.`;
      }
      return '';
    },

    onFilter: ({
      inputValue,
      resultsMessage,
    }: {
      inputValue: string,
      resultsMessage: string,
    }) =>
      `${resultsMessage}${inputValue ? ' for search term ' + inputValue : ''}.`,
  };
}
