import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';

export default function App() {
  // console.log('----', PouchDB);
  // TODO: try static maps api
  // const uri = `https://maps.googleapis.com/maps/api/staticmap?center=37.785834,-122.406417&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C37.785834,-122.406417&key=AIzaSyBzGz_R2SiahIlpMP4fKv5SLiQJk-AfV-o`;
  // console.log(uri);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log('location', location);
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      <Text>Route tracking app!!</Text>
      <Text>Co-ordinates {text}</Text>
      {/* <Image source={{ uri }} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
