import 'react-native';
import React from 'react';
// import renderer from 'react-test-renderer';
import Enzyme, { shallow, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AddButton from '../Components/AddButton';
import ListButton from '../Components/ListButton';
import InputBox from '../Components/InputBox';

Enzyme.configure({ adapter: new Adapter() });

describe('Testing AddButton', () => {
  const wrapper = shallow(<AddButton />);
  it('renders as expected', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Test onPress', () => {
    let isPressed = false;
    const mockFn = () => { isPressed = true; }
    wrapper.setProps({ onPress: mockFn });
    wrapper.simulate('press');
    expect(isPressed).toBeTruthy();
  });
});


describe('Testing ListButton', () => {
  const wrapper = shallow(<ListButton />);
  it('renders as expected', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Test onPress', () => {
    let isPressed = false;
    const mockFn = () => { isPressed = true; }
    wrapper.setProps({ onPress: mockFn });
    wrapper.simulate('press');
    expect(isPressed).toBeTruthy();
  });
});

describe('Testing InputBox', () => {
  it('renders as expected', () => {
    const wrapper = shallow(<InputBox label={'label'} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Test value', () => {
    const testString = 'this is a test string';
    const instanceOf = render(<InputBox value={testString} />);
    expect(instanceOf.toString().indexOf(testString) !== -1).toBeTruthy();
  });
});
