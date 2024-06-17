import AsyncStorage from '@react-native-async-storage/async-storage';

export const retrieveToken = async()=>{
    try{

        const token = await AsyncStorage.getItem('userToken');
        if (token !== null){
            return token
        }
        throw new Error('no token')
    }catch(err: any){
        throw new Error(err);
    }
}