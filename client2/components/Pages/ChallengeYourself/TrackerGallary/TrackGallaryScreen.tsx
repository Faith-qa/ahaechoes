import s from './styles';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'; // Replace with actual icons if using different icon libraries
import { LinearGradient } from 'expo-linear-gradient';
import ProfilePicContainer from "@/components/profilePic";
import WeekCalendar from "@/components/Pages/ChallengeYourself/TrackerGallary/components/WeekCalendar";
import TaskContainer from "@/components/Pages/ChallengeYourself/TrackerGallary/components/TaskContainer";

interface Task {
    id: number;
    title: string;
    isCompleted: boolean;
}
const TrackGallaryScreen:React.FC = () =>{
    // Sample tasks for demonstration
    const initialTasks: Task[] = [
        { id: 1, title: 'test 10', isCompleted: false },
        { id: 2, title: 'test 9', isCompleted: true },
        { id: 3, title: 'test 6', isCompleted: false },
        { id: 4, title: 'test 7', isCompleted: false },
        { id: 5, title: 'test 5', isCompleted: false },
        { id: 6, title: 'test 10', isCompleted: false },
        { id: 7, title: 'test 9', isCompleted: true },
        { id: 8, title: 'test 6', isCompleted: false },
        { id: 9, title: 'test 7', isCompleted: false },
        { id: 10, title: 'test 5', isCompleted: false },

    ];
    return (
        <View style={s.container}>
            <WeekCalendar/>

            {/* No Tasks Illustration */}
            {initialTasks.length > 0 ? <TaskContainer challenges={initialTasks}/>
                :<View style={s.illustrationContainer}>
                {/*<Image
                    source={require('./path_to_your_image.png')} // replace with the path to the actual image
                    style={s.illustrationImage}
                />*/}
                <Text style={s.noTasksText}>No tasks yet.</Text>
                <Text style={s.subText}>Tap '+' to start schedule planning with Me+!</Text>
            </View>}

            {/* Floating Action Button */}
            <TouchableOpacity style={s.fab}>
                <MaterialCommunityIcons name="plus" size={24} color="white" />
            </TouchableOpacity>

            {/* Promo Banner */}
            {/*<LinearGradient colors={['#B270E0', '#7748DA']} style={s.promoBanner}>
                <View style={s.promoContent}>
                    <FontAwesome name="gift" size={24} color="orange" />
                    <Text style={s.promoText}>One-time offer for you...</Text>
                </View>
                <TouchableOpacity style={s.openButton}>
                    <Text style={s.openButtonText}>OPEN</Text>
                </TouchableOpacity>
            </LinearGradient>*/}
        </View>
    );

}

export default TrackGallaryScreen;