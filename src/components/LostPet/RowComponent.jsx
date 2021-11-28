import React from "react";
import { View, StyleSheet } from 'react-native';

const TwoComponents = ({ children }) => {
    return (
        <View style={Styles.container}>
            {children}
        </View>
    );
}

const Styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    }
});

export default TwoComponents;