import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, GestureResponderEvent } from 'react-native'
import React from 'react'

type ButtonProps = {
    title: string
    onPress?: (event: GestureResponderEvent) => void
    disabled?: boolean
    loading?: boolean
    style?: object
    textStyle?: object
}

const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    disabled = false,
    loading = false,
    style,
    textStyle,
}) => {
    return (
        <TouchableOpacity
            style={[styles.button, (disabled || loading) && styles.disabled, style]}
            onPress={onPress}
            activeOpacity={0.7}
            disabled={disabled || loading}
        >
            {loading ? (
                <ActivityIndicator color="#fff" />
            ) : (
                <Text style={[styles.text, textStyle]}>{title}</Text>
            )}
        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        width: '100%',
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    disabled: {
        opacity: 0.6,
    },
    text: {
        color: '#fff',
        fontSize: 16,
    },
})