import {StyleSheet} from "react-native";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#B4D8E2',
        paddingTop: 80,
        //padding: 5
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        //alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 10
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        alignSelf: 'flex-start'
    },
    dateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        padding: 5
    },
    dateItem: {
        alignItems: 'center',
    },
    dateText: {
        fontSize: 16,
        color: '#333333',
    },
    dateNumberCont:{
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 1,
        alignItems:"center",
        padding:2,

    },
    dateNumber: {
        fontSize: 16,
        color: '#333333',



    },
    selectedDate: {
        backgroundColor: '#365B6D',
        borderRadius: 20,
        width: 40,
        height: 60,
        paddingVertical: 3
        //padding: 5,
    },
    selectedDateText: {
        color: '#F5F9FA',
        fontWeight: 'bold',
    },
    illustrationContainer: {
        alignItems: 'center',
        marginTop: 40,
    },
    illustrationImage: {
        width: 150,
        height: 150,
    },
    noTasksText: {
        fontSize: 16,
        color: '#333',
        marginTop: 20,
        fontWeight: '500',
    },
    subText: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
    fab: {
        position: 'absolute',
        right: 30,
        bottom: 80,
        backgroundColor: '#365B6D',
        borderRadius: 30,
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    promoBanner: {
        position: 'absolute',
        bottom: 50,
        left: 20,
        right: 20,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
    },
    promoContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    promoText: {
        color: 'white',
        fontSize: 16,
        marginLeft: 10,
    },
    openButton: {
        backgroundColor: '#FFFFFF44',
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 10,
    },
    openButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    mainTaskListCont:{
        flex: 1,
        marginTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: "center",
        padding: 10,
        backgroundColor: '#F5F9FA',
        zIndex: -1
    },
    taskContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width:350,
        height: 72,
        flexShrink: 0,
        borderRadius: 20,
        borderWidth: 1,
        padding: 20,
        //backgroundColor: '#B4D8E2',
        margin: 10,
        marginVertical: 5,
    },
    taskCompleted: {
        backgroundColor: '#DFF7DF', // Different color for completed tasks
    },
    strikethrough: {
        color: 'black',
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: "400",
        textDecorationLine: "line-through",


    },
    taskTextContainer: {
        flex: 1,
        marginLeft: 10,
    },
    taskTimeText: {
        fontSize: 12,
        color: '#555',
    },
    taskTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
});
export default styles