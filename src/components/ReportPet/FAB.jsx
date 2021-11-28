import React from 'react';
import { FAB, Portal, Provider } from 'react-native-paper';


const FABcomponent = ({ cam, gale }) => {
    const [state, setState] = React.useState({ open: false });

    const onStateChange = ({ open }) => setState({ open });

    const { open } = state;
    return (
        <Provider>
            <Portal>
                <FAB.Group
                    open={open}
                    color='white'
                    theme={{ colors: { accent: 'black' } }}
                    icon={open ? 'close' : 'image'}
                    actions={[
                        {
                            icon: 'camera',
                            label: 'Tomar fotos',
                            onPress: cam,
                            small: false,
                        },
                        {
                            icon: 'folder-image',
                            label: 'Seleccionar fotos',
                            onPress: gale,
                            small: false,
                        },
                    ]}
                    onStateChange={onStateChange}
                />
            </Portal>
        </Provider>
    );
}

export default FABcomponent;