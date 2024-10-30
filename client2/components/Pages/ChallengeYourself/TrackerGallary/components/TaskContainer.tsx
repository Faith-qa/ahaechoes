import {useState} from "react";
import {FlatList, TouchableOpacity, View,Text,Alert} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import { Swipeable } from 'react-native-gesture-handler';
import s from '../styles';
import TaskDetailsModal from "@/components/Pages/ChallengeYourself/TrackerGallary/components/TaskDetailsModal";
interface Task {
    id: number;
    title: string;
    isCompleted: boolean;
}

interface NewProps{
    challenges:Task[]
}
const TaskContainer:React.FC<NewProps> = ({challenges})=> {
    const [tasks, setTasks] = useState<Task[]>(challenges);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null); // State for selected task
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false); // State for modal visibility


    const openTaskDetails = (task: Task) => {
        setSelectedTask(task);
        setIsModalVisible(true);
    };
    // CloseTaskDetails

    const closeTaskDetails = ()=>{
        setIsModalVisible(false);
    }
    // Toggle task completion
    const toggleTaskCompletion = (id: number) => {
        setTasks(tasks.map(task => task.id === id ? {...task, isCompleted: !task.isCompleted} : task));
    };
    // Handle Copy action
    const handleCopy = (task: Task) => {
        Alert.alert("Copy", `Task "${task.title}" copied!`);
    };

    // Handle Delete action
    const handleDelete = (id: number) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    // Render swipeable actions
    const renderLeftActions = (task: Task) => (
        <View style={s.leftActionContainer}>
            {/*<TouchableOpacity style={s.actionButton} onPress={() => handleCopy(task)}>
                <MaterialCommunityIcons name="content-copy" size={24} color="black" />
                <Text style={s.actionText}>Copy</Text>
            </TouchableOpacity>*/}
            <TouchableOpacity style={[s.actionButton, s.deleteButton]} onPress={() => handleDelete(task.id)}>
                <MaterialCommunityIcons name="delete" size={24} color="white" />
                <Text style={s.actionTextWhite}>Delete</Text>
            </TouchableOpacity>
        </View>
    );


    return (
        <View style={s.mainTaskListCont}>
            {/* Task List */}
            <FlatList
                data={tasks}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => (
                    <Swipeable renderRightActions={() => renderLeftActions(item)}>
                    <TouchableOpacity style={[s.taskContainer, item.isCompleted && s.taskCompleted]} onPress={()=>openTaskDetails(item)}>
                        <View style={s.taskTextContainer}>
                            {/*<Text style={s.taskTimeText}>All day</Text>*/}
                            <Text style={item.isCompleted ?s.strikethrough : s.taskTitle}>{item.title}</Text>
                        </View>
                        <TouchableOpacity onPress={() => toggleTaskCompletion(item.id)}>
                            <MaterialCommunityIcons
                                name={item.isCompleted ? "check-circle" : "checkbox-blank-circle-outline"}
                                size={24}
                                color={item.isCompleted ? "green" : "black"}
                            />
                        </TouchableOpacity>
                    </TouchableOpacity></Swipeable>
                )}
            />
            <TaskDetailsModal isModalVisible={isModalVisible} selectedTask={selectedTask} closeModal={closeTaskDetails}/>

        </View>
    )

}

export default TaskContainer;