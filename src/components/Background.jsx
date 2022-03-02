import React, { memo } from 'react';
import {
    StyleSheet,
    KeyboardAvoidingView,
    ScrollView,
} from 'react-native';

const Background = ({ children }) => {
    return (
        <ScrollView keyboardShouldPersistTaps='handled' style={styles.background} contentContainerStyle={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
            <KeyboardAvoidingView style={styles.container} behavior="height">
                {children}
            </KeyboardAvoidingView>
        </ScrollView>
    );
}

export default memo(Background);


const styles = StyleSheet.create({
    background: {
        height: '100%',
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