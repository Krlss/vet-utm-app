import moment from 'moment';
import 'moment/locale/es'
moment.locale('es')

export const emailValidator = (email) => {
    const re = /\S+@\S+\.\S+/;

    if (!email || email.length <= 0) return 'Correo es requerido.';
    if (!re.test(email)) return 'Ooops! formato del correo incorrecto.';

    return false
};

export const emailformat = (email) => {
    const re = /\S+@\S+\.\S+/;
    if (!re.test(email)) return 'Ooops! formato del correo incorrecto.';
    return false
}

export const deleteItemArr = (arr, index) => {
    arr = arr.filter(function (i) { return i.url !== index });
    /* console.log(arr) */
    return arr;
}


export const passwordValidator = (password) => {
    if (!password || password.length < 8) return 'La contraseña debe tener mínimo 8 carácteres.';
    if (!password || password.length <= 0) return 'Contraseña es requerida.';

    return false
};

export const nameValidator = (name) => {
    if (!name || name.length <= 0) return 'Nombre es requerido.';

    return false
};

export const requiredValidator = (string, countryside) => {
    if (!string || string.length <= 0) return `${countryside} es requerido.`;
    return false
}

export const last_nameValidator = (string) => {
    const arr = string.split(' ');
    if (!string || string.length <= 0) return `Apellidos es requerido.`;
    if (arr.length === 1) return 'Son dos apellidos.';
    if (arr.length > 2) return 'Son solo dos apellidos.';
    return false
}

export const CedulaValidator = (string) => {
    const te = /[^0-9]/g;
    if (!string || string.length < 10) return `La cedula o RUC debe tener mínimo 10 carácteres.`;
    if (!string || string.length <= 0) return `La cedula es requerido.`;
    if (te.test(string)) return 'Cedula incorrecta';
    return false
}

export const addressValidator = (string) => {
    if (!string || string.length <= 0) return `La dirección es requerida.`;
    return false
}

export const phoneValidator = (string) => {
    const te = /[^0-9]/g;
    if (!string || string.length <= 0) return `El télefono es requerido.`;
    if (te.test(string)) return 'télefono incorrecta';
    return false
}

export const onlyNumber = (string = '') => {
    return string.replace(/[^0-9]/g, '');
}

export const iconType = (specie) => {
    switch (specie) {
        case 'perro':
        case 'Perro':
        case 'dog':
        case 'Dog':
        case 'canine':
            return require('../assets/img/dog.png')
        case 'gato':
        case 'Gato':
        case 'Cat':
        case 'cat':
        case 'feline':
            return require('../assets/img/cat.png')
        case 'm':
        case 'M':
        case 'Macho':
        case 'macho':
            return require('../assets/img/men.png')
        case 'F':
        case 'f':
        case 'Hembra':
        case 'hembra':
            return require('../assets/img/woman.png')
        case 'owner_pet':
            return require('../assets/img/owner_pet.png')
        case 'affection':
            return require('../assets/img/affection.png')
        case 'logo-utm':
            return require('../assets/img/logo-utm.png')
        case 'logo':
            return require('../assets/img/logo.png')
        case 'user-default':
            return require('../assets/img/user-default.png')
        case 'bg-image':
            return require('../assets/img/bg_auth.png')
        case 'lost':
            return require('../assets/img/lost.png')

        default:
            return require('../assets/img/unknown.png');
    }
}


export const nameStringPrayer = (string) => {
    return string.charAt(0).toUpperCase() + string.substr(1).toLowerCase();
}

export const sexAnimal = (string) => {
    if (!string) return 'unknown'
    return string === 'M' ? 'Macho' : 'Hembra'
}

export const castratedAnimal = (string) => {
    return string ? 'Castrado' : 'Sin castrar';
}

export const birthToAge = (date) => {
    
    return moment(date, "YYYYMMDD").fromNow().replace('hace ', '');
};


export const deleteSpace = (string = '') => {
    return string.trim();
}

export const namePet = (string) => {
    if (!string || string.length <= 0) return `El nombre de la mascota es requerido.`;
    return false
}
export const race = (string) => {
    if (!string || string.length <= 0) return `La raza de la mascota es requerido.`;
    return false
}

export const birthPet = (string) => {
    if (!string || string.length <= 0) return `La fecha de la mascota es requerido.`;

    var re = /^\d{4}[-]\d{2}[-]\d{2}$/
    if (!re.test(string)) return 'El formato no es válido';

    let result = moment(string, 'YYYY-MM-DD', false).isValid();
    if (!result) return 'El formato no es válido';

    let birth = moment(string);
    let toDay = moment(new Date());
    if (birth.diff(toDay, 'days') >= 0) return 'Fecha incorrecta';
    return false;

    /* try {
        var fechaf = string.split("-");
        if (fechaf.length < 3) return 'El formato no es correcto';
        if (!fechaf[0] || !fechaf[1] || !fechaf[2]) return 'El formato no es correcto'

        var year = fechaf[0];
        var month = fechaf[1];
        var day = fechaf[2];

        var now = new Date(Date.now());
        var nowYear = now.getFullYear();
        var nowDay = now.getDay() + 5;
        var nowMonth = now.getMonth() + 1;

        if (month > 12 ||
            month == 0 ||
            day == 0 ||
            (day > nowDay && year >= nowYear && month >= nowMonth) ||
            year == 0 ||
            year > nowYear)
            return 'Fecha no válida'

        return false
    } catch (error) {
        console.log(error);
        return 'El formato no es correcto.'
    } */
}