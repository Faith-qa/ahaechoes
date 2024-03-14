 
const initialState = {
    isJournalSection: false,
    isNewJournal : false,
    recordVideo: false,
    recordAudio: false,
    newJournal: []

}

type ActionType = {
    type: string,
    payload: any 
}
export default (state = initialState, {type, payload}: ActionType)=>{
    switch(type){
        case "OPEN_JOURNAL_SECTION":
            return {...state, isJournalSection: payload}
        case "CLOSE_JOURNAL_SECTION":
            return {...state, isJournalSection: payload}
        case "START_VIDEO":
            return {...state, recordVideo: payload}
        case "STOP_VIDEO":
            return {...state, recordVideo: payload}
    }
        return state
}       


