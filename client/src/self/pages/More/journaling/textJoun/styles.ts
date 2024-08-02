import {StyleSheet} from "react-native";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 20,
        backgroundColor: '#f8f8f8',
    },
    titleCont: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 12
    },
    mainTextCont: {
        paddingHorizontal: 10,
        paddingVertical: 12

    },
    iconRow: {
        flexDirection: 'row',
        width: 50,
        justifyContent: 'space-between',
        marginLeft: 10,
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
    exitModal:{
        margin: 30,
        backgroundColor: 'white',
        borderRadius: 20,
        marginLeft: 97,
        width: "30%",
        //height: 70,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
});

export default styles;