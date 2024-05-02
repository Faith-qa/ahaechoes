import { SafeAreaView, Text, View,StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";

const PostScreen: React.FC = () =>{
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <View style={styles.cont2}>
                    <TouchableOpacity>
                        <Image source={{uri: 'https://images.unsplash.com/photo-1585102651425-8caf7848e44b?q=80&w=2962&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}} style={styles.image}/>
                    </TouchableOpacity>
                    <Text style={styles.txt}>New Thread</Text>
                </View>
            </View>
            <View></View>

        </SafeAreaView>
    )

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",

    },
    cont2:{
        width: "100%",
        flexDirection: "row",
        alignItems: "center",

    },
    image: {
        width: 20,
        height: 20,
    },
    txt:{
        //paddingLeft: 4,
        fontSize: 20,
        color: "black",
        fontWeight: "bold"
    }

})