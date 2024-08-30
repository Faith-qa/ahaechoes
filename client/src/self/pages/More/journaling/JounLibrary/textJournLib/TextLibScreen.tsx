import React from "react";
import {FlatList, ScrollView, Text} from "react-native";
import { Card } from "@rneui/base";
import s from './styles';

interface Note {
    date: string;
    note: string;
}

interface NewProps {
    notes: Note[];
}
const truncateNote = (note: string) => {
    return note.length > 255 ? note.substring(0, 100) + '...': note;
}
 const renderNoteItem = (item:any) => (
     <Card  containerStyle={s.card}>
         <Text style={s.title}>Text note {item.date}</Text>
         <Text style={s.text}>{truncateNote(item.note)}</Text>
     </Card>


 )
const TextLibScreen: React.FC<NewProps> = ({ notes }): JSX.Element => {
    return (
        <FlatList
            data={notes}
            renderItem={renderNoteItem}
            keyExtractor={(item, index)=> index.toString()}
            numColumns={2}
            contentContainerStyle={s.container}
        />
        /*<ScrollView style={s.container}>
            {notes.map((note, index) => (
                <Card key={index} containerStyle={s.card}>
                    <Text style={s.title}>Text note {note.date}</Text>
                    <Text style={s.text}>{truncateNote(note.note)}</Text>
                </Card>
            ))}
        </ScrollView>*/
    );
};

export default TextLibScreen;
