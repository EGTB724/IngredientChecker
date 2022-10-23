import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import axios from "axios"

import CheckBox from './src/CheckBox';
import ImageContainer from './src/Image';
import HelperButton from './src/Button';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  // const [image, setImage] = useState(null);
  // const [type, setType] = useState(Camera.Constants.Type.back);
  const [next, setNext] = useState(false);
  const [image, setImage] = useState('');
  const [text, setText] = useState('');
  const [msg, setMessage] = useState('');

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

  const createFormData = (uri) => {
    const fileName = uri.split('/').pop();
    const fileType = fileName.split('.').pop();
    const formData = new FormData();
    
    formData.append('file', { 
      uri, 
      name: fileName, 
      type: `image/${fileType}` 
    });
    
    return formData;
  }

  const onSubmit = async () => {


    console.log(image);
    const formData = await createFormData(image);

    console.log("formData", formData);

    const keys = Object.keys(allergies);

    const filtered = keys.filter(function(key) {
        return allergies[key]
    });

    console.log("formData", filtered);

    axios.post( "http://10.65.124.238:8080/post_allergies",
      filtered
    )
      .then(function (response) {
        //handle success
        // console.log(rsesponse);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });

    axios({
      method: "post",
      url: "http://10.65.124.238:8080/get_text",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        //handle success
        setMessage(response.data.message)
        Alert.alert(response.data.message)
        // console.log(response.data.message);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });

   

    // allergies = Object.keys(allergies).filter(function(key) {
    //   return obj[key]
  };

useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  openAlert=()=>{
    alert('Alert with one button');
  }

if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Ingrediant Checker</Text>
        <Image source={require('./assets/icon1.png')} />
      </View>
      {!next ? (<View>
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

      {next ? <ImageContainer onSubmit={onSubmit} image={image} setImage={setImage}/>: <></>}
      

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 2,
    elevation: 10,
    zIndex:20,
    padding: 16,
    alignContent: 'center'
  },
  header: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerText: {
    padding: 10,
    fontSize: 20,
    color: "#009688"
  },
  text: {
    paddingTop: 40,
    fontSize: 16  ,
  },
  buttonContainer: {
    paddingTop: 12,
  },
  button: {
    elevation: 0,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }
});