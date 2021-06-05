import React, {memo} from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
const NotesItem = ({note, getNote, deleteNote}) => {
  return (
    <TouchableOpacity
      testID="note-item"
      onPress={() => getNote(note.id)}
      onLongPress={() => {
        deleteNote(note.id);
      }}
      style={[styles.card, {backgroundColor: '#66CCCC'}]}>
      <Text testID={'title'} numberOfLines={1} style={styles.title}>
        {note.title}
      </Text>
      <Text numberOfLines={6} style={styles.note} testID={'description'}>
        {note.body}
      </Text>
    </TouchableOpacity>
  );
};
export default memo(NotesItem);

const styles = StyleSheet.create({
  card: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 10,
    shadowRadius: 5,
    shadowOpacity: 1.0,
    borderRadius: 5,
    margin: 20,
    paddingRight: 20,
    width: 150,
    minHeight: 150,
    color: '#fff',
    backgroundColor: '#000',
  },
  create: {
    fontSize: 11,
    alignSelf: 'flex-end',
    color: '#fff',
    right: -10,
    top: 5,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
    top: 10,
    left: 10,
  },
  category: {
    color: '#FFFBFB',
    fontSize: 10,
    top: 8,
    left: 10,
  },
  note: {
    color: '#fff',
    fontSize: 12,
    top: 10,
    left: 10,
  },
});
