import React from 'react';
import {Text, View} from 'react-native';
export default function App() {
  let [movies, setMovies] = React.useState([]);

  React.useEffect(() => {
    fetch('/api/notes')
      .then(res => res.json())
      .then(data => setMovies(data.notes))
      .catch(error => console.log('Error fetching notes', error));
  }, []);

  return (
    <View style={{marginTop: 50, marginLeft: 10, marginRight: 10}}>
      {movies.map(movie => (
        <View style={{marginTop: 30}}>
          <Text style={{fontSize: 20}} key={movie.id}>
            {movie.title}
          </Text>
          <Text style={{fontSize: 10}}>
            {movie.body}
          </Text>
        </View>
      ))}
    </View>
  );
}
