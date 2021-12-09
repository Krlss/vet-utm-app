import React from "react";
import { View, StyleSheet, TextInput, Text } from 'react-native';


const SimpleInput = ({ placeholder, onChangeText, value, keyboardType, error, length }) => {
    return (
        <View style={{ paddingHorizontal: 20 }}>
            <View >
                <TextInput maxLength={length} keyboardType={`${keyboardType ? keyboardType : 'default'}`} onChangeText={onChangeText} value={value} style={[Styles.Input, { borderColor: error ? 'red' : 'gray' }]} placeholder={placeholder} />
                {
                    error ? <Text style={{ fontSize: 13, color: 'red' }}>{error}</Text> : null
                }
            </View>
        </View>
    );
}

export default SimpleInput;


const Styles = StyleSheet.create({
    Input: {
        padding: 5,
        width: '100%',
        borderWidth: .5,
        borderRadius: 5,
        marginTop: 5
    }
});