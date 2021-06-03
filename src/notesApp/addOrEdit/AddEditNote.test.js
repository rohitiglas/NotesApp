import 'react-native';
import React from 'react';
import {
  render,
  cleanup,
  fireEvent,
  flushMicrotasksQueue,
} from '@testing-library/react-native';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import AddEditNote from './AddEditNote';

let mock = new MockAdapter(axios);

describe('Add Note Page', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = render(
      <AddEditNote
        showModal={jest.fn()}
        note={{}}
        closeModal={jest.fn()}
        toggleModal={jest.fn()}
        addNote={jest.fn()}
        updateNote={jest.fn()}
      />,
    );
  });
  afterEach(() => {
    cleanup();
    wrapper = null;
  });
  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call Add Note api when you click add Button', async function () {
    const {getByTestId} = wrapper;
    const title = getByTestId('input-title');
    const description = getByTestId('input-description');
    const submitButton = getByTestId('submit-button');
    expect(getByTestId('button-text').children[0]).toBe('Add Note');
    fireEvent.changeText(title, 'My Notes');
    fireEvent.changeText(description, 'This is my First Note');
    fireEvent.press(submitButton);
  });
  it('should close Modal when you click Close Button', async function () {
    const {getByTestId} = wrapper;
    const closeButton = getByTestId('close-button');
    fireEvent.press(closeButton);
  });

  it('should call Update Note api when you click Update Button', async function () {
    wrapper = render(
      <AddEditNote
        showModal={jest.fn()}
        note={{title: 'Rohit', body: 'Bansal', id: '10'}}
        closeModal={jest.fn()}
        toggleModal={jest.fn()}
        addNote={jest.fn()}
        updateNote={jest.fn()}
      />,
    );
    const {getByTestId} = wrapper;
    const title = getByTestId('input-title');
    const description = getByTestId('input-description');
    const submitButton = getByTestId('submit-button');
    expect(getByTestId('button-text').children[0]).toBe('Update Note');
    expect(title.props.value).toBe('Rohit');
    expect(description.props.value).toBe('Bansal');
    fireEvent.press(submitButton);
  });
});
