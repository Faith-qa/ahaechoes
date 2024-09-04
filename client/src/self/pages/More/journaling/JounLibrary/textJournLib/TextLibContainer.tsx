import {createDirectory, isTextFile} from "../../../../../../store/journals/utils";
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
        const dirUri = await createDirectory();
        const asset = `${dirUri}/${fileUri}`
        const fileInfo = await FileSystem.getInfoAsync(asset)
        // read uri
        try {
            console.log("mama i am here hello", fileInfo.uri)
           const note =  await FileSystem.readAsStringAsync(fileInfo.uri, {encoding: FileSystem.EncodingType.UTF8});
            console.log("mama i made it",note)
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
                console.log("this is a note,", note)
                if (note){
                    Notes.push(note)
                }
            }

        }
        console.log("these are notes", Notes)
        return Notes;



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
    return(<TextLibScreen displaySelectedNote={displaySelectedNote} processNotes={processRawnotes}/>)
}

export default TextLibContainer;