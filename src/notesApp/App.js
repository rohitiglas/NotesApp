import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import NotesList from './NotesList';
import AddEditNote from './AddEditNote';
import axios from 'axios';
const App = () => {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState({});
  const [inputs, setInputs] = useState({title: '', body: ''});
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    setLoading(true);
    axios
      .get('/api/notes')
      .then(function (response) {
        setLoading(false);
        setNotes(response.data.notes);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const getNote = id => {
    console.log("Note id",id);
    setLoading(true);

    axios
      .get(`/api/notes/${id}`)
      .then(function (response) {
        console.log("Note id Response",response);
        setNote(response.data.notes);
        setLoading(false);
        setToggle(true);
      })
      .catch(error => console.log('Note id Error"', error));



    // fetch(`/api/notes/${id}`)
    //   .then(res => res.json())
    //   .then(data => {
    //     setNote(data.notes);
    //     setLoading(false);
    //     setToggle(true);
    //   })
    //   .catch(error => console.log('Note not found', error));
  };
  const addNote = (title, body) => {
    if (!title || !body) {
      Alert.alert('', 'Please fill all the required input fields');
      return;
    }
    setLoading(true);
    axios.post('/api/notes', {
      title: title,
      body: body
    })
    .then(function (response) {
      console.log(response);
        setLoading(false);
        getNotes();
        setToggle(false);
        setInputs({title: '', body: ''});
        Alert.alert('', 'Note added successfully');
    })
    .catch(function (error) {
      console.log('Error adding note.', error);

        Alert.alert('', 'Error adding note.');
    });
    // fetch('/api/notes', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     title: title,
    //     body: body,
    //   }),
    // })
    //   .then(res => {
    //     console.log(res.json());
    //     setLoading(false);
    //     getNotes();
    //     setToggle(false);
    //     setInputs({title: '', body: ''});
    //     Alert.alert('', 'Note added successfully');
    //   })
    //   .catch(error => {
    //     console.log('Error adding note.', error);

    //     Alert.alert('', 'Error adding note.');
    //   });
  };

  const updateNote = (id, title, body) => {
    console.log("Update Note",title);
    console.log("Update Note Body",body);
    if (!title || !body) {
      Alert.alert('', 'Please fill all the required input fields');
      return;
    }
    setLoading(true);
    fetch(`/api/notes/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        title: title,
        body: body,
      }),
    })
      .then(res => {
        getNotes();
        setToggle(false);
        setLoading(false);
        Alert.alert('', 'Note updated successfully.');
      })
      .catch(error => {
        console.log('Note not found', error);
        Alert.alert('', 'Error updating note.');
      });
  };

  const deleteNote = id => {
    console.log("SSLSLLSLSLSLSLLSLSLSLIDIDIDIIDID",id);
    setLoading(true);


    axios.delete(`/api/notes/${id}`)
    .then(function (response) {
      console.log("SSLSLLSLSLSLSLLSLSLSL",response);
      getNotes();
      setLoading(false);
      Alert.alert('', 'Note deleted successfully');
    })
    .catch(function (error) {
      console.log('Note not found', error);
      Alert.alert('', 'Error deleting note.');
    });



    // fetch(`/api/notes/${id}`, {method: 'DELETE'})
    //   .then(res => {
    //     getNotes();
    //     setLoading(false);
    //     Alert.alert('', 'Note deleted successfully');
    //   })
    //   .catch(error => {
    //     console.log('Note not found', error);
    //     Alert.alert('', 'Error deleting note.');
    //   });
  };

  const handleAdd = () => {
    setInputs({title: '', body: ''});
    setNote([]);
    setToggle(!toggle);
  };

  return (
    <View style={{flex: 1, marginTop: 50}}>
      <Text
        testID={'notes-title'}
        style={{
          color: '#1741db',
          textAlign: 'center',
          fontSize: 20,
          fontWeight: '700',
        }}>
        Notes
      </Text>
      {loading && (
        <View
          testID={'loader'}
          style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size="large" />
        </View>
      )}
      <TouchableOpacity
        testID={'add-notes'}
        style={{
          borderWidth: 1,
          borderColor: 'rgba(0,0,0,0.2)',
          alignItems: 'center',
          justifyContent: 'center',
          width: 70,
          position: 'absolute',
          zIndex: 1,
          bottom: 10,
          right: 10,
          height: 70,
          backgroundColor: '#0b43e0',
          borderRadius: 100,
        }}
        onPress={handleAdd}>
        <Text
          style={{
            color: '#fff',
            alignSelf: 'center',
            fontSize: 30,
            fontWeight: '700',
          }}>
          {toggle ? 'X' : '+'}
        </Text>
      </TouchableOpacity>
      {!toggle && (
        <NotesList
          testId={'notes-list'}
          notes={notes}
          getNote={getNote}
          setToggle={setToggle}
          deleteNote={deleteNote}
        />
      )}
      {toggle && (
        <AddEditNote
          testId={'add-edit-page'}
          showModal={toggle}
          note={note}
          toggleModal={setToggle}
          addNote={addNote}
          updateNote={updateNote}
          inputs={inputs}
          setInputs={setInputs}
        />
      )}
    </View>
  );
};
export default App;
