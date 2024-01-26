import React, { useState, useEffect } from "react";
import { Modal, View, StyleSheet, Pressable, Text, } from "react-native";
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface NewProps {
    visible: boolean,
    onClose: () => void
}

const New: React.FC<NewProps> = ({visible, onClose}) => {
   const [isvisible, setIsvisible] = useState(false);

   useEffect(()=>{
    //set initial state
    setIsvisible(visible)
   }, [visible])



   if(!isvisible)  {
    return null;
   }
  
   
    return(
            <Modal 
            animationType="slide"
            visible={isvisible}
            transparent={true}>
                <View style={styles.mcontainer}>
                <Pressable style={styles.XContainer} onPress={()=> onClose()} >
                <Feather name="x-circle" size={24} color="black"/>
                </Pressable>
                <View style={styles.content}>
                <MaterialCommunityIcons name="clipboard-text-clock-outline" size={24} color="black" style={styles.clipicon} />
                <View style={styles.contentText}>
                    <View style={styles.titleCont}>
                        <Text style={styles.title}>What would you like to do today?</Text>
                    </View>
                    <View style={styles.messageCont}>
                        <Text style={styles.message}>Lorem ipsum dolor sit amet, consectetur
                         adipiscing elit. Cras quis risus non eros venenatis elementum. </Text>
                    </View>

                </View>

                </View>
                <Pressable style={styles.taskCont}><Text style={styles.taskText}>New Task</Text></Pressable>
                <Pressable style={styles.taskCont}><Text style={styles.taskText}>New Goal</Text></Pressable>

                </View>

                

            </Modal>

        
    )
};

const styles = StyleSheet.create({
    container:{
        alignItems: "flex-end",
        display: "flex"

    },
mcontainer: {
    flex: 0,
    //flexDirection: 'column',
    alignItems: 'center',
    alignSelf: "center",
    justifyContent: "center",
    padding: 35,
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    gap: 35,
    borderRadius: 12,
    backgroundColor: "#DFBD43"
},
XContainer: {
    display: "flex",
    justifyContent: "flex-end",
    //alignItems: "center",
    gap: 10,
    alignSelf: "stretch"
},
xbutton: {
    //display: "flex",
    //width: 20,
    height: 14,
    //flexDirection: "column",
    justifyContent: "center",
    flexShrink: 0
},
content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,



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
    gap: 5,
    //color: "rgba(0, 0, 0, 0.50)"
},
titleCont: {
    width: 260,
    height: 22
},
title:{
    color: 'rgba(0, 0, 0, 0.50)', // Default color or use your variable if it's dynamic
    textAlign: 'center',
    fontFamily: 'SF Pro Text',
    fontSize: 17,
    fontStyle: 'normal',
    fontWeight: 'bold',
    lineHeight: 22,
    letterSpacing: -0.073,
},
messageCont:{
    width: 260,
    height: 60
},
message: {
    color: 'rgba(0, 0, 0, 0.50)', // Default color or use your variable if it's dynamic
    textAlign: 'center',
    fontFamily: 'SF Pro Text',
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: -0.23,
},
taskCont:{
    display: 'flex',
    width: 260,
    height: 44,
    paddingVertical: 12,
    paddingHorizontal: 91,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: "#4D4117"
},
taskText:{
    color: '#FFF',
    fontFamily: 'SF Pro Text',
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 20,
    letterSpacing: -0.23,
}
})

export default New;