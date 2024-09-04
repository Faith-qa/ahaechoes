import React, {useState, useEffect} from "react";
import {FlatList, ScrollView, Text, TouchableOpacity} from "react-native";
import { Card } from "@rneui/base";
import s from './styles';

interface Note {
    date: string;
    note: string;
}

interface NewProps {
    Notes: Note[];

    displaySelectedNote: (note: Note)=> void;


}


const TextLibScreen: React.FC<NewProps> = ({
                                               Notes,
                                           displaySelectedNote}) => {
    const [selectedNote, setSelectedNote] = useState<Note | null>(null)
    const [notes, setNotes] = useState<Note[]>(Notes)



    const truncateNote = (note: string) => {
        return note.length > 255 ? note.substring(0, 100) + '...': note;
    }
    const renderNoteItem = ({item}: {item: Note}) => (

        <TouchableOpacity onPress={()=> displaySelectedNote(item)}>
        <Card  containerStyle={s.card}>
            <Text style={s.title}>{item.date}</Text>
            <Text style={s.text}>{truncateNote(item.note)}</Text>
        </Card></TouchableOpacity>


    )
    if (!notes || notes.length === 0) {
        return <Text>No notes available</Text>;
    }

    console.log("hello ", notes)
    // handle selectedNote
    return (
        <FlatList
            data={notes}
            renderItem={renderNoteItem}
            keyExtractor={(item, index)=> index.toString()}
            numColumns={2}
            contentContainerStyle={s.container}
        />

    );
};

export default TextLibScreen;
