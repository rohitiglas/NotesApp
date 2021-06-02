/* eslint-disable react-native/no-inline-styles */
import React, {memo} from 'react';
import {SafeAreaView, StatusBar, FlatList, View, Text} from 'react-native';
import NotesItem from './NotesItem';
const NotesList = ({notes, getNote, setToggle, deleteNote}) => {
  const renderItem = note => (
    <NotesItem
      key={note.id}
      note={note.item}
      getNote={getNote}
      toggleModal={setToggle}
      deleteNote={deleteNote}
    />
  );

  const FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#000',
        }}
      />
    );
  };

  return (
    <SafeAreaView
      testID="list-view"
      style={{
        paddingTop: 0,
        backgroundColor: '#FAFEFF',
      }}>
      <FlatList
        testID={'list-data'}
        style={{marginTop: 70, paddingBottom: 100}}
        numColumns="2"
        data={notes}
        renderItem={renderItem}
        ItemSeparatorComponent={FlatListItemSeparator}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};
export default memo(NotesList);
