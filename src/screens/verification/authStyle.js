import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  wrapper: {
    marginTop: 80,
    marginLeft: 25,
    marginRight: 25,
  },
  textInput: {
    padding: 20,
    backgroundColor: '#1e1e1d',
    borderRadius: 5,
    fontWeight: '500',
    fontSize: 18,
    color: '#FFF',
    borderColor: '#FFF',
    borderWidth: 1,
  },

  safeAreaViewWrapper: {
    flex: 1,
    backgroundColor: 'black',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#2c3e50',
  },
  container: {
    padding: 20,
  },
  loginContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
  },
  errorText: {
    marginVertical: 10,
    color: 'red',
  },
  input: {
    height: 50,
    width: '80%',
    backgroundColor: 'white',
    marginBottom: 20,
    borderRadius: 20,
    padding: 10,
    color: '#2c3e50',
  },
  buttonContainer: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#ff2251',
    borderRadius: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFF',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    fontWeight: '700',
    fontSize: 22,
  },
  forgetText: {
    textAlign: 'right',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    color: '#656565',
    fontSize: 16,
    fontWeight: '700',
    paddingTop: 10,
    paddingBottom: 10,
  },
});
