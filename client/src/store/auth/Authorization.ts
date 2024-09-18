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

async function getSpotifyToken(code: string, myurl: string, mysecret: string, myid: string): Promise<void> {
    try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                'grant_type': 'authorization_code',
                'code': code,
                'redirect_uri': myurl,
                'client_secret': mysecret,
                'client_id': myid,
            }).toString(),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        const token = result.access_token; // Assuming the access token is in the result

        // Remove old token if it exists
        const existingToken = await AsyncStorage.getItem("spotifyToken");
        if (existingToken !== null) {
            await AsyncStorage.removeItem("spotifyToken");
        }

        // Store new token
        await AsyncStorage.setItem("spotifyToken", token);
        console.log("New token stored:", token);
    } catch (error) {
        console.error('Error fetching Spotify token:', error);
    }
}

export const retrieveSpotifyToken = async()=>{
    try{

        const token = await AsyncStorage.getItem('spotifyToken');
        if (token !== null){
            return token
        }

    }catch(err: any){
        throw new Error(err);
    }
}