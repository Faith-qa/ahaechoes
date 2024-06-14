import React, { useState } from "react";
import { TouchableOpacity, View, StyleSheet, Text, Modal } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { resetError, setOpenErrorCard } from "../store/global/global.slice";

interface ErrorCardProps {
    message: any;
}

const ErrorCard: React.FC<ErrorCardProps> = ({ message }) => {
    const { openErrorCard } = useSelector((state: RootState) => state.globalState);
    const dispatch = useDispatch<AppDispatch>();

    const handleError = () => {
        dispatch(setOpenErrorCard(false));
        dispatch(resetError());
    };

    return (
        <Modal
            visible={openErrorCard}
            transparent={true} // Set transparency to true to allow modal to just cover the view it needs
            animationType="slide"
        >
            <View style={styles.modalContainer}>
                <View style={styles.errorCard}>
                    <TouchableOpacity style={styles.cross} onPress={handleError}>
                        <Text style={styles.textX}>X</Text>
                    </TouchableOpacity>
                    <Text style={styles.errorCardText}>{message}</Text>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: for darkened background effect
    },
    errorCard: {
        width: 300,
        minHeight: 100,
        padding: 20,
        backgroundColor: 'red',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cross: {
        position: "absolute",
        top: 10,
        right: 10,
        width: 30,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
        backgroundColor: '#ffffff', // For better visibility
    },
    textX: {
        color: "#365B6D",
        fontWeight: "bold",
        fontSize: 16,
    },
    errorCardText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "500",
        textAlign: 'center',
    }
});

export default ErrorCard;
