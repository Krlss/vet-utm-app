import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements'

const TitleAndButton = ({ title, optional, onPress }) => {
    return (
        <View style={Styles.container}>
            <View>
                <Text style={Styles.Text}>
                    {title}
                </Text>
                <Text>{optional}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
                <TouchableOpacity style={Styles.button} onPress={onPress}>
                    <Icon name='chevron-right' size={30} color='white' />
                </TouchableOpacity>
            </View>
        </View >
    );
}


export default TitleAndButton;


const Styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        width: '100%',
        paddingHorizontal: 20,
        marginTop: 10,
        maxWidth: 480,
    },
    button: {
        backgroundColor: '#333',
        height: 50,
        width: 150,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    Text: {
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'left'
    }
});