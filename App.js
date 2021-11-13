import { StyleSheet, StatusBar, View, Text, TextInput, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import React, { useState } from 'react';

export default function App() {
  const region = {
    latitude: 60.200692,
    longitude: 24.934302,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221
  };

  const coordinates = {
    latitude: 60.201373,
    longitude: 24.934041
  };

  const [osoite, setOsoite] = useState('');
  const [koordinaatit, setKoordinaatit] = useState();

  const haeKoordinaatit = () => {
    fetch('http://api.exchangeratesapi.io/v1/latest?access_key=02c3d5d46666633de5b4773701289149&format=1')
    .then(response => response.json())
    .then(responseJson =>  setKoordinaatit(responseJson.items))
    .catch(error => { 
        Alert.alert('Error', error.message);
    });    
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={region}
      >
        <Marker
          coordinate={coordinates}
          title='Haaga-Helia'
        />
      </MapView>

      <TextInput style={{fontSize: 20, width: 200}} placeholder='' 
        onChangeText={text => setOsoite(text)} />

      <Button title="Näytä kartalla" onPress={''} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop:StatusBar.currentHeight,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    flex: 1,
    width: "100%",
    height: "100%"
  }
});