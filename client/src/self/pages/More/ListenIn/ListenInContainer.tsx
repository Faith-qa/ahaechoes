import React, { useState } from "react";
import { Audio } from "expo-av";

interface NewProp {
    audiourl: string
}
const ListenInContainer: React.FC<NewProp> = ({audiourl}) => {
    // Set the initial state type to Audio.Sound | null
    const [sound, setSound] = useState<Audio.Sound | null>(null);

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
        <>
            {/* You can add a button to trigger playAudio */}
        </>
    );
};

export default ListenInContainer;
