import React, {useEffect, useState, memo} from 'react';
import {TextInput, Text, View, TouchableOpacity, StatusBar} from 'react-native';
import styles from '../login/LoginStyle';
const Form = ({
  showModal,
  toggleModal,
  note,
  addNote,
  updateNote,
  inputs,
  setInputs,
  closeModal
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setDescription(note.body);
    }
  }, [note, setInputs]);
  const handleSubmit = () => {
    console.log("HandleSubmit",note);
    if (!note.id) {
      addNote(title, description);
      return;
    }
    updateNote(note.id, title, description);
  };
  return (
    <View testID='add-edit-page' style={styles.mainContainer}>
      <View style={styles.loginContainer}>
        <StatusBar barStyle="light-content" />
        <TextInput
          testID={'input-title'}
          value={title}
          onChangeText={text => setTitle(text)}
          placeholder={'Title'}
          multiline={true}
          numberOfLines={2}
          maxLength={100}
          style={{
            height: 80,
            width: '80%',
            fontSize: 20,
            backgroundColor: 'white',
            marginBottom: 20,
            borderRadius: 20,
            padding: 10,
            color: '#2c3e50',
            paddingTop: 20,
          }}
        />
        <TextInput
          testID={'input-description'}
          value={description}
          onChangeText={text => setDescription(text)}
          placeholder={'Body'}
          multiline={true}
          numberOfLines={10}
          maxLength={1000}
          style={{
            height: 200,
            width: '80%',
            fontSize: 20,
            backgroundColor: 'white',
            marginBottom: 20,
            borderRadius: 20,
            padding: 10,
            paddingTop: 20,
            color: '#2c3e50',
            textAlignVertical: 'top',
          }}
        />
        <TouchableOpacity
          testID={'submit-button'}
          style={styles.buttonContainer}
          onPress={handleSubmit}>
          <Text style={styles.buttonText}>
            {note.id ? 'Update Note' : 'Add Note'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          testID={'close-button'}
          style={{position:'absolute',top:40,right:20,marginTop:20,width:50,height:50,borderRadius:25,backgroundColor:'#000',alignItems:'center',justifyContent: 'center'}}
          onPress={closeModal}>
          <Text style={styles.buttonText}>
            X
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default memo(Form);
