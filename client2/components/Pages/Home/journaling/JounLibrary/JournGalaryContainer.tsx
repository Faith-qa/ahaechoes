import {Dimensions} from "react-native";
import {useEffect, useState} from "react";
//import {getMediaJournals} from "../../../../../store/journals/journals.action";
import {getMediaItemUri, handleTextUri} from "./jounLibUtils";
//import {isAudioFile, isTextFile} from "../../../../../store/journals/utils";
import JounGalaryScreen from "./JounGalaryScreen";
import {useDispatch} from "react-redux";
//import {AppDispatch} from "../../../../../store/store";

interface MediaItem  {
    index: any,
    type: 'txt'|'audio'|'video';
    uri: any;
}

const {width}  = Dimensions.get('window');
const numColumns = 3
const JournGalaryContainer:React.FC=()=>{

    const [rowJourns, setRawJourns] = useState<string[]>()
    //const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        /*dispatch(getMediaJournals()).then((action) => {
            // Check if the action is fulfilled and contains the data
            if (getMediaJournals.fulfilled.match(action)) {
                // Set the state with the actual data
                setRawJourns(action.payload);
            } else {
                // Handle the rejected case or other statuses if necessary
                console.error('Failed to fetch journals');
            }
        });*/


    }, []);


    // process journals to retrieve uri
    const processJourns = async() =>{
        console.log("raw journals", rowJourns)
        if (rowJourns == undefined)
            return
        let ProcessedJourns:MediaItem[] = []

        /*for (var i = 0; i < rowJourns.length; i++) {
            let dateOnly: string | number | Date = i; // Declare dateOnly outside and assign i as a default value
            const fileUri = await getMediaItemUri(rowJourns[i]);
            const llist = fileUri.split('-')
            if(llist.length > 1) {
                const timestampList = llist.at(-1)
                if(timestampList !== undefined){
                    const timestamp = Number(timestampList.split('.').at(0))
                    const newDate = new Date(timestamp);
                    dateOnly = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate()).toISOString().split('T')[0];
                    console.log("hello this is how the date looks like", dateOnly)

                }

            }
            console.log("list my woman here", llist)



            /*if (isTextFile(rowJourns[i])){
                let item = {
                    index: dateOnly,
                    type: 'txt',
                    uri: await handleTextUri({index:dateOnly, type: 'txt', uri: fileUri})
                }
                ProcessedJourns.push(item as MediaItem)
            } else if(isAudioFile(rowJourns[i])){
                let item = {
                    index: dateOnly,
                    type: 'audio',
                    uri: fileUri
                }
                ProcessedJourns.push(item as MediaItem)
            }else{
                let item = {
                    index: dateOnly,
                    type: 'video',
                    uri: fileUri
                }
                ProcessedJourns.push(item as MediaItem)

            }
        }*/
        return ProcessedJourns;
    }



    return(<JounGalaryScreen processJourns={processJourns}/>)
}
export default JournGalaryContainer;