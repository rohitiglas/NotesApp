import {Alert} from 'react-native';
import React from 'react';
import {render, cleanup, fireEvent, flushMicrotasksQueue, waitForElement} from '@testing-library/react-native';
import App from '../App';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// jest.mock('../AddEditNote');
jest.spyOn(Alert, 'alert');

let mock = new MockAdapter(axios);

describe('App screen', () => {
  let wrapper;
  beforeEach(() => {
    mock.onGet('/api/notes').reply(200, {
      notes: [{title: 'Rohit', body: 'Bansal', id: '10'}],
    });
    mock.onDelete(`/api/notes/10`).reply(200, {});
    mock.onGet(`/api/notes/10`).reply(200, {notes:{title: 'Rohit', body: 'Bansal', id: '10'}});
    mock.onPatch(`/api/notes/10`,{title:'Rohit',description:'Body'}).reply(200, {});
    wrapper = render(<App />);
  });
  afterEach(() => {
    cleanup();
    wrapper = null;
  });
  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should render notes list',async ()=>{
    const {getByTestId, queryByTestId,debug} = wrapper;
    expect(getByTestId('notes-title')).toBeDefined();
    expect(getByTestId('add-notes')).toBeDefined();
    await flushMicrotasksQueue();
    expect(getByTestId('list-view')).toBeDefined();
    expect(queryByTestId('no-notes')).toBeNull();
    expect(getByTestId('list-data')).toBeDefined();
    await flushMicrotasksQueue();
    // debug();
    expect(getByTestId('title').children[0]).toBe('Rohit');
  });
  it('should delete note when delete button press',async ()=>{
    const {getByTestId, queryByTestId,debug} = wrapper;
    expect(getByTestId('notes-title')).toBeDefined();
    expect(getByTestId('add-notes')).toBeDefined();
    await flushMicrotasksQueue();
    expect(getByTestId('list-view')).toBeDefined();
    expect(queryByTestId('no-notes')).toBeNull();
    expect(getByTestId('list-data')).toBeDefined();
    const deleteNote=getByTestId('delete-button');
    expect(deleteNote).toBeDefined();
    fireEvent.press(deleteNote);
    await flushMicrotasksQueue();
    // debug();
    expect(mock.history.delete.length).toBe(1);
  });
  it('should update api called when update button press',async ()=>{
    const {getByTestId, queryByTestId,debug} = wrapper;
    expect(getByTestId('notes-title')).toBeDefined();
    expect(getByTestId('add-notes')).toBeDefined();
    await flushMicrotasksQueue();
    expect(getByTestId('list-view')).toBeDefined();
    expect(queryByTestId('no-notes')).toBeNull();
    expect(getByTestId('list-data')).toBeDefined();
    const updateNote=getByTestId('update-button');
    expect(updateNote).toBeDefined();
    fireEvent.press(updateNote);
    await flushMicrotasksQueue();
    console.log("Url is",mock.history.get);
    expect(mock.history.get.length).toBe(6);
    await flushMicrotasksQueue();
    debug();
    const title=getByTestId('input-title');
    const description=getByTestId('input-description');
    expect(title.props.value).toBe('Rohit');
    expect(description.props.value).toBe('Bansal');
  });
  it('should not render notes list and Text no notes available',async ()=>{
    mock.onGet('/api/notes').reply(500, {
    });
    const {getByTestId, queryByTestId,debug} = wrapper;
    expect(getByTestId('notes-title')).toBeDefined();
    expect(getByTestId('add-notes')).toBeDefined();
    await flushMicrotasksQueue();
    expect(getByTestId('list-view')).toBeDefined();
    expect(queryByTestId('list-data')).toBeNull();
    expect(getByTestId('no-notes')).toBeDefined();
  });
  it('should show Alert message on Edit/Add notes page when title and description empty on Add Note button click', async function () {
    const {getByTestId, queryByTestId,debug} = wrapper;
    expect(getByTestId('notes-title')).toBeDefined();
    expect(getByTestId('add-notes')).toBeDefined();
    // await fireEvent(getByTestId('add-notes'), 'onClick');
    await fireEvent.press(getByTestId('add-notes'));
    await flushMicrotasksQueue();
    expect(getByTestId('add-edit-page')).toBeDefined();
    const title=getByTestId('input-title');
    const description=getByTestId('input-description');
    const submitButton=getByTestId('submit-button');
    fireEvent.changeText(title, '');
    fireEvent.changeText(description, '');
    await fireEvent.press(submitButton);
    expect(Alert.alert).toHaveBeenCalledWith('','Please fill all the required input fields')
    expect(wrapper).toMatchSnapshot();
  });
  it('should show Edit/Add notes page when button click', async function () {
    const {getByTestId, queryByTestId,debug} = wrapper;
    expect(getByTestId('notes-title')).toBeDefined();
    expect(getByTestId('add-notes')).toBeDefined();
    // await fireEvent(getByTestId('add-notes'), 'onClick');
    await fireEvent.press(getByTestId('add-notes'));
    await flushMicrotasksQueue();
    expect(getByTestId('add-edit-page')).toBeDefined();
    const title=getByTestId('input-title');
    const description=getByTestId('input-description');
    const submitButton=getByTestId('submit-button');
    fireEvent.changeText(title, 'My Notes');
    fireEvent.changeText(description, 'This is my First Note');
    await fireEvent.press(submitButton);
    // mock.onPost('/api/notes',{ title: 'My Notes',description: 'This is my First Note'}).reply(200, {
      
    // });
    expect(mock.history.post.length).toBe(1);
    expect(mock.history.post[0].data).toBe(JSON.stringify({ title: 'My Notes', body: "This is my First Note" }));
    expect(wrapper).toMatchSnapshot();
  });
});