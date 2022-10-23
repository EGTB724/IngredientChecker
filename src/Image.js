import { Image, StyleSheet, Button, View } from "react-native";
import React, { useState } from 'react';
import { Camera } from 'expo-camera';

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
      {!image && <View style={styles.cameraContainer}>
        <Camera 
          ref={ref => setCamera(ref)} 
          style={styles.camera} 
          type={type} 
          ratio={'1:1'} 
        />
      </View>
      }
      {!image && <IconButton
      icon="camera"
      color="#E6896B"
      size={20}
      onPress={() => takePicture()}
      />}
      
      {/* <HelperButton
        style={styles.button}
        title="Flip Image"
        >
      </HelperButton> */}
      {/* <IconButton
      icon="camera-reverse"
      color="#E6896B"
      size={20}
      onPress={() => {
        setType(
          type === Camera.Constants.Type.back
            ? Camera.Constants.Type.front
            : Camera.Constants.Type.back
        );
      }}
      /> */}
     
      
      {/* <HelperButton title="Take Picture"  /> */}
      {image && (<><View style={styles.cameraContainer}><Image source={{uri: image}} style={{flex:1}} />
   
      
      </View>
         <IconButton
         icon="arrow-right-circle"
         color="#E6896B"
         size={40}
         onPress={() => onSubmit()}
         />
         </>
      )}
      </View>
	);
};

export default ImageContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center'
      },
    camera: {
        marginTop: 20,
        flex: 1,
        aspectRatio: 1,
      },
      cameraContainer: {
        flex: 1,
        flexDirection: 'row'
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
