

export const openJournalSection= () =>{
    return {
        type: "OPEN_JOURNAL_SECTION",
        payload: true
    }
}
export const closeJournalSection= () =>{
    return {
        type: "CLOSE_JOURNAL_SECTION",
        payload: false
    }
}

export const startVideoRecording = () =>{
    return {
        type: "START_VIDEO",
        payload: true
    }
}

export const stopVideoRecording = () =>{
    return {
        type: "STOP_VIDEO",
        payload: false
    }
}
export const startAudioRecording = () => {
    
}