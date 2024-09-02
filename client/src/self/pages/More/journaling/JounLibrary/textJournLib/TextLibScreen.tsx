import React, {useState} from "react";
import {FlatList, ScrollView, Text, TouchableOpacity} from "react-native";
import { Card } from "@rneui/base";
import s from './styles';

interface Note {
    date: string;
    note: string;
}

interface NewProps {
    notes: Note[];
    displaySelectedNote: (note: Note)=> void;


}


const TextLibScreen: React.FC<NewProps> = ({
                                               notes,
                                           displaySelectedNote}) => {
    const [selectedNote, setSelectedNote] = useState<Note | null>(null)
    const truncateNote = (note: string) => {
        return note.length > 255 ? note.substring(0, 100) + '...': note;
    }
    const renderNoteItem = ({item}: {item: Note}) => (
        <TouchableOpacity onPress={()=> displaySelectedNote(item)}>
        <Card  containerStyle={s.card}>
            <Text style={s.title}>Text note {item.date}</Text>
            <Text style={s.text}>{truncateNote(item.note)}</Text>
        </Card></TouchableOpacity>


    )
    // handle selectedNote
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
