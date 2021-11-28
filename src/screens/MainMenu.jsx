import React from 'react';
import { List } from 'react-native-paper';

const MainMenu = ({ navigation }) => {
    return (
        <List.Section>
            <List.Item
                title="Perfil"
                left={props => <List.Icon {...props} icon='account' />}
                right={props => <List.Icon {...props} icon='chevron-right' />}
                onPress={() => navigation.navigate('UserProfileScreen')}
            />
            <List.Item
                title="Mi Mascota"
                left={props => <List.Icon {...props} icon="paw" />}
                right={props => <List.Icon {...props} icon='chevron-right' />}
                onPress={() => navigation.navigate('PetProfileScreen')}
            />
            <List.Item
                title="Configuraciones"
                left={props => <List.Icon {...props} icon="cog" />}
                right={props => <List.Icon {...props} icon='chevron-right' />}
                onPress={() => navigation.navigate('SettingsScreen')}
            />
            <List.Item
                title="Iniciar sesión"
                left={props => <List.Icon {...props} icon="login" />}
                right={props => <List.Icon {...props} icon='chevron-right' />}
                onPress={() => navigation.navigate('Login')}
            />
            <List.Item
                title="Cerrar sesión"
                left={props => <List.Icon {...props} icon="logout" />}
                right={props => <List.Icon {...props} icon='chevron-right' />}
                onPress={() => navigation.navigate('Register')}
            />
        </List.Section>
    );
}

export default MainMenu;