import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';

import CheckBox from './src/CheckBox';
import ImageContainer from './src/Image';
import HelperButton from './src/Button';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  // const [image, setImage] = useState(null);
  // const [type, setType] = useState(Camera.Constants.Type.back);
  const [next, setNext] = useState(false);
  const [image, setImage] = useState(null);

  const [allergies, setAllergies] = useState(
    {milk: false, 
    eggs: false, 
    fish: false, 
    crustaceanShellfish : false, 
    treeNuts: false, 
    peanuts: false, 
    wheat: false, 
    soybeans: false  
  });

  const onSubmit = async () => {
    console.log(image);

    const keys = Object.keys(allergies);

    const filtered = keys.filter(function(key) {
        return allergies[key]
    });

    console.log("DSfhjd", filtered);
  };

useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);


if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <View>
      <Image source={require('./assets/icon1.png')} style={{ width: 60, height: 60 }} />
      </View>
      {!next ? (
      <View>
          <Text style={styles.text}>What type of food allergies do you have?</Text>
          <CheckBox
            onPress={() => setAllergies({ ...allergies, milk: !allergies.milk })}
            title="Milk"
            isChecked={allergies.milk} />
          <CheckBox
            onPress={() => setAllergies({ ...allergies, eggs: !allergies.eggs })}
            title="Eggs"
            isChecked={allergies.eggs} />
          <CheckBox
            onPress={() => setAllergies({ ...allergies, fish: !allergies.fish })}
            title="Fish"
            isChecked={allergies.fish} />
          <CheckBox
            onPress={() => setAllergies({ ...allergies, crustaceanShellfish: !allergies.crustaceanShellfish })}
            title="Crustacean shellfish"
            isChecked={allergies.crustaceanShellfish} />
          <CheckBox
            onPress={() => setAllergies({ ...allergies, treeNuts: !allergies.treeNuts })}
            title="Tree Nuts"
            isChecked={allergies.treeNuts} />
          <CheckBox
            onPress={() => setAllergies({ ...allergies, peanuts: !allergies.peanuts })}
            title="Peanuts"
            isChecked={allergies.peanuts} /><CheckBox
            onPress={() => setAllergies({ ...allergies, wheat: !allergies.wheat })}
            title="Wheat"
            isChecked={allergies.wheat} />
          <CheckBox
            onPress={() => setAllergies({ ...allergies, soybeans: !allergies.soybeans })}
            title="SoyBeans"
            isChecked={allergies.soybeans} />
        <HelperButton title="Next" onPress={() => setNext(true)} style={styles.button}>
          </HelperButton>
        </View>
        ) : <></>}

      {next ? <ImageContainer onSubmit={onSubmit} image={image} setImage={setImage}/> : <></>}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#696969",
    flex: 1,
    alignItems: 'center',
    // elevation: 10,
    // zIndex:20,
    marginTop: 40,
    alignContent: 'center'
  },
  text: {
    paddingTop: 40,
    fontSize: 16  ,
  },
  buttonContainer: {
    paddingTop: 12,
  },
  
});
