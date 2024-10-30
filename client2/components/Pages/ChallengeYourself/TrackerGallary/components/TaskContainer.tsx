import {useState} from "react";
import {FlatList, TouchableOpacity, View,Text} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import s from '../styles';
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

    // Toggle task completion
    const toggleTaskCompletion = (id: number) => {
        setTasks(tasks.map(task => task.id === id ? {...task, isCompleted: !task.isCompleted} : task));
    };

    return (
        <View style={s.mainTaskListCont}>
            {/* Task List */}
            <FlatList
                data={tasks}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => (
                    <TouchableOpacity style={[s.taskContainer, item.isCompleted && s.taskCompleted]}>
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
                    </TouchableOpacity>
                )}
            />

        </View>
    )

}

export default TaskContainer;