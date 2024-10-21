import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container:{
        position: "relative",
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'flex-start',
        paddingTop: "20%",
        //justifyConten: 'center',
        //margin: 20,
        padding:10,
        //gap: 10,
        //marginBottom: "80%",
        //height: "100%"
        //alignSelf: "flex-start"

    },
    XContainer: {
        display: "flex",
        justifyContent: "flex-end",
        //alignItems: "center",
        gap: 10,
        alignSelf: "center",
        padding: 20,

    },
    image:{
        width: 70,
        height: 70,
        flexShrink:0,
        borderRadius: 70,
        padding: 20,
        //alignSelf: "flex-start"
    },
    gtext:{
        flexDirection: 'row', // inline-flex equivalent
        padding: 4,
        alignItems: 'flex-start',
        justifyContent: 'flex-start', // align-items equivalent for main axis
        gap: 8,
        //color: '#FFF',
        fontFamily: 'Raleway_400Regular',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '400',
        // padding: 10,
        //  lineHeight: 25,
    },
    videoCont:{
        width: "35%",
        height: 315,
    },
    video:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: 200,
        height: 50,
        //borderBlockColor: "brown",
        borderWidth: 1,
        borderRadius: 20,
        padding: 10,
        margin: 10,
        shadowColor: 'rgba(255, 255, 255, 0.14)',
        shadowOffset:{
            width: 0,
            height: 16
        }}
})
export default styles;