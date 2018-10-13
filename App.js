import React from 'react';
import {
  Button,
  StyleSheet, 
  Text, 
  View
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textContainer: {
    fontSize: 25,
    paddingVertical: 30,
    textAlign: 'center'
  },
  buttonContainer: {
    width: 100,
    height: 100
  }
});

async function askMicPerms() {
  const { Permissions } = Expo;
  const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
  if(status === 'denied'){
    alert("Hey! You can't use the app unless you allow access to your mic.");
  }
}

async function getMicPerms() {
  const { Permissions } = Expo;
  const { status } = await Permissions.getAsync(Permissions.AUDIO_RECORDING);
  if(status !== 'granted'){
    askMicPerms();
  }
}

async function recordAudio() {
  getMicPerms();
}

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textContainer}>
          Hello and Welcome to ACCUcent,
          Press the button and read aloud the small story below and we will dertermine your accent.
        </Text>
        <Text style={styles.textContainer}>
          Please call Stella. Ask her to bring these things with her from the store:
          Six spoons of fresh snow peas, five thick slabs of blue cheese, and maybe a snack for her brother Bob.
          We also need a small plastic snake and a big toy frog for the kids.
          She can scoop these things into three red bags, and we will go meet her Wednesday at the train station.
        </Text>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => recordAudio()}
            title="That's Me!"
            color="#1a9931"
            accessibilityLabel="Button to record voice to check for accent"
          />
        </View>
      </View>
    );
  }
}
