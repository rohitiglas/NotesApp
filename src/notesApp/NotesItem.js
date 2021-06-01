import React, {memo} from 'react';
import {View, Text, Button} from 'react-native';
const NotesItem = ({note, getNote, deleteNote}) => {
  console.log("LSLLSLSLSLLLLSLNote",note);
  return (
    <View style={{margin: 10}}>
      <Text testID={'title'} style={{fontSize: 22, fontWeight: 'bold'}}>{note.title}</Text>
      <Text testID={'description'}>{note.body}</Text>
      <View style={{flexDirection: 'row'}}>
        <Button
          testID={'update-button'}
          onPress={() => getNote(note.id)}
          title="Update"
          color="#841584"
        />
        <Button
          testID={'delete-button'}
          onPress={() => deleteNote(note.id)}
          title="Delete"
          color="#841584"
        />
      </View>
    </View>
  );
};
export default memo(NotesItem);
