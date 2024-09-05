import {Dimensions, StyleSheet} from "react-native";

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        padding: 10,
    },
    loadingContainer: {
        flex: 1,                     // Takes up the full available space
        justifyContent: 'center',     // Centers vertically
        alignItems: 'center',         // Centers horizontally
        padding: 20,                  // Optional padding for some space around the content
    },
    card: {
        backgroundColor: '#333',
        padding: 15,
        marginBottom: 15,
        margin: 10,
        borderRadius: 10,
        width: width / 2 - 20,
        height: 150,  // Set a fixed height for the card
        justifyContent: "space-between",
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
    button: {
        padding: 10,
        backgroundColor: '#6200ee',
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    progressBar: {
        height: 10,
        borderRadius: 5,
    },
    time: {
        marginTop: 5,
        fontSize: 14,
        color: '#555',
    },
});

export default styles;
