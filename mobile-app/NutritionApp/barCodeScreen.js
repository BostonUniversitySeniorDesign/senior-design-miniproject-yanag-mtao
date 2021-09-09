import React, { useState, useEffect }  from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function BarCodeScreen() {
  const [hasPermission, setHasPermission]  = useState(null);
  const [scanned, setScanned, showScanner] = useState(false);


  useEffect(() => {
      (async () => {
        try {
          console.log(BarCodeScanner.requestPermissionsAsync);
          const { status } = await BarCodeScanner.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        }
        catch(e) {
            console.log(e);
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

  return(
  <>
    <BarCodeScanner
      onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      style={StyleSheet.absoluteFillObject}
    />
    <Button title={'Tap to Scan'} onPress={() => setScanned(false)} />
  </>
  );

};