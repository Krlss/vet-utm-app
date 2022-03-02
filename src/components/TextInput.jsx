import React, { memo, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput as Input } from 'react-native-paper';
import { theme } from '../core/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TextInput = ({ errorText, maxLength, keyboardType, type, show, onPress, ...props }) => {

    const [pshow, setpshow] = useState(show);

    return (
        <View style={styles.container}>
            <Input
                style={styles.input}
                activeUnderlineColor='black'
                mode="flat"
                secureTextEntry={!pshow ? true : null}
                right={type ? <Input.Icon name={pshow ? 'eye' : 'eye-off'} onPress={() => setpshow(!pshow)} /> : null}
                keyboardType={keyboardType ? keyboardType : null}
                maxLength={maxLength}
                {...props}
            />
            {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginVertical: 2,
    },
    input: {
        backgroundColor: theme.colors.surface,
        borderColor: 'green'
    },
    error: {
        fontSize: 14,
        color: theme.colors.error,
        paddingHorizontal: 4,
        paddingTop: 4,
    },
});

export default memo(TextInput);