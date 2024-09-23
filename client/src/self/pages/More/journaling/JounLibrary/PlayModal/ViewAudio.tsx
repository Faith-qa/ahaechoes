import React, { useState } from "react";
import { Audio } from "expo-av";
import {Modal, Pressable, StyleSheet, View} from "react-native";
import {Card} from "@rneui/base";
import {Feather} from "@expo/vector-icons";
import {Button} from "@rneui/themed";

interface NewProp {
    audiourl: string,
    openAudio: boolean,
    onClose: ()=> void
}
const ViewAudio: React.FC<NewProp> = ({audiourl, onClose, openAudio}) => {
    // Set the initial state type to Audio.Sound | null
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const playAudio = async () => {
        try {
            const { sound: newSound } = await Audio.Sound.createAsync(
                { uri: audiourl }
            );
            // Set the new sound object
            setSound(newSound);
            await newSound.playAsync();
        } catch (error) {
            console.log('Error loading or playing sound', error);
        }
    };

    return (
        <Modal
            visible={openAudio}
        >
            <Card>
                <Pressable style={styles.XContainer} onPress={()=> onClose}>
                <Feather name="x-circle" size={24} color="black"/>
            </Pressable>
                <View style={styles.container}>
                    <Button title={isPlaying ? 'Pause' : 'Play'} onPress={playAudio} />
                </View>
            </Card>
        </Modal>

    );

};
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
    },
    XContainer: {
        display: "flex",
        justifyContent: "flex-end",
        //alignItems: "center",
        gap: 10,
        alignSelf: "center",
        padding: 20,

    },

});

export default ViewAudio;
