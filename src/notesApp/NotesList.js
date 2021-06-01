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
    <SafeAreaView testID='list-view' style={{flex: 1, marginTop: StatusBar.currentHeight || 0}}>
      {notes && notes.length === 0 && (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text
            testID={'no-notes'}
            style={{
              color: '#d90617',
              textAlign: 'center',
              fontSize: 30,
              fontWeight: '700',
            }}>
            No Notes available
          </Text>
        </View>
      )}
      {notes && notes.length > 0 && (
        <FlatList
          testID={'list-data'}
          data={notes}
          renderItem={renderItem}
          ItemSeparatorComponent={FlatListItemSeparator}
          keyExtractor={item => item.id}
        />
      )}
    </SafeAreaView>
  );
};
export default memo(NotesList);
