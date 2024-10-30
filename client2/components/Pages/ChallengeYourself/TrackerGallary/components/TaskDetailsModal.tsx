import {Modal, View, Text,TouchableOpacity } from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import s from '../styles'
interface Task {
    id: number;
    title: string;
    isCompleted: boolean;
}
interface NewProps{
    isModalVisible: boolean
    selectedTask: Task | null
    closeModal: ()=>void
}
const TaskDetailsModal:React.FC<NewProps> = ({isModalVisible,
                                             closeModal,
                                                 selectedTask}) => {
    return(
    <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={s.modalContainer}>
            <View style={s.modalContent}>
                <MaterialCommunityIcons name="flask-outline" size={24} color="green" />
                <Text style={s.taskTimeText}>All day</Text>
                <Text style={[s.taskTitle, selectedTask?.isCompleted && s.completedTaskTitle]}>
                    {selectedTask?.title}
                </Text>
                <Text style={s.taskDetailText}>Never repeat. No Reminder.</Text>
                <TouchableOpacity style={s.editButton} onPress={() => alert("Edit Task feature coming soon")}>
                    <Text style={s.editButtonText}>Edit Task</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() =>closeModal()} style={s.closeButton}>
                    <Text style={s.closeButtonText}>Close</Text>
                </TouchableOpacity>
            </View>
        </View>
    </Modal>
    )
}

export default TaskDetailsModal;