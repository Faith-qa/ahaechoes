import {isTextFile} from "../../../../../../store/journals/utils";
import * as FileSystem from 'expo-file-system';
import TypeTextScreen from "../../textJoun/TypeTextScreen";
import {useState} from "react";
import TextLibScreen from "./TextLibScreen";

interface Note {
    date: string;
    note: string;
}
const TextLibContainer:React.FC = () => {
    const [vieCard, setViewCard] = useState(false);
    const[notes, setNotes] = useState<Note[]>()
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")

    const exitCard = () => {
        setViewCard(false)
    }


    // handle text view
    const handleTextUri = async(fileUri: string) => {

        if (!isTextFile(fileUri)){
            return
        }
        // read uri
        try {
           const note =  await FileSystem.readAsStringAsync(fileUri, {encoding: FileSystem.EncodingType.UTF8});

           let Note = {
               date:"test",
               note: note
           }
           return Note;
        }catch(err: any){
            throw new Error(err.message)
        }
    }


    // handle text crude or update
    const updateText = () => {

    }

    // generate selected notes from file url



    // view selected note
    const displaySelectedNote = (Note: any) =>{
        return(
            <TypeTextScreen onSubmit={updateText} title={Note.date} setTitle={setTitle} text={Note.note} setText={setText}  exit={vieCard} setExit={exitCard}/>
        )
    }






    // @ts-ignore
    return(<TextLibScreen displaySelectedNote={displaySelectedNote} notes={notes}/>)
}