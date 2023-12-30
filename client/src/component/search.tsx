import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather"


const Search: React.FC = () =>{

    const handlesearch = () => {
        //implement handle search function
    };

    return(
        <View style={styles.container}>
            <FeatherIcon name="search" style={styles.searchIcon}/>
            <TextInput placeholder="Search" style={styles.input} />
            
        </View>
    )
};


const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width:360,
        height:40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.40)',
        backgroundColor: '#FFF',
        shadowColor: 'rgba(255, 255, 255, 0.14)',
        shadowOffset: {
          width: 0,
          height: 16,
        },
        shadowRadius: 24,
        shadowOpacity: 1,
        elevation: 1, // For Android shadow
        padding: 10, // Adjust padding based on your design
      },
    searchIcon: {
        width: 15,
        height: 15,
        flexShrink: 0,
        color: "#DFBD43"

    },
    input: {
        flex: 1,
        height: 40,
        color: 'rgba(0, 0, 0, 0.50)',
        fontFamily: 'Rubik',
        fontSize: 9,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 10,
        paddingLeft: 10,
        paddingBottom: 25
        
        
        
         // Adjust the line height based on your design
    
    }
})

export default Search;