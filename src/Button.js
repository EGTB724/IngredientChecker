import  * as React from 'react';
import  {EnTypo } from '@expo/vector-icons';
import { StyleSheet, Text, Pressable , View } from 'react-native';

export default function HelperButton({title, onPress, icon, color}) {
    console.log(title)
    return (    
        <View style={styles.buttonContainer}>

        <Pressable onPress={onPress} style={styles.button}>
          <Text>{title}</Text>
        </Pressable>
        </View>
        );
}

const styles = StyleSheet.create({
    buttonContainer: {
        paddingTop: 12,
      },
      button: {
        elevation: 8,
        backgroundColor: "#E6896B",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12
        // color: "E6896B"
      },
      appButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
      }
})