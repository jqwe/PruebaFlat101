/*
* Funciones utilizadas para validar campos de formularios
*/

export const validateMaxSizeFile = function (file, maxSize, extensions) {
    return maxSize <= file.size;
}

export const validateExtension = function (file, maxSize, extensions) {
    const point = file.name.lastIndexOf('.');
    const long = file.name.length;
    const ext = file.name.substring(point + 1, long);
    return (extensions.indexOf(ext) == -1)
}

export const validateNumeric = function (value) {
    const regex = new RegExp("^[0-9]{1,5}(?:.[0-9]{1,2})?$");
    return !regex.test(value);
}