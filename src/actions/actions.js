const IMAGEN_BASE_64 = 'IMAGEN_BASE_64';
const ENVIANDO_PRODUCTO = 'ENVIANDO_PRODUCTO';
const PRODUCTO_ENVIADO_CORRECTO = 'PRODUCTO_ENVIADO_CORRECTO';
const PRODUCTO_ENVIADO_ERROR = 'PRODUCTO_ENVIADO_ERROR';
const PRODUCTO_ACTUALIZADO = 'PRODUCTO_ACTUALIZADO';
const PRODUCTO_NUEVO = 'PRODUCTO_NUEVO';
const PRODUCTO_ERROR_REQUERIDO = 'PRODUCTO_ERROR_REQUERIDO';
const LISTADO_PRODUCTOS = 'LISTADO_PRODUCTOS';
const LISTADO_PRODUCTOS_ERROR = 'LISTADO_PRODUCTOS_ERROR';
const LISTADO_PRODUCTOS_ENVIANDO = 'LISTADO_PRODUCTOS_ENVIANDO';
const LISTA_PRODUCTOS_ME_GUSTA = 'LISTA_PRODUCTOS_ME_GUSTA';


export const imagenBase64 = (imagen)=> ({type: IMAGEN_BASE_64, value: imagen});

export const enviadoProducto = ()=> ({type: ENVIANDO_PRODUCTO});

export const productoEnviadoCorrecto = ()=> ({type: PRODUCTO_ENVIADO_CORRECTO});

export const productoEnviadoError = ()=> ({type: PRODUCTO_ENVIADO_ERROR});

export const actualizarProducto = (producto)=> ({type: PRODUCTO_ACTUALIZADO, value: producto});

export const productoNuevo = ()=> ({type: PRODUCTO_NUEVO});

export const productoErrorRequerido = (key)=> ({type: PRODUCTO_ERROR_REQUERIDO, value: key});

export const listadoProductos = (lista)=> ({type: LISTADO_PRODUCTOS, value: lista});

export const listadoProductosError = ()=> ({type: LISTADO_PRODUCTOS_ERROR});

export const listadoProductosEnviando = ()=> ({type: LISTADO_PRODUCTOS_ENVIANDO});

export const listadoProductosMeGusta = ({id, opcion})=> ({type: LISTA_PRODUCTOS_ME_GUSTA, value: {id, opcion}});


