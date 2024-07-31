import React from 'react';
import { TextStyle, StyleProp } from 'react-native';
import { colors } from '../styling';
import s from './styles';

interface NewProps {
    IconSet: any;
    size?: number;
    enabled?: boolean;
    color?: string;
    disabledColor?: string;
    iconStyle?: StyleProp<TextStyle>; // Ensure StyleProp is used
    iconName: string;
    onPress?: () => void;
}

const IconButton: React.FC<NewProps> = ({
                                            IconSet,
                                            size = 16,
                                            iconName,
                                            enabled = true,
                                            color = colors.iconButton.tint,
                                            disabledColor = colors.iconButton.disabled,
                                            iconStyle,
                                            onPress,
                                        }) => {
    return (
        <IconSet
            onPress={onPress}
    style={[s.icon, size && { fontSize: size }, iconStyle]}
    color={enabled ? color : disabledColor}
    name={iconName}
    />
);
};

export default IconButton;
