import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';

const { height } = Dimensions.get('window');
const ITEM_HEIGHT = 40;

interface WheelPickerProps {
    items: any[];
    onValueChange: (value: any) => void;
}

const WheelPicker: React.FC<WheelPickerProps> = ({ items, onValueChange }) => {
    const [selectedIndex, setSelectedIndex] = useState(Math.floor(items.length / 2));
    const scrollViewRef = useRef<ScrollView>(null);

    const onScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const index = Math.round(event.nativeEvent.contentOffset.y / ITEM_HEIGHT);
        setSelectedIndex(index);
        onValueChange(items[index]);
    };

    return (
        <View style={styles.container}>
            {/*<Text style={styles.text}>Every</Text>*/}
            <View style={[styles.pickerContainer]}>
                <ScrollView
                    ref={scrollViewRef}
                    showsVerticalScrollIndicator={false}
                    snapToInterval={ITEM_HEIGHT}
                    decelerationRate="fast"
                    onMomentumScrollEnd={onScrollEnd}
                >
                    {/*<View style={styles.spacer} />*/}
                    {items.map((item, index) => (
                        <View key={index} style={[styles.item, index === selectedIndex && styles.selectedItem]}>
                            <Text style={styles.itemText}>{item}</Text>
                        </View>
                    ))}
                    <View style={styles.spacer} />
                </ScrollView>
                {/*<View style={styles.overlay} />*/}
            </View>
            {/*<Text style={styles.text}>Days</Text>*/}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    text: {
        fontSize: 18,
        marginHorizontal: 10,
    },
    pickerContainer: {
        height: ITEM_HEIGHT * 3,
        width: 50,  // Adjust width to your need
        overflow: 'hidden',
        marginHorizontal: 10,
    },
    spacer: {
        height: ITEM_HEIGHT * 1.5,
    },
    item: {
        height: ITEM_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedItem: {
        backgroundColor: 'lightgray',
    },
    itemText: {
        fontSize: 18,
    },
    overlay: {
        position: 'absolute',
        top: ITEM_HEIGHT * 1.5,
        left: 0,
        right: 0,
        height: ITEM_HEIGHT,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'gray',
    },
});

export default WheelPicker;
