import 'react-native';
import React from 'react';
import {Alert} from 'react-native';
import LoginScreen from './LoginScreen';
import {
  render,
  cleanup,
  fireEvent,
  flushMicrotasksQueue,
} from '@testing-library/react-native';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
let mock = new MockAdapter(axios);
jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn(),
}));
describe('Login Form', () => {
  const fakeNavigation = {
    navigate: jest.fn(),
  };
  let wrapper;
  beforeEach(() => {
    wrapper = render(<LoginScreen navigation={fakeNavigation} />);
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
    const userName = getByTestId('input-email');
    const password = getByTestId('input-password');
    const button = getByTestId('submit-button');
    expect(userName).toBeDefined();
    expect(password).toBeDefined();
    expect(button).toBeDefined();
    fireEvent.press(button);
    const error = getByTestId('text-error');
    expect(error.props.children).toBe('Form fields cannot be blank');
  });
  it('should show error when email is empty', () => {
    const {getByTestId} = wrapper;
    const email = getByTestId('input-email');
    const password = getByTestId('input-password');
    const button = getByTestId('submit-button');
    fireEvent.changeText(password, '12345678');
    fireEvent.press(button);
    expect(email.props.error).toBe('Please enter valid email');
  });
  it('should show error when Password is empty', () => {
    const {getByTestId} = wrapper;
    const userName = getByTestId('input-email');
    const password = getByTestId('input-password');
    const button = getByTestId('submit-button');
    fireEvent.changeText(userName, 'Rohit@gmail.com');
    fireEvent.press(button);
    expect(password.props.error).toBe('Password cannot be blank');
  });
  it('should open SignUp Screen on Signup button click', () => {
    const {getByTestId} = wrapper;
    const button = getByTestId('signup-button');
    fireEvent.press(button);
    expect(fakeNavigation.navigate).toBeCalledWith('SignUp');
  });
  it('should open ForgetPassword Screen on Forget button click', () => {
    const {getByTestId} = wrapper;
    const button = getByTestId('forget-password');
    fireEvent.press(button);
    expect(fakeNavigation.navigate).toBeCalledWith('ForgetPassword');
  });
  it('should login api called on submit button', async () => {
    mock.onPost('/api/login').reply(200, {});
    const {getByTestId, queryByTestId} = wrapper;
    const userName = getByTestId('input-email');
    const password = getByTestId('input-password');
    const button = getByTestId('submit-button');
    fireEvent.changeText(userName, 'Rohit@gmail.com');
    fireEvent.changeText(password, '12345678');
    await fireEvent.press(button);
    await flushMicrotasksQueue();
    expect(mock.history.post.length).toBe(1);
    expect(mock.history.post[0].data).toBe(
      JSON.stringify({email: 'Rohit@gmail.com', password: '12345678'}),
    );
    const error = queryByTestId('text-error');
    expect(error).toBe(null);
    const alertSpy = jest.spyOn(Alert, 'alert');
    expect(alertSpy).toHaveBeenCalled();
  });
});
