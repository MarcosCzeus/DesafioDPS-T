import React from "react";
import { StyleSheet, View } from "react-native";
import MapView from "react-native-maps";

export default function Home() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 13.7942, 
          longitude: -88.8965, 
          latitudeDelta: 0.5, 
          longitudeDelta: 0.5, 
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
