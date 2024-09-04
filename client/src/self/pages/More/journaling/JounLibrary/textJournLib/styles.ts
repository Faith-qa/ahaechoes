import {Dimensions, StyleSheet} from "react-native";

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
        padding: 10,
    },
    card: {
        backgroundColor: '#333',
        padding: 15,
        marginBottom: 15,
        borderRadius: 10,
        width: width / 2 - 20
    },
    title: {
        color: '#fff',
        fontSize: 16,
        marginBottom: 10,
    },
    subtitle: {
        color: '#aaa',
        fontSize: 14,
        marginTop: 10,
    },
    text: {
        color: '#fff',
        fontSize: 14,
    },
});

export default styles;
