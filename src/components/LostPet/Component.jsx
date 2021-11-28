import React from 'react';

import { View, StyleSheet } from 'react-native';
import Value from './Value';
import ImageIcon from './ImageIcon';
import Title from './Title';

const Component = ({ source, title, value, truncate, values }) => {
    return (
        <View style={Styles.container} >
            {source ? <ImageIcon source={source} /> : null}
            <View>
                {title ? <Title title={title} /> : null}
                {value ? <Value truncate={truncate} value={value} /> : null}
                {values ? values.map((e, index) => <Value key={index} value={e} />) : null}
            </View>
        </View >
    );
}

export default Component;

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
    },
});