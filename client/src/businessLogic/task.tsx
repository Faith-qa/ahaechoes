import AsyncStorage from "@react-native-async-storage/async-storage";

const sendDatatoLocalStorage = async (data: any) => {
    //send data to local storage

    try {
        await AsyncStorage.setItem('formdata', JSON.stringify(data));
        console.log('FORM data set to storage')
        /**TO DO: Implement send data to database */

    } catch(error){
        console.log(error)
    }
}

export default sendDatatoLocalStorage;