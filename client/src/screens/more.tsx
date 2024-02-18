import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Takevideo from "../pages/More/journaling/videojournaling";

const More: React.FC = () => {
    return (
        <View style={styles.container}>
            <View style={styles.imageCont}>
            <Image source={{uri: 'https://images.pexels.com/photos/18340828/pexels-photo-18340828/free-photo-of-man-in-traditional-north-american-indigenous-clothing.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load'}}
        style={styles.image} />

            <Text>
                Hi,
            </Text>
            <Takevideo/>
            </View>
        </View>
    );
    
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'rgba(255, 253, 244, 0.96)',
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
    
    },
    image:{
        width: 70,
        height: 70,
        flexShrink:0,
        borderRadius: 70,
        padding: 10,
    },
    imageCont:{
        position: "absolute",
        alignSelf:"flex-start",
        marginBottom: "80%",
        padding: 20,

        
    }
})

export default More;