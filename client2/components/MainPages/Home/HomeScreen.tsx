import s from './styles';
import {View, Text, TouchableOpacity, Pressable, Image, Alert,} from 'react-native'
import {Link} from "expo-router";

const HomeScreen: React.FC = () => {
    return(
        <View style={s.container}>
            <View style={s.imageCont}>

                <View style={s.jContainer}>
                    <Text style={[s.jText, {fontSize: 30, fontWeight: "normal"}]}>Your journals</Text>
                    <Link href={'/(tabs)/(Journals)'} asChild>
                    <Pressable style={s.mcont}>
                        <Text style={[s.jText, {alignSelf: "center"}]} >New Entry</Text>
                    </Pressable></Link>
                </View>
                {/*<MyJournals visible={openJournals} onClose={()=>closeJournalSection()}/>*/}
                <View style={s.jContainer}>
                    <Text style={[s.jText, {fontSize: 30, fontWeight:"normal"}]}>Get inspired...</Text>
                </View>
                <View style={[s.jContainer, {backgroundColor: "#019090", borderRadius: 10}]}>
                    <Text style={[s.jText, {fontSize: 20, fontWeight:"normal"}]}>Coffee chats with Amina</Text>
                    <Image source={{uri:'https://images.unsplash.com/photo-1585102651425-8caf7848e44b?q=80&w=2962&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}} style={s.image}/>
                </View>
                <TouchableOpacity onPress={()=>alert("feature coming")}>
                    <View style={[s.jContainer, {backgroundColor: "#BA4B41", borderRadius: 10, height: 125}]}>
                        <Text style={[s.jText, {fontSize: 20, fontWeight:"normal", }]}>Listen in, your weekly pod</Text>
                        <Image source={{uri: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}} style={s.image}/>
                    </View></TouchableOpacity>


                <View>

                </View>
            </View>
        </View>
    )
}

export default HomeScreen;