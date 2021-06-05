import {Alert} from 'react-native';
import React from 'react';
import {
  render,
  cleanup,
  fireEvent,
  flushMicrotasksQueue,
  waitForElement,
} from '@testing-library/react-native';
import App from '../App';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// jest.mock('../AddEditNote');
const spyAlert = jest.spyOn(Alert, 'alert');

let mock = new MockAdapter(axios);

describe('App screen', () => {
  let wrapper;
  beforeEach(() => {
    mock.onGet('/api/notes').reply(200, {
      notes: [{title: 'Rohit', body: 'Bansal', id: '10'}],
    });
    mock.onDelete('/api/notes/10').reply(200, {});
    mock
      .onGet('/api/notes/10')
      .reply(200, {notes: {title: 'Rohit', body: 'Bansal', id: '10'}});
    mock
      .onPatch('/api/notes/10', {title: 'Rohit', body: 'Body'})
      .reply(200, {});
    mock.onPost('/api/notes', {title: 'Rohit', body: 'Body'}).reply(200, {});
    wrapper = render(<App />);
  });
  afterEach(() => {
    cleanup();
    wrapper = null;
  });
  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should render notes list', async () => {
    const {getByTestId, queryByTestId, debug} = wrapper;
    expect(getByTestId('notes-title')).toBeDefined();
    expect(getByTestId('add-notes')).toBeDefined();
    await flushMicrotasksQueue();
    expect(getByTestId('list-view')).toBeDefined();
    expect(queryByTestId('no-notes')).toBeNull();
    expect(getByTestId('list-data')).toBeDefined();
    await flushMicrotasksQueue();
    expect(getByTestId('title').children[0]).toBe('Rohit');
  });
  it('should not render notes list when api failed', async () => {
    mock.onGet('/api/notes').reply(500, {});
    const {getByTestId, queryByTestId} = wrapper;
    expect(getByTestId('notes-title')).toBeDefined();
    expect(getByTestId('add-notes')).toBeDefined();
    await flushMicrotasksQueue();
    expect(queryByTestId('no-notes')).toBeDefined();
  });
  it('should Delete API Failed on  delete button press', async () => {
    mock.onDelete('/api/notes/10').reply(500, {});
    const {getByTestId} = wrapper;
    await flushMicrotasksQueue();
    const deleteNote = getByTestId('note-item');
    expect(deleteNote).toBeDefined();
    fireEvent(deleteNote, 'onLongPress');
    expect(Alert.alert).toHaveBeenCalled();
    await spyAlert.mock.calls[0][2][1].onPress();
    await flushMicrotasksQueue();
    expect(mock.history.delete.length).toBe(1);
  });
  it('should delete note when delete button press', async () => {
    const {getByTestId, queryByTestId, debug} = wrapper;
    expect(getByTestId('notes-title')).toBeDefined();
    expect(getByTestId('add-notes')).toBeDefined();
    await flushMicrotasksQueue();
    expect(getByTestId('list-view')).toBeDefined();
    expect(queryByTestId('no-notes')).toBeNull();
    expect(getByTestId('list-data')).toBeDefined();
    const deleteNote = getByTestId('note-item');
    expect(deleteNote).toBeDefined();
    fireEvent(deleteNote, 'onLongPress');
    expect(Alert.alert).toHaveBeenCalled();
    await spyAlert.mock.calls[0][2][1].onPress();
    await flushMicrotasksQueue();
    expect(mock.history.delete.length).toBe(2);
  });
  it('should show error when getNote Api called on update button press', async () => {
    mock.onGet('/api/notes/10').reply(500, {});
    const {getByTestId, queryByTestId} = wrapper;
    await flushMicrotasksQueue();
    expect(getByTestId('list-view')).toBeDefined();
    expect(queryByTestId('no-notes')).toBeNull();
    expect(getByTestId('list-data')).toBeDefined();
    const updateNote = getByTestId('note-item');
    expect(updateNote).toBeDefined();
    fireEvent.press(updateNote);
    await flushMicrotasksQueue();
    expect(mock.history.get.length).toBe(8);
    // await flushMicrotasksQueue();
    // const title = getByTestId('input-title');
    // const description = getByTestId('input-description');
    // expect(title.props.value).toBe('Rohit');
    // expect(description.props.value).toBe('Bansal');
  });
  it('should show Alert message when Title and Body empty on update button press', async () => {
    mock
      .onGet('/api/notes/10')
      .reply(200, {notes: {title: '', body: '', id: '10'}});
    const {getByTestId} = wrapper;
    await flushMicrotasksQueue();
    const updateNote = getByTestId('note-item');
    expect(updateNote).toBeDefined();
    fireEvent.press(updateNote);
    await flushMicrotasksQueue();
    expect(mock.history.get.length).toBe(10);
    await flushMicrotasksQueue();
    const submitButton = getByTestId('submit-button');
    await fireEvent.press(submitButton);
    await flushMicrotasksQueue();
    expect(Alert.alert).toHaveBeenCalledWith(
      '',
      'Please fill all the required input fields',
    );
    expect(mock.history.patch.length).toBe(0);
  });
  it('should show response when Update api called when update button press', async () => {
    mock
      .onPatch('/api/notes/10', {title: 'Rohit', body: 'Body'})
      .reply(200, {});
    const {getByTestId} = wrapper;
    await flushMicrotasksQueue();
    const updateNote = getByTestId('note-item');
    expect(updateNote).toBeDefined();
    fireEvent.press(updateNote);
    await flushMicrotasksQueue();
    const submitButton = getByTestId('submit-button');
    await fireEvent.press(submitButton);
    await flushMicrotasksQueue();
    expect(mock.history.patch.length).toBe(1);
  });
  it('should show error when Update api failed on update button press', async () => {
    mock
      .onPatch('/api/notes/10', {title: 'Rohit', description: 'Body'})
      .reply(500, {});
    const {getByTestId} = wrapper;
    await flushMicrotasksQueue();
    const updateNote = getByTestId('note-item');
    expect(updateNote).toBeDefined();
    fireEvent.press(updateNote);
    await flushMicrotasksQueue();
    const submitButton = getByTestId('submit-button');
    await fireEvent.press(submitButton);
    await flushMicrotasksQueue();
    expect(mock.history.patch.length).toBe(2);
  });
  it('should not render notes list and Text no notes available', async () => {
    mock.onGet('/api/notes').reply(200, {
      notes: [],
    });
    const {getByTestId} = wrapper;
    expect(getByTestId('notes-title')).toBeDefined();
    expect(getByTestId('add-notes')).toBeDefined();
    await flushMicrotasksQueue();
    expect(getByTestId('no-notes')).toBeDefined();
  });
  it('should close Add/Edit Modal when you click closeButton', async function () {
    const {getByTestId} = wrapper;
    await fireEvent.press(getByTestId('add-notes'));
    await flushMicrotasksQueue();
    expect(getByTestId('add-edit-page')).toBeDefined();
    const closeButton = getByTestId('close-button');
    await fireEvent.press(closeButton);
    expect(wrapper).toMatchSnapshot();
  });
  it('should show Alert message on Edit/Add notes page when title and description empty on Add Note button click', async function () {
    const {getByTestId} = wrapper;
    expect(getByTestId('notes-title')).toBeDefined();
    expect(getByTestId('add-notes')).toBeDefined();
    // await fireEvent(getByTestId('add-notes'), 'onClick');
    await fireEvent.press(getByTestId('add-notes'));
    await flushMicrotasksQueue();
    expect(getByTestId('add-edit-page')).toBeDefined();
    const title = getByTestId('input-title');
    const description = getByTestId('input-description');
    const submitButton = getByTestId('submit-button');
    fireEvent.changeText(title, '');
    fireEvent.changeText(description, '');
    await fireEvent.press(submitButton);
    expect(Alert.alert).toHaveBeenCalledWith(
      '',
      'Please fill all the required input fields',
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('should show Edit/Add notes page when Add button click', async function () {
    mock
      .onPost('/api/notes', {title: 'My Notes', body: 'This is my First Note'})
      .reply(200, {});
    const {getByTestId} = wrapper;
    expect(getByTestId('notes-title')).toBeDefined();
    expect(getByTestId('add-notes')).toBeDefined();
    await fireEvent.press(getByTestId('add-notes'));
    await flushMicrotasksQueue();
    expect(getByTestId('add-edit-page')).toBeDefined();
    const title = getByTestId('input-title');
    const description = getByTestId('input-description');
    const submitButton = getByTestId('submit-button');
    fireEvent.changeText(title, 'My Notes');
    fireEvent.changeText(description, 'This is my First Note');
    await fireEvent.press(submitButton);
    await flushMicrotasksQueue();
    expect(mock.history.post.length).toBe(1);
    expect(mock.history.post[0].data).toBe(
      JSON.stringify({title: 'My Notes', body: 'This is my First Note'}),
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('should show error when Add Note Api called', async function () {
    mock
      .onPost('/api/notes', {title: 'My Notes', body: 'This is my First Note'})
      .reply(500, {});
    const {getByTestId} = wrapper;
    expect(getByTestId('notes-title')).toBeDefined();
    expect(getByTestId('add-notes')).toBeDefined();
    await fireEvent.press(getByTestId('add-notes'));
    await flushMicrotasksQueue();
    expect(getByTestId('add-edit-page')).toBeDefined();
    const title = getByTestId('input-title');
    const description = getByTestId('input-description');
    const submitButton = getByTestId('submit-button');
    fireEvent.changeText(title, 'My Notes');
    fireEvent.changeText(description, 'This is my First Note');
    await fireEvent.press(submitButton);
    await flushMicrotasksQueue();
    expect(mock.history.post.length).toBe(2);
    expect(wrapper).toMatchSnapshot();
  });
});
