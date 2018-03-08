// @flow
import md from '../markdown/renderer';
import ComponentPropTypes from './proptypes';

export default function Components() {
  return md`
    # Components

    The main feature of this library is providing consumers with the
    building blocks necessary to create _their_ component.

    The following components are customisable and switchable:

    ### ClearIndicator
    Indicator for clearing values in the control.


    Props

    ${ComponentPropTypes.ClearIndicator}


    ### Control

    Props

    ${ComponentPropTypes.Control}

    ### Dropdown Indicator

    ${ComponentPropTypes.DropdownIndicator}


    ### Group

    ${ComponentPropTypes.Group}

    ### GroupHeading

    ${ComponentPropTypes.GroupHeading}

    ### IndicatorsContainer

    ${ComponentPropTypes.IndicatorsContainer}
    
    ### IndicatorsSeparator

    ${ComponentPropTypes.IndicatorSeparator}

    ### Input
    ### LoadingIndicator
    ### Menu
    ### MenuList
    ### LoadingMessage
    ### NoOptionsMessage
    ### MultiValue
    ### MultiValueContainer
    ### MultiValueLabel
    ### MultiValueRemove
    ### Option
    ### Placeholder
    ### SelectContainer
    ### SingleValue
    ### ValueContainer

    ## Replacing Components

    React-Select allows you to augment layout and functionality by replacing
    the default components with your own, using the \`components\`
    property. These components are given all the current props and state
    letting you achieve anything you dream up.

    ### Inner Props

    All functional properties that the component needs are provided in
    \`innerProps\` which you must spread.

    ### Common Props

    Every component receives \`commonProps\` which are spread onto
    the component. These include:

    \`clearValue\`
    \`getStyles\`
    \`getValue\`
    \`hasValue\`
    \`isMulti\`
    \`isRtl\`
    \`options\`
    \`selectOption\`
    \`setValue\`
    \`selectProps\`

    ~~~jsx
    import React from 'react';
    import Select from 'react-select';

    const CustomOption = ({ innerProps, isDisabled }) =>
      !isDisabled ? (
        <div {...innerProps}>// your component internals</div>
      ) : null;

    class Component extends React.Component {
      render() {
        return <Select components={{ Option: CustomOption }} />;
      }
    }
    ~~~

  `;
}
