import { Image, StyleSheet, Button, View } from "react-native";
import React, { useState } from 'react';
import { AutoFocus, Camera } from 'expo-camera';

import HelperButton from './Button';
import { IconButton, Colors } from 'react-native-paper';


const ImageContainer = ({image, setImage, onSubmit}) => {
    // const [image, setImage] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [camera, setCamera] = useState(null);

   

    const takePicture = async () => {
      
          if(camera){
            const data = await camera.takePictureAsync(null);
            //console.log(data.uri)
            setImage(data.uri)
      
          }
        }

	return (
    <View style={styles.container}>
      {!image ? (<><View style={styles.cameraContainer}>
        <Camera 
          ref={ref => setCamera(ref)} 
          style={styles.camera} 
          type={type} 
          ratio={'1:1'} 
        />
      </View>
      <IconButton
      icon="camera"
      color="#E6896B"
      size={50}
      onPress={() => takePicture()}
      />
      </>)
: (
       <>
       <View style={styles.cameraContainer}>
         <Image source={{uri: image}} style={{flex: 1}}/>
         <View style ={styles.footer}>
         <IconButton
          icon="reload"
          color="#E6896B"
          size={50}
          onPress={() => setImage()}
          />
          <IconButton
          icon="arrow-right-circle"
          color="#E6896B"
          size={50}
          onPress={() => onSubmit()}
          />
          </View>
     
      </View>
        
      </>
      )}
      </View>
	);
};

export default ImageContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
      },
    camera: {
        flex: 1,
      },
      cameraContainer: {
        flex: 1,
        marginTop: 10,
        aspectRatio: 1,

        // alignItems: 'center'

      },
      footer: {
        margin: 10,
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center'
      },
      buttonContainer: {
        paddingTop: 12,
      },
      button: {
        flex: 0.1,  
        borderRadius: 20,
        alignSelf: 'flex-end',
        alignItems: 'center',
      },
});
