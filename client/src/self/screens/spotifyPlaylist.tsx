import WebView from "react-native-webview"
import {StyleSheet, View} from "react-native";

//automate

const PlayList: React.FC = () =>{
    return (
        <View style={styles.constainer}>
        <WebView style="border-radius:12px"
                src="https://open.spotify.com/embed/episode/6SfCthv5at7QoMM5LrPxT8?utm_source=generator" width="100%"
                height="152" frameBorder="0" allowFullScreen=""
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"></WebView>
        </View>
    )

}

const styles = StyleSheet.create({
    constainer:{
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default PlayList