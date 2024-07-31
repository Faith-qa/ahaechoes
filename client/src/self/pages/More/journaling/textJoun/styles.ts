import {StyleSheet} from "react-native";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 20,
        backgroundColor: '#f8f8f8',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    icon: {
        width: 30,
        height: 30,
    },
    notebook: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#fff',
        padding: 20,
        position: 'relative',
    },
    input: {
        flex: 1,
        fontSize: 16,
        lineHeight: 24,
        textAlignVertical: 'top',
        padding: 0,
        margin: 0,
    },
    feather: {
        width: 40,
        height: 40,
        position: 'absolute',
        bottom: 10,
        right: 10,
    },
});

export default styles;