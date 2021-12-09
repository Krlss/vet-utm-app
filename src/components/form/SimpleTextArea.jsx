import React from "react";
import { View, StyleSheet, TextInput } from 'react-native';


const SimpleTextArea = ({ onChangeText, value, length, placeholder, numberOfLines }) => { 
    return (
        <View style={{ paddingHorizontal: 20 }}>
            <View >
                <TextInput
                    placeholder={placeholder}
                    maxLength={length}
                    onChangeText={onChangeText}
                    value={value}
                    style={Styles.Input}
                    multiline={true}
                    numberOfLines={numberOfLines}
                />
            </View>
        </View>
    );
}

export default SimpleTextArea;


const Styles = StyleSheet.create({
    Input: {
        padding: 5,
        width: '100%',
        borderWidth: .5,
        borderColor: 'grey',
        borderRadius: 5,
        marginTop: 5,
        height: 100,
        textAlignVertical: 'top'
    }
});