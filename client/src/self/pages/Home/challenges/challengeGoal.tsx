import {Modal, View, Text, StyleSheet, TouchableOpacity} from "react-native";
import React, {useState} from "react";
import WheelPicker from "./testwheelpicker";
import {setOpenCommitment} from "../../../../store/goals/newGoal.slice";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../../store/store";
import {
    DailyChallenge,
    monthlyChallenge,
    newChallengeRegistration,
    weeklyChallenge
} from "../../../../store/goals/newChallenge.action";

interface NewProps {
    onDataCollected: (data: newChallengeRegistration) => void
}

const CommitToChallenge: React.FC<NewProps> = ({onDataCollected}) => {
    const {openCommitment, color} = useSelector((state: RootState)=> state.goal)
    const [selectGoal, setSelectGoal] = useState(7);
    const dispatch = useDispatch<AppDispatch>()
    const wheelItems = [7, 14, 21, 56, 75]

    const renderWheel = () => (
        <WheelPicker items={wheelItems} onValueChange={value => setSelectGoal(value)}/>
    )

    const handleCollectedData = ()=>{
        let collectedData:{[key:string]: any} = {};
        collectedData['commitForDays'] = selectGoal;

        onDataCollected(collectedData as DailyChallenge | weeklyChallenge | monthlyChallenge)
        console.log(collectedData)
        dispatch(setOpenCommitment(false))
    }

    return(<Modal transparent={true} animationType={"slide"} visible={openCommitment}>
        <View style={styles.mainCont}>
            <View  style={styles.container}>
                <TouchableOpacity style={styles.exit} onPress={handleCollectedData}><Text>X</Text></TouchableOpacity>
            <Text style={styles.text}>I choose to commit to this goal for: <Text style={{fontWeight:"bold"}}>{selectGoal}</Text> Days</Text>
            <View style={styles.wheelCont}>
                {renderWheel()}
                <Text style={styles.text}>days</Text>
            </View>
        </View></View>
    </Modal>)

}

const styles = StyleSheet.create({
    mainCont:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    container:{
        width: 300,
        minHeight: 100,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        //flex: 1,
        //TBA
    },
    wheelCont:{
        flexDirection: "row",
        margin: 40,
       // padding: 10,
        borderTopWidth: 1,
        borderBottomWidth: 1
        //height: 40,
        //width: 40

    },
    text:{
        padding: 10,
        paddingTop: 30,
        fontSize: 17,

    },
    exit:{
        alignSelf: "flex-start",
        paddingHorizontal: 10,

    },

})
export default CommitToChallenge;