import {StyleSheet} from "react-native";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: '#F3E9FF',
        paddingTop: 80,
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
        fontSize: 12,
        color: '#B3B3B3',
    },
    dateNumber: {
        fontSize: 16,
        color: '#B3B3B3',
    },
    selectedDate: {
        backgroundColor: '#D0B3FF',
        borderRadius: 20,
        padding: 5,
    },
    selectedDateText: {
        color: '#7748DA',
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
        bottom: 120,
        backgroundColor: '#7748DA',
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
});
export default styles