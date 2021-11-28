import React from 'react';
import { View, Text, Dimensions, Button, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Icon } from 'react-native-elements'


const ItemList = ({ children, title, onPress }) => {
    return (
        <TouchableOpacity style={Styles.containter} onPress={onPress}>
            <View style={Styles.containerIconText}>
                {children}
                <Text style={Styles.Text}>{title}</Text>
            </View>
            <Icon name='chevron-right' size={20} color='#333' />
        </TouchableOpacity>
    );
}

export default ItemList;

const Styles = StyleSheet.create({
    containter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomColor: 'grey',
        borderBottomWidth: 0.5
    },
    containerIconText: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    Text: {
        fontSize: 16,
        marginLeft: 10,
        fontWeight: '800'
    }
});