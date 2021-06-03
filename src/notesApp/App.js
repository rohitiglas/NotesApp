import React, {useEffect, useState} from 'react';
import {View, Alert, Modal} from 'react-native';
import NotesList from './NotesList';
import AddEditNote from './addOrEdit/AddEditNote';
import axios from 'axios';
import SearchBar from './searchBar/SearchBar';
import Title from './title/Title';
import Error from './errorScreen/Error';
import Loader from './Loader';
import FabButton from './FAB/FabButton';
const App = () => {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState({});
  const [inputs, setInputs] = useState({title: '', body: ''});
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState({});
  const [query, setQuery] = useState('');

  useEffect(() => {
    getNotes();
  }, []);

  const handleSearch = text => {
    const formattedQuery = text.toLowerCase();
    const data = searchResult.filter(user => {
      return contains(user, formattedQuery);
    });
    setQuery(text);
    setNotes(data);
  };
  const clearSearch = () => {
    setQuery('');
    setNotes(searchResult);
    // getNotes();
  };
  const contains = ({title, body}, query) => {
    return !!(
      title.toLowerCase().includes(query) || body.toLowerCase().includes(query)
    );
  };

  const getNotes = () => {
    setLoading(true);
    axios
      .get('/api/notes')
      .then(function (response) {
        setLoading(false);
        setNotes(response.data.notes);
        setSearchResult(response.data.notes);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const getNote = id => {
    setLoading(true);

    axios
      .get(`/api/notes/${id}`)
      .then(function (response) {
        setNote(response.data.notes);
        setLoading(false);
        setToggle(true);
      })
      .catch(error => console.log('Note id Error"', error));
  };
  const addNote = (title, body) => {
    console.log('Add Notes Start', title);
    if (!title || !body) {
      Alert.alert('', 'Please fill all the required input fields');
      return;
    }
    setLoading(true);
    axios
      .post('/api/notes', {
        title: title,
        body: body,
      })
      .then(function (response) {
        console.log('Add Notes Response', response);
        setLoading(false);
        getNotes();
        setToggle(false);
        setInputs({title: '', body: ''});
        Alert.alert('', 'Note added successfully');
      })
      .catch(function (error) {
        console.log('Add Notes Error', error);
        Alert.alert('', 'Error adding note.');
      });
  };

  const updateNote = (id, title, body) => {
    if (!title || !body) {
      Alert.alert('', 'Please fill all the required input fields');
      return;
    }
    setLoading(true);
    axios
      .patch(`/api/notes/${id}`, {
        title: title,
        body: body,
      })
      .then(function (response) {
        getNotes();
        setToggle(false);
        setLoading(false);
        Alert.alert('', 'Note updated successfully.');
      })
      .catch(function () {
        Alert.alert('', 'Error updating note.');
      });
  };

  const deleteNote = id => {
    Alert.alert(
      'Notes',
      'Do you want to delete the note',
      [
        {
          text: 'NO',
          onPress: () => {},
        },
        {
          text: 'YES',
          onPress: () => {
            setLoading(true);

            axios
              .delete(`/api/notes/${id}`)
              .then(function (response) {
                getNotes();
                setLoading(false);
                Alert.alert('', 'Note deleted successfully');
              })
              .catch(function (error) {
                Alert.alert('', 'Error deleting note.');
              });
          },
        },
      ],
      {cancelable: false},
    );
  };

  const handleAdd = () => {
    setInputs({title: '', body: ''});
    setNote([]);
    setToggle(!toggle);
  };

  return (
    <View style={{flex: 1, marginTop: 50}}>
      <Title />
      <SearchBar
        query={query}
        onChangeText={handleSearch}
        clearText={clearSearch}
      />
      {loading ? (
        <Loader />
      ) : notes && notes.length === 0 ? (
        <Error />
      ) : (
        !toggle && (
          <NotesList
            testId={'notes-list'}
            notes={notes}
            getNote={getNote}
            setToggle={setToggle}
            deleteNote={deleteNote}
          />
        )
      )}
      <FabButton handleAdd={handleAdd} toggle={toggle} />
      <Modal animationType="slide" transparent={true} visible={toggle}>
        <AddEditNote
          testId={'add-edit-page'}
          showModal={toggle}
          note={note}
          closeModal={() => setToggle(false)}
          toggleModal={setToggle}
          addNote={addNote}
          updateNote={updateNote}
          inputs={inputs}
          setInputs={setInputs}
        />
      </Modal>
    </View>
  );
};
export default App;
