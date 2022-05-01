import React from 'react';

import { View, StyleSheet, ActivityIndicator } from 'react-native';
import Value from './Value';
import ImageIcon from './ImageIcon';
import Title from './Title';
import { Image } from 'react-native-elements';

const Component = ({ source, title, value, truncate, values, flex, uri }) => {
    return (
        <View style={[Styles.container, flex]} >
            {uri ? <Image source={uri} style={Styles.image} PlaceholderContent={<ActivityIndicator />} /> : null}
            {source ? <ImageIcon source={source} /> : null}
            <View style={{ flex: 1, }}>
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
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 20,
        marginRight: 1
    },
    image: {
        width: 50,
        height: 50,
        marginRight: 15,
    },
});