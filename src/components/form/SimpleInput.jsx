import React from "react";
import { View, StyleSheet, TextInput } from 'react-native';


const SimpleInput = ({ placeholder, onChangeText, value, keyboardType, length }) => {
    return (
        <View style={{ paddingHorizontal: 20 }}>
            <View >
                <TextInput maxLength={length} keyboardType={`${keyboardType ? keyboardType : 'default'}`} onChangeText={onChangeText} value={value} style={Styles.Input} placeholder={placeholder} />
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
        borderColor: 'grey',
        borderRadius: 5,
        marginTop: 5
    }
});