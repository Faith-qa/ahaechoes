import React, { useEffect, useState } from "react";
import { View } from "react-native";

interface NewProps {
    visible: boolean,
    onClose: () => void
}

const myJournals: React.FC<NewProps> =({visible})=>{
    const [opened, setopened] = useState(false)

    useEffect(()=>{
        setopened(visible);
    }, [visible]);

    

    return(<View></View>);

}

