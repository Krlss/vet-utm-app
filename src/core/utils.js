export const emailValidator = (email) => {
    const re = /\S+@\S+\.\S+/;

    if (!email || email.length <= 0) return 'Correo es requerido.';
    if (!re.test(email)) return 'Ooops! formato del correo incorrecto.';

    return '';
};

export const emailformat = (email) => {
    const re = /\S+@\S+\.\S+/;
    if (!re.test(email)) return 'Ooops! formato del correo incorrecto.';
    return '';
}

export const deleteItemArr = (arr, index) => {
    arr = arr.filter(function (i) { return i.url !== index });
    /* console.log(arr) */
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
    console.log(string)
    return string.replace(/[^0-9]/g, '');
}

export const iconType = (specie) => {
    switch (specie) {
        case 'perro':
        case 'Perro':
        case 'dog':
        case 'Dog':
            return require('../assets/img/dog.png')
        case 'gato':
        case 'Gato':
        case 'Cat':
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
        case 'logo':
            return require('../assets/img/logo.png')
        case 'user-default':
            return require('../assets/img/user-default.png')

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

    var age_ = Math.abs(age_dt.getUTCFullYear() - 1970)
    var month;
    var day_;
    if (age_ <= 0) {
        month = Math.abs(age_dt.getUTCMonth());
        if (month > 1) age_ = month.toString().concat(' meses');
        if (month === 1) age_ = month.toString().concat(' mes');
        if (month < 1) {
            day_ = Math.abs(age_dt.getUTCDay());
            if (day_ => 6 && day_ <= 12) age_ = day_.toString().concat(' semana');
            if (day_ => 13) age_ = day_.toString().concat(' semanas');
            if (day_ => 2) age_ = day_.toString().concat(' dias');
            age_ = day_.toString().concat(' dia');
        }
    } else {
        if (age_ === 1) age_ = age_.toString().concat(' año');
        if (age_ > 1) age_ = age_.toString().concat(' años');
    }
    return age_;
};


export const deleteSpace = (string = '') => {
    return string.trim();
}