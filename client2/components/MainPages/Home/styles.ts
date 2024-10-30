import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',

    },
    image:{
        width: 100,
        height: 100,
        flexShrink:0,
        //borderRadius: 70,
        padding: 10,
    },
    imageCont:{
        position: "absolute",
        alignSelf:"flex-start",
        marginBottom: "80%",
        padding: 20,


    },
    jContainer :{
        width: 300,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection:"row",
        margin: 10,
        padding: 10,
        gap: 35

    },
    jText:{
        fontSize: 16,
        fontWeight: "bold",
        color: "#4D4117",
        //fontFamily: "Raleway_400Regular"

    },
    mcont:{
        width: 100,
        height: 50,
        borderRadius: 20,
        backgroundColor:"#DFBD43",
        alignItems: "center",
        padding: 12
    }
})

export default styles;