/*
* Funciones utilizadas para validar campos de formularios
*/


export const validarMaxSizeFichero = function (fichero, maxSize, extensiones) {
    return maxSize <= fichero.size;
}

export const validarExtension = function (fichero, maxSize, extensiones) {
    const punto = fichero.name.lastIndexOf('.');
    const long = fichero.name.length;
    const ext = fichero.name.substring(punto + 1, long);
    return (extensiones.indexOf(ext) == -1)
}

export const validarNumerico = function (value) {
    const regex = new RegExp("^[0-9]{1,5}(?:.[0-9]{1,2})?$");
    return !regex.test(value);
}