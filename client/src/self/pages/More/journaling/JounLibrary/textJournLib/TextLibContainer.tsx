import {isTextFile} from "../../../../../../store/journals/utils";
import * as FileSystem from 'expo-file-system';
import TypeTextScreen from "../../textJoun/TypeTextScreen";
import {useEffect, useState} from "react";
import TextLibScreen from "./TextLibScreen";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../../../../store/store";
import {getMediaJournals} from "../../../../../../store/journals/journals.action";
interface Note {
    date: string;
    note: string;
}
const TextLibContainer:React.FC = () => {
    const [vieCard, setViewCard] = useState(false);
    const[notes, setNotes] = useState<Note[]>()
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    const dispatch = useDispatch<AppDispatch>()
    const [rawNotes, setRawNotes] = useState<string[]>()


    useEffect(() => {
        dispatch(getMediaJournals()).then((action) => {
            // Check if the action is fulfilled and contains the data
            if (getMediaJournals.fulfilled.match(action)) {
                // Set the state with the actual data
                setRawNotes(action.payload);
            } else {
                // Handle the rejected case or other statuses if necessary
                console.error('Failed to fetch journals');
            }
        });
    }, []);
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

    const processRawnotes = async() => {

        let Notes: any[] | ((prevState: Note[] | undefined) => Note[] | undefined) | undefined = []
        if (rawNotes === undefined)
            return
        for(var i = 0; i < rawNotes.length; i++){
            if (isTextFile(rawNotes[i])){
                var note = await handleTextUri(rawNotes[i])
                if (note){
                    Notes.push()
                }
            }

        }
        setNotes(Notes)


    }

    // handle text crude or update
    const updateText = () => {

    }

    // generate selected notes from file url
    const generateNotes = () => {


    }



    // view selected note
    const displaySelectedNote = (Note: any) =>{
        return(
            <TypeTextScreen onSubmit={updateText} title={Note.date} setTitle={setTitle} text={Note.note} setText={setText}  exit={vieCard} setExit={exitCard}/>
        )
    }






    // @ts-ignore
    return(<TextLibScreen displaySelectedNote={displaySelectedNote} notes={notes}/>)
}

export default TextLibContainer;