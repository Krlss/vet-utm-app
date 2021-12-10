import axios from 'axios';
import { BackHandler } from 'react-native';

const api_url = 'http://192.168.100.101/api';

export const getAnimalsLost = async () => {
    try {
        return await axios.get(`${api_url}/petsLost`).
            then(e => e.data).
            catch(e => e.response.status);
    } catch (error) { console.log(error) }
}

export const getOneAnimalLost = async (petID) => {
    try {
        const res = await axios.get(`${api_url}/getPetByID/${petID}`);
        if (res.status === 200) return res.data;
        if (res.status === 500 || res.status === 404) return res.status;
    } catch (error) { console.log(error); }
}

export const getProvinces = async () => {
    try {
        const res = await axios.get(`${api_url}/provinces`);
        if (res.status === 200) return res.data;
        if (res.status === 500 || res.status === 404) return res.status;
    } catch (error) { console.log(error); }
}

export const getCantonsByProvince = async (provinceID) => {
    try {
        const res = await axios.get(`${api_url}/provinces/cantons/${provinceID}`);
        if (res.status === 200) return res.data;
        if (res.status === 500 || res.status === 404) return res.status;
    } catch (error) { console.log(error); }
}


export const createLostPetunknown = async (data) => {
    try {
        // BackHandler.addEventListener('hardwareBackPress', () => true) //Bloquea el botón para ir hacía atras
        const res = await axios.post(`${api_url}/upload/petUnknown`, data);
        console.log(res);
        //BackHandler.removeEventListener('hardwareBackPress', () => true) //Lo activa de nuevo.
        if (res.status === 200) return true;
        return false;
    } catch (error) { console.log(error); }
}

export const Login = async (data) => {
    try {
        return await axios.post(api_url + '/login', data).
            then(e => e.data).
            catch(e => e.response.status);

    } catch (error) {
        console.log(error);
    }
}

export const Register = async (data) => {
    try {
        return await axios.post(api_url + '/register', data).
            then(e => e.data).
            catch(e => e.response.status);
    } catch (error) {
        console.log(error);
    }
}

export const getUserProfile = async (data) => {
    console.log(data);
    try {
        return await axios.get(api_url + `/users/${data.user_id}`, {
            headers: {
                'Authorization': `${data.api_token}`
            }
        }).then(e => e.data).
            catch(e => e.response.status);
    } catch (error) {
        console.log(error);
    }
}

export const updatedDataUser = async (data, token) => {
    let config = {
        headers: {
            'Authorization': token
        }
    }
    try {
        return await axios.put(api_url + `/updatedUser`, data, config)
            .then(e => e.data).
            catch(e => e.response.status);
    } catch (error) {
        console.log(error);
    }
}

export const updatedDataPet = async (data, token) => {
    let config = {
        headers: {
            'Authorization': token
        }
    }
    try {
        return await axios.put(api_url + `/updatedPet`, data, config)
            .then(e => e.data).
            catch(e => e.response.status);
    } catch (error) {
        console.log(error);
    }
}

export const CreatedNewPet = async (data, token) => {
    console.log(data);
    let config = {
        headers: {
            'Authorization': token
        }
    }
    try {
        return await axios.post(api_url + `/createdPet`, data, config)
            .then(e => e.data).
            catch(e => e.response.status);
    } catch (error) {
        console.log(error);
    }
}
