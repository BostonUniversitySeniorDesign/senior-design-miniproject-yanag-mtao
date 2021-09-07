import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect }  from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Camera} from 'expo';
import { BarCodeScanner } from 'expo-barcode-scanner';

const Greeting = (props) => {
    return (
        <View style={styles.center}>
          <Text>Hello {props.name}!</Text>
        </View>
      );
}



export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
      (async () => {
        try {
          console.log(BarCodeScanner.requestPermissionsAsync);
          const { status } = await BarCodeScanner.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        }
        catch(e) {
            console.log('Catch an errors: ', e);
        }

      })();
    }, []);

  const handleBarCodeScanned = ({ type, data }) => {
      setScanned(true);
      alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };


  if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>Hello world!</Text>
      <Greeting name='Yana' />
      <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}

      <StatusBar style="auto" />
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
