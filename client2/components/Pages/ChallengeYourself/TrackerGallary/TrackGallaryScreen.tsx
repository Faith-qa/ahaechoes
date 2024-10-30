import s from './styles';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'; // Replace with actual icons if using different icon libraries
import { LinearGradient } from 'expo-linear-gradient';
import ProfilePicContainer from "@/components/profilePic";
const TrackGallaryScreen:React.FC = () =>{
    return (
        <View style={s.container}>
            <View >
            {/* Header */}
            <View style={s.header}>
                <Text style={s.headerText}>Today</Text>
                <TouchableOpacity onPress={()=>alert("feature coming")}>
                <MaterialCommunityIcons name="dots-horizontal" size={24} color="black" />
                </TouchableOpacity>
            </View>
            {/* Date Selector */}
            <View style={s.dateContainer}>
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day, index) => (
                    <View
                        key={index}
                        style={[
                            s.dateItem,
                            index === 2 && s.selectedDate // Marking 'Tu' as selected
                        ]}
                    >
                        <Text style={[s.dateText, index === 2 && s.selectedDateText]}>
                            {day}
                        </Text>
                        <Text style={[s.dateNumber, index === 2 && s.selectedDateText]}>
                            {27 + index}
                        </Text>
                    </View>
                ))}
            </View></View>

            {/* No Tasks Illustration */}
            <View style={s.illustrationContainer}>
                {/*<Image
                    source={require('./path_to_your_image.png')} // replace with the path to the actual image
                    style={s.illustrationImage}
                />*/}
                <Text style={s.noTasksText}>No tasks yet.</Text>
                <Text style={s.subText}>Tap '+' to start schedule planning with Me+!</Text>
            </View>

            {/* Floating Action Button */}
            <TouchableOpacity style={s.fab}>
                <MaterialCommunityIcons name="plus" size={24} color="white" />
            </TouchableOpacity>

            {/* Promo Banner */}
            <LinearGradient colors={['#B270E0', '#7748DA']} style={s.promoBanner}>
                <View style={s.promoContent}>
                    <FontAwesome name="gift" size={24} color="orange" />
                    <Text style={s.promoText}>One-time offer for you...</Text>
                </View>
                <TouchableOpacity style={s.openButton}>
                    <Text style={s.openButtonText}>OPEN</Text>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    );

}

export default TrackGallaryScreen;