import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements'
import { theme } from '../../core/theme';
const TitleAndButton = ({ title, optional, onPress, children, disabled }) => {
    return (
        <View style={Styles.container}>
            <View style={{ marginBottom: 10 }}>
                <Text style={Styles.Text}>
                    {title}
                </Text>
                <Text>{optional}</Text>
            </View>
            {children}
            <View style={{ alignItems: 'flex-end' }}>
                <TouchableOpacity disabled={disabled} style={Styles.button} onPress={onPress}>
                    <Icon name='chevron-right' size={30} color='#333' />
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
        backgroundColor: theme.colors.All,
        height: 50,
        width: 150,
        borderRadius: 10,
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