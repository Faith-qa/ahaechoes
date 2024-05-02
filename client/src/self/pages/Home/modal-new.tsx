import React, { useState, useEffect } from "react";
import { Modal, View, StyleSheet, Pressable, Text, } from "react-native";
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import NewTask from "./newTask";
import NewGoal from "./newGoal";

interface NewProps {
    visible: boolean,
    onClose: () => void
}

const New: React.FC<NewProps> = ({visible, onClose}) => {
   const [isvisible, setIsvisible] = useState(false);
   const [newtask, setIsnewtask] = useState(false);
   const [newGoal, setIsnewgoal] = useState(false);
   
   //new goal modal
   const openGoal = () =>{
    setIsnewgoal(true)
   }

   const closeGoal = () =>{
    setIsnewgoal(false);
   }


   const openTask = () =>{
    setIsnewtask(true);
   }

   const closeTask = () =>{
    setIsnewtask(false);
   }


   //check if it's task or goal

   // if goal open goal modal
   // if task open task modal


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
                <NewTask newtask={newtask} closeTask={closeTask} onClose={onClose}/>
                 <NewGoal newGoal={newGoal} closeGoal={closeGoal} onClose={onClose}/>

                <Pressable style={styles.taskCont} onPress={openTask} ><Text style={styles.taskText}>New Task</Text></Pressable>

                <Pressable style={styles.taskCont} onPress={openGoal}><Text style={styles.taskText}>New Goal</Text></Pressable>

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
    gap: 10,
    alignSelf: "stretch"
},
xbutton: {
    height: 14,
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
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 20,
    letterSpacing: -0.23,
}
})

export default New;