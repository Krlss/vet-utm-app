import axios from 'axios';

export const getAnimalsLost = async () => {
    try {
        const res = await axios.get(`http://192.168.100.101:5000/api/pets`);
        if (res.status === 200) return res.data.pets
        if (res.status === 500 || res.status === 404) return res.status;
    } catch (error) { console.log(error) }
}

export const getOneAnimalLost = async (petID) => {
    try {
        const res = await axios.get(`http://192.168.100.101:5000/api/pets/${petID}`);
        if (res.status === 200) return res.data.pet;
        if (res.status === 500 || res.status === 404) return res.status;
    } catch (error) { console.log(error); }
}

export const getProvinces = async () => {
    try {
        const res = await axios.get(`http://192.168.100.101:5000/api/provinces`);
        if (res.status === 200) return res.data;
        if (res.status === 500 || res.status === 404) return res.status;
    } catch (error) { console.log(error); }
}

export const getCantonsByProvince = async (provinceID) => {
    try {
        const res = await axios.get(`http://192.168.100.101:5000/api/provinces/${provinceID}`);
        if (res.status === 200) return res.data;
        if (res.status === 500 || res.status === 404) return res.status;
    } catch (error) { console.log(error); }
}