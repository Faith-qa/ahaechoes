import React from "react";
import { Modal, View, StyleSheet, Pressable } from "react-native";
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const New: React.FC = () => {
    return(
        <View >
            <Modal style={styles.container}>
                <Pressable style={styles.XContainer}>
                <Feather name="x-circle" size={24} color="black" style={styles.xbutton} />
                </Pressable>
                <View style={styles.content}>
                <MaterialCommunityIcons name="clipboard-text-clock-outline" size={24} color="black" style={styles.clipicon} />
                <View></View>
                </View>


            </Modal>
        </View>

        
    )
};

const styles = StyleSheet.create({
container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 35,
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    gap: 35,
    borderRadius: 12,
    backgroundColor: "#FFF"
},
XContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 10,
    alignSelf: "stretch"
},
xbutton: {
    display: "flex",
    width: 20,
    height: 14,
    flexDirection: "column",
    justifyContent: "center",
    flexShrink: 0
},
content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12


},

clipicon: {
    display: 'flex',
    width: 40,
    height: 40,
    padding: 4,
    paddingTop: 2,
    paddingRight: 3,
    paddingBottom: 2,
    paddingLeft: 4,
    justifyContent: 'center',
    alignItems: 'center',
},
contentText: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 5
}
})

export default New;