import {productoState} from './productoState';
export const storeInicial = {
    productoState : JSON.parse(JSON.stringify(productoState)),
    producto: JSON.parse(JSON.stringify(productoState)),
    imagenBase64: '',
    enviandoProducto: false,
    errorEnvioProducto: false,
    activarBotonNuevoProducto: false,
    listadoProductos: [],
    listadoProductosEnviando: true,
    listadoProductosMeGusta: []
}