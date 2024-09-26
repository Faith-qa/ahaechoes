import {StyleSheet} from "react-native";
import {Dimensions} from "react-native";


export const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        width: 390,
        //paddingBottom:10,
        flexDirection: "column",
        alignItems: "flex-start",
        //padding: 10, // Start items from the left side
        //padding: 10,

    },
    item: {
        //flex: 1,
        //margin: 2,
        width: width / 3 ,
        height: 150,
        alignSelf: 'flex-start', // Align items to the start of the row
        //marginBottom: 20,

// Square grid items
    },
    image: {
        width: "100%",
        height: "100%",
    },
    audioCard: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'gray',
        width: '100%',
        height: '100%',
    },
    audioText: {
        color: 'white',
        marginTop: 10,
        fontSize: 16,
    },
});

export default styles;