import 'react-native';
import React from 'react';
import {render, cleanup, fireEvent} from '@testing-library/react-native';
import NotesItem from '../NotesItem';

describe('Notes Item', () => {
  let wrapper;
  const note = {id: '10', item: {title: 'Rohit', body: 'Bansal', id: '10'}};
  beforeEach(() => {
    wrapper = render(
      <NotesItem
        key={note.id}
        note={note.item}
        getNote={jest.fn()}
        toggleModal={jest.fn()}
        deleteNote={jest.fn()}
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

  it('should item', function () {
    const {getByTestId} = wrapper;
    expect(getByTestId('title')).toBeDefined();
    expect(getByTestId('description')).toBeDefined();
    expect(getByTestId('title').props.children).toBe('Rohit');
    expect(getByTestId('description').props.children).toBe('Bansal');
  });
});
