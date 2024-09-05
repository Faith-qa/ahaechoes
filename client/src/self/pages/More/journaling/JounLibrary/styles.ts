import {StyleSheet} from "react-native";
import {Dimensions} from "react-native";


const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    item: {
        flex: 1,
        margin: 2,
        width: width / 3,
        height: 150// Square grid items
    },
    image: {
        width: width/3 - 30,
        height: 150,
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