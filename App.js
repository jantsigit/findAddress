import { StyleSheet, StatusBar, View, Text, TextInput, Button, Keyboard } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import React, { useState } from 'react';
import Constants from 'expo-constants';

export default function App() {
  const initial = {
    latitude: 60.200692,
    longitude: 24.934302,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221
  };


  const [alue, setAlue] = useState(initial);
  const [osoite, setOsoite] = useState('');
  

  const haeKoordinaatit = async (osoite) => {
    const KEY = 'fvSS5MejOK5EKbER6OwnTer4eZuqm82s'
    const url = `http://www.mapquestapi.com/geocoding/v1/address?key=${KEY}&location=${osoite}`;

    try{
      const response = await fetch(url);
      const data = await response.json();

      const {lat, lng} = data.results[0].locations[0].latLng
      console.log(lat, lng);
      setAlue({...alue, latitude: lat, longitude: lng})

    } catch (error) {
      console.error('API call failed. Did you provide a valid API Key?', error.message);
    }
    Keyboard.dismiss();

  }

  return (
    <View style={styles.container}>

      <MapView
        style={styles.map}
        Region={alue}
      >
        <Marker
          coordinate={alue}
          title='Haaga-Helia'
        />
      </MapView>



      <TextInput
        style={styles.input}
        placeholder='OSOITE'
        value= {osoite}
        onChangeText={text => setOsoite(text)} />



      <View style={styles.button}>
      <Button title="Näytä kartalla" onPress={() => haeKoordinaatit(osoite)} />
      </View>

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
    width: "100%",
    height: "100%"
  },
  input: {
    height: 75
  },
  button: {
    height: 150,
    width: '100%'
  }
});