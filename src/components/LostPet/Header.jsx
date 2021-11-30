import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const HeaderLostPet = ({ name, id }) => {
    return (
        <View style={{ marginBottom: 20, flex: 1 }}>
            {
                name ?
                    <Text style={Styles.name}>{name}</Text> : null
            }
            {
                id ?
                    <Text style={Styles.id}>#{id}</Text> : null
            }
        </View>
    );
}

const Styles = StyleSheet.create({
    name: {
        fontSize: 35,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    id: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#777',
        textTransform: 'uppercase'
    },
});

export default HeaderLostPet;