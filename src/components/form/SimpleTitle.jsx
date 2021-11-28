import React from "react";
import { View, Text, StyleSheet } from 'react-native';


const SimpleTitle = ({ title }) => {
    return (
        <View style={{ paddingHorizontal: 20 }}>
            <Text style={Styles.title}>
                {title}
            </Text>
        </View>
    );
}

export default SimpleTitle;

const Styles = StyleSheet.create({
    title: {
        fontSize: 25,
        fontWeight: '700',
        marginTop: 5
    },
});