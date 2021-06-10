import 'react-native';
import React from 'react';
import {Alert} from 'react-native';
import SignUp from './Signup';
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
describe('Signup Form', () => {
  const fakeNavigation = {
    navigate: jest.fn(),
  };
  let wrapper;
  beforeEach(() => {
    wrapper = render(<SignUp navigation={fakeNavigation} />);
  });
  afterEach(() => {
    cleanup();
    wrapper = null;
  });
  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should show Form Empty error on button click ', () => {
    const {getByTestId} = wrapper;
    getByTestId('input-email');
    getByTestId('input-username');
    getByTestId('input-password');
    getByTestId('input-c-password');
    const button = getByTestId('submit-button');
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
    expect(email.props.error).toBe('Email cannot be blank');
  });
  it('should show error when UserName is empty', () => {
    const {getByTestId} = wrapper;
    const email = getByTestId('input-email');
    const userName = getByTestId('input-username');
    const password = getByTestId('input-password');
    const button = getByTestId('submit-button');
    fireEvent.changeText(email, 'abc@gmail.com');
    fireEvent.changeText(password, '12345678');
    fireEvent.press(button);
    expect(userName.props.error).toBe('Username cannot be blank');
  });
  it('should show error when Password is empty', () => {
    const {getByTestId} = wrapper;
    const email = getByTestId('input-email');
    const userName = getByTestId('input-username');
    const password = getByTestId('input-password');
    const button = getByTestId('submit-button');
    fireEvent.changeText(email, 'abc@gmail.com');
    fireEvent.changeText(userName, 'Rohit');
    fireEvent.press(button);
    expect(password.props.error).toBe('Password cannot be blank');
  });
  it('should show error when confirm password empty', () => {
    const {getByTestId} = wrapper;
    const email = getByTestId('input-email');
    const userName = getByTestId('input-username');
    const password = getByTestId('input-password');
    const cPassword = getByTestId('input-c-password');
    const button = getByTestId('submit-button');
    fireEvent.changeText(email, 'abc@gmail.com');
    fireEvent.changeText(userName, 'Rohit');
    fireEvent.changeText(password, '123456');
    fireEvent.changeText(cPassword, '');
    fireEvent.press(button);
    expect(cPassword.props.error).toBe('Password cannot be blank');
  });

  it('should open Login Screen on login button click', () => {
    const {getByTestId} = wrapper;
    const button = getByTestId('login-button');
    fireEvent.press(button);
    expect(fakeNavigation.navigate).toBeCalledWith('Login');
  });
  it('should login api called on submit button', async () => {
    mock.onPost('/api/registerUser').reply(200, {});
    const {getByTestId, queryByTestId} = wrapper;
    const email = getByTestId('input-email');
    const userName = getByTestId('input-username');
    const password = getByTestId('input-password');
    const cPassword = getByTestId('input-c-password');
    const button = getByTestId('submit-button');
    fireEvent.changeText(email, 'abc@gmail.com');
    fireEvent.changeText(userName, 'Rohit');
    fireEvent.changeText(password, '123456');
    fireEvent.changeText(cPassword, '123456');
    fireEvent.press(button);
    await fireEvent.press(button);
    await flushMicrotasksQueue();
    expect(mock.history.post.length).toBe(2);
    expect(mock.history.post[0].data).toBe(
      JSON.stringify({
        email: 'abc@gmail.com',
        userName: 'Rohit',
        password: '123456',
      }),
    );
    const error = queryByTestId('text-error');
    expect(error).toBe(null);
    const alertSpy = jest.spyOn(Alert, 'alert');
    expect(alertSpy).toHaveBeenCalled();
  });
  it('should show error when login api failed on submit button', async () => {
    mock.onPost('/api/registerUser').reply(500, {});
    const {getByTestId, queryByTestId} = wrapper;
    const email = getByTestId('input-email');
    const userName = getByTestId('input-username');
    const password = getByTestId('input-password');
    const cPassword = getByTestId('input-c-password');
    const button = getByTestId('submit-button');
    fireEvent.changeText(email, 'abc@gmail.com');
    fireEvent.changeText(userName, 'Rohit');
    fireEvent.changeText(password, '123456');
    fireEvent.changeText(cPassword, '123456');
    fireEvent.press(button);
    await fireEvent.press(button);
    await flushMicrotasksQueue();
    expect(mock.history.post.length).toBe(4);
    expect(mock.history.post[0].data).toBe(
      JSON.stringify({
        email: 'abc@gmail.com',
        userName: 'Rohit',
        password: '123456',
      }),
    );
    const error = queryByTestId('text-error');
    expect(error).toBe(null);
    const alertSpy = jest.spyOn(Alert, 'alert');
    expect(alertSpy).toHaveBeenCalled();
  });
});
