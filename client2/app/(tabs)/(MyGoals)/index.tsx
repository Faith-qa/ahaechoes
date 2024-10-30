import TrackerGallaryCont from "@/components/Pages/ChallengeYourself/TrackerGallary";

import { GestureHandlerRootView } from 'react-native-gesture-handler';

const MyGoalsScreen:React.FC = () => {
    return(
        <GestureHandlerRootView>
            <TrackerGallaryCont/>
        </GestureHandlerRootView>
    )
}
export default MyGoalsScreen;