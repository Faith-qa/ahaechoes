import React, { useState, useEffect } from "react";
import { FlatList, Text, TouchableOpacity, ActivityIndicator, View } from "react-native";
import { Card } from "@rneui/base";
import s from './styles';

interface Note {
    date: string;
    note: string;
}

interface NewProps {
    processNotes: () => Promise<Note[]>; // Ensure processNotes is async
    displaySelectedNote: (note: Note) => void;
}

const TextLibScreen: React.FC<NewProps> = ({ processNotes, displaySelectedNote }) => {
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);
    const [notes, setNotes] = useState<Note[]>([]); // Initialize with an empty array
    const [loading, setLoading] = useState<boolean>(true); // Loading state

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const fetchedNotes = await processNotes(); // Fetch notes asynchronously
                setNotes(fetchedNotes); // Set notes state
            } catch (error) {
                console.error("Error fetching notes:", error);
            } finally {
                setLoading(false); // Stop loading when data is fetched
            }
        };

        fetchNotes(); // Fetch the notes when the component mounts
    }, [processNotes]);

    const truncateNote = (note: string) => {
        return note.length > 255 ? note.substring(0, 100) + '...' : note;
    };

    const renderNoteItem = ({ item }: { item: Note }) => (
        <TouchableOpacity onPress={() => displaySelectedNote(item)}>
            <Card containerStyle={s.card}>
                <Text style={s.title}>{item.date}</Text>
                <Text style={s.text}>{truncateNote(item.note)}</Text>
            </Card>
        </TouchableOpacity>
    );

    // Display a loading spinner while notes are being fetched
    if (loading) {
        return (
            <View style={s.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Loading notes...</Text>
            </View>
        );
    }

    // Display message when no notes are available
    /*if (notes.length== 0) {
        return <Text>No notes available</Text>;
    }*/

    return (
        <FlatList
            data={notes}
            renderItem={renderNoteItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
        />
    );
};

export default TextLibScreen;
