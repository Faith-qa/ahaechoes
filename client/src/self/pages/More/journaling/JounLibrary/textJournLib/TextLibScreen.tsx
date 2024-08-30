import React from "react";
import { ScrollView, Text } from "react-native";
import { Card } from "@rneui/base";
import s from './styles';

interface Note {
    date: string;
    note: string;
}

interface NewProps {
    notes: Note[];
}

const TextLibScreen: React.FC<NewProps> = ({ notes }): JSX.Element => {
    return (
        <ScrollView style={s.container}>
            {notes.map((note, index) => (
                <Card key={index} containerStyle={s.card}>
                    <Text style={s.title}>Text note {note.date}</Text>
                    <Text style={s.text}>{note.note}</Text>
                </Card>
            ))}
        </ScrollView>
    );
};

export default TextLibScreen;
