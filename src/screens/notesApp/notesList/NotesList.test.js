import 'react-native';
import React from 'react';
import {render, cleanup, fireEvent} from '@testing-library/react-native';
import NotesList from '../NotesList';

describe('Notes List', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = render(
      <NotesList
        notes={[]}
        getNote={jest.fn()}
        setToggle={jest.fn()}
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

  it('should render list item', function () {
    wrapper = render(
      <NotesList
        notes={[{title: 'Rohit', body: 'Bansal', id: '10'}]}
        getNote={jest.fn()}
        setToggle={jest.fn()}
        deleteNote={jest.fn()}
      />,
    );
    const {getByTestId} = wrapper;
    const flatList = getByTestId('list-data');
    expect(flatList).toBeDefined();
    expect(flatList.props.data).toHaveLength(1);
    expect(flatList.props.data[0]).toStrictEqual({
      body: 'Bansal',
      id: '10',
      title: 'Rohit',
    });
  });
});
