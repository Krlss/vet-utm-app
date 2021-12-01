import React, { memo } from 'react';
import {
    StyleSheet,
    KeyboardAvoidingView,
    View
} from 'react-native';


const Background = ({ children }) => {
    return (
        /* Contenedor padre */
        <View
            style={styles.background}
        >
            {/* Formulario */}
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                {children}
            </KeyboardAvoidingView>
        </View>
    );
}

export default memo(Background);


const styles = StyleSheet.create({
    background: {
        alignItems: 'center',
        height: '100%',
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'white'
    },
    container: {
        flex: 1,
        padding: 20,
        width: '100%',
        height: '100%',
        maxWidth: 340,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
})