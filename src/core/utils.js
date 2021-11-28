export const emailValidator = (email) => {
    const re = /\S+@\S+\.\S+/;

    if (!email || email.length <= 0) return 'Correo es requerido.';
    if (!re.test(email)) return 'Ooops! formato del correo incorrecto.';

    return '';
};

export const deleteItemArr = (arr, index) => {
    arr = arr.filter(function (i) { return i.uri !== index });
    return arr;
}


export const passwordValidator = (password) => {
    if (!password || password.length <= 0) return 'Contraseña es requerida.';

    return '';
};

export const nameValidator = (name) => {
    if (!name || name.length <= 0) return 'Nombre es requerido.';

    return '';
};

export const onlyNumber = (string = '') => {
    return string.replace(/[^0-9]/g, '');
}
 
export const iconType = (specie) => {
    switch (specie) {
        case 'perro':
        case 'dog':
            return require('../assets/img/dog.png')
        case 'gato':
        case 'cat':
            return require('../assets/img/cat.png')
        case 'm':
        case 'M':
            return require('../assets/img/men.png')
        case 'M':
        case 'h':
            return require('../assets/img/woman.png')
        case 'owner_pet':
            return require('../assets/img/owner_pet.png')
        case 'affection':
            return require('../assets/img/affection.png')
        case 'logo-utm':
            return require('../assets/img/logo-utm.png')

        default:
            return '';
    }
}

//carlos pico
//no lo se xd

export const nameStringPrayer = (string) => {
    return string.charAt(0).toUpperCase() + string.substr(1).toLowerCase();
}

export const sexAnimal = (string) => {
    return string === 'M' ? 'Macho' : 'Hembra'
}

export const castratedAnimal = (string) => {
    console.log(string)
    return string ? 'Castrado' : 'Sin castrar';
}

export const birthToAge = (date) => {

    var obs = new Date(date);

    var diff_ms = Date.now() - obs.getTime();
    var age_dt = new Date(diff_ms);

    return (Math.abs(age_dt.getUTCFullYear() - 1970));

};