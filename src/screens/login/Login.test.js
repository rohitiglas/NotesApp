import 'react-native';
import React from 'react';
import {Alert} from 'react-native';
import LoginScreen from './LoginScreen';
import {render, cleanup, fireEvent} from '@testing-library/react-native';
jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn(),
}));
describe('Login Form', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = render(<LoginScreen />);
  });
  afterEach(() => {
    cleanup();
    wrapper = null;
  });
  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render userId ,Password and Login Button correctly', () => {
    const {getByTestId} = wrapper;
    const userName = getByTestId('input-username');
    const password = getByTestId('input-password');
    const button = getByTestId('submit-button');
    expect(userName).toBeDefined();
    expect(password).toBeDefined();
    expect(button).toBeDefined();
    fireEvent.press(button);
    const error = getByTestId('text-error');
    expect(error.props.children).toBe('Form fields cannot be blank');
  });
  it('should show error when userName is empty', () => {
    const {getByTestId} = wrapper;
    const userName = getByTestId('input-username');
    const password = getByTestId('input-password');
    const button = getByTestId('submit-button');
    fireEvent.changeText(password, '12345678');
    expect(userName).toBeDefined();
    expect(password).toBeDefined();
    expect(button).toBeDefined();
    fireEvent.press(button);
    const error = getByTestId('text-error');
    expect(error.props.children).toBe('Username cannot be blank');
  });
  it('should show error when Password is empty', () => {
    const {getByTestId} = wrapper;
    const userName = getByTestId('input-username');
    const password = getByTestId('input-password');
    const button = getByTestId('submit-button');
    fireEvent.changeText(userName, 'Rohit');
    expect(userName).toBeDefined();
    expect(password).toBeDefined();
    expect(button).toBeDefined();
    fireEvent.press(button);
    const error = getByTestId('text-error');
    expect(error.props.children).toBe('Password cannot be blank');
  });
  it('should show error when Password is empty', () => {
    const {getByTestId, queryByTestId} = wrapper;
    const userName = getByTestId('input-username');
    const password = getByTestId('input-password');
    const button = getByTestId('submit-button');
    fireEvent.changeText(userName, 'Rohit');
    fireEvent.changeText(password, '12345678');
    expect(userName).toBeDefined();
    expect(password).toBeDefined();
    expect(button).toBeDefined();
    fireEvent.press(button);
    const error = queryByTestId('text-error');
    expect(error).toBe(null);
    const alertSpy = jest.spyOn(Alert, 'alert');
    expect(alertSpy).toHaveBeenCalled();
  });
});
