import {useState} from "react";
import {useDispatch} from "react-redux";
//import {AppDispatch} from "../../../../../store/store";
import {Modal, TouchableOpacity, View, Text} from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';
import s from './styles';
import TypeTextScreen from "./TypeTextScreen";
import React from "react";
//import {updateAlbum} from "../../../../../store/journals/journals.action";
interface NewProps {
    onTextVisible: boolean,
    onTextClose: () => void
}
const TextJournCont: React.FC<NewProps>=({
    onTextVisible,
    onTextClose
                                         })=>{
    const [text, setText] = useState("")
    const [exit, setExit]= useState(false)
    const [title, setTitle] = useState('')
    //handle cancel

    //const dispatch = useDispatch<AppDispatch>();
    const onCancelSave = () => {
        reset()
        onTextClose()
    }
    const handleSubmit = async() => {
        try {

            //await dispatch(updateAlbum({name: title, filetype: "textFile", content: text}));
            reset();
            onTextClose();
           // onTextClose();
        }catch(err){
            console.error(err)
        }

    }
    const reset = () => {
        setText('');
        setExit(false);

    }

    const exitDelete = (exit: boolean) => {
        return(<Modal
            visible={exit}
            animationType="fade"
            transparent={true}
        ><View style={[s.exitModal, {alignSelf:"flex-end", marginTop: 80}]}>
            <TouchableOpacity onPress={()=> {onCancelSave()}}>
                <Icon name="delete"size={24} color="#000"/>
            </TouchableOpacity></View></Modal>)

    }
    //handle submit
    //handle text input
    //handle file name

    
    return (
        <Modal
            visible={onTextVisible}
            animationType={"fade"}
        >
            <TypeTextScreen onSubmit={handleSubmit}
                            title={title}
                            setTitle={setTitle}
                            text={text}
                            setText={setText}
                            onCancelSave={onCancelSave}
                            exit={exit}
                            setExit={setExit}
                            exitDelete={exitDelete(exit)}/></Modal>
)
}

export default TextJournCont;