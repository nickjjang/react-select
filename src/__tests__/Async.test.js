import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import cases from 'jest-in-case';

import Async from '../Async';
import { OPTIONS } from './constants';
import { components } from '../components';
const { Option } = components;

test('defaults - snapshot', () => {
  const tree = mount(<Async />);
  expect(toJson(tree)).toMatchSnapshot();
});

cases('load option prop with defaultOptions true', ({ props, expectOptionLength }) => {
  const asyncSelectWrapper = mount(<Async menuIsOpen {...props} />);
  expect(asyncSelectWrapper.find(Option).length).toBe(expectOptionLength);
}, {
  'with callback  > should resolve options': {
    props: {
      defaultOptions: true,
      loadOptions: (inputValue, callBack) => callBack([OPTIONS[0]]),
    },
    expectOptionLength: 1,
  },
  'with promise  > should resolve options': {
    skip: true,
    props: {
      defaultOptions: true,
      loadOptions: () => new Promise(resolve => {resolve([OPTIONS[0]]);}),
    },
    expectOptionLength: 1,
  }
});

cases('load options props with', ({ props, expectloadOptionsLength }) => {
  let asyncSelectWrapper = mount(<Async {...props} />);
  let inputValueWrapper = asyncSelectWrapper.find('div.react-select__input input');
  asyncSelectWrapper.setProps({ inputValue: 'a' });
  inputValueWrapper.simulate('change', { currentTarget: { value: 'a' } });
  expect(asyncSelectWrapper.find(Option).length).toBe(expectloadOptionsLength);
}, {
  'with callback > should resolve the options': {
    props: {
      loadOptions: (inputValue, callBack) => callBack(OPTIONS),
    },
    expectloadOptionsLength: 17,
  },
  'with promise > should resolve the options': {
    skip: true,
    props: {
      loadOptions: () => Promise.resolve(OPTIONS),
    },
    expectloadOptionsLength: 17,
  }
});

test.skip('to not call loadOptions again for same value when cacheOptions is true', () => {
  let loadOptionsSpy = jest.fn();
  let asyncSelectWrapper = mount(<Async loadOptions={loadOptionsSpy} cacheOptions />);
  let inputValueWrapper = asyncSelectWrapper.find('div.react-select__input input');

  asyncSelectWrapper.setProps({ inputValue: 'a' });
  inputValueWrapper.simulate('change', { currentTarget: { value: 'a' } });
  expect(loadOptionsSpy).toHaveBeenCalledTimes(1);

  asyncSelectWrapper.setProps({ inputValue: 'b' });
  inputValueWrapper.simulate('change', { target: { value: 'b' } ,currentTarget: { value: 'b' } });
  expect(loadOptionsSpy).toHaveBeenCalledTimes(2);

  asyncSelectWrapper.setProps({ inputValue: 'b' });
  inputValueWrapper.simulate('change', { currentTarget: { value: 'b' } });
  expect(loadOptionsSpy).toHaveBeenCalledTimes(2);
});

test('to create new cache for each instance', () => {
  const asyncSelectWrapper = mount(<Async cacheOptions />);
  const instanceOne = asyncSelectWrapper.instance();

  const asyncSelectTwoWrapper = mount(<Async cacheOptions />);
  const instanceTwo = asyncSelectTwoWrapper.instance();

  expect(instanceOne.optionsCache).not.toBe(instanceTwo.optionsCache);
});
