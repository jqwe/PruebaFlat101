import {productoState} from '../models/productoState';

export const reducer = (state, action) => {        
    switch (action.type) {
        case 'IMAGEN_BASE_64' : {
          state.imagenBase64 = action.value;
          break;        
        }
        case 'PRODUCTO_ACTUALIZADO' : {
          state.producto[action.value.name].value = action.value.value;
          state.producto[action.value.name].error = action.value.error;
          break;
        }
        case 'ENVIANDO_PRODUCTO' : {
          state.enviandoProducto = true;
          break;
        }
        case 'PRODUCTO_ENVIADO_CORRECTO' : {
          state.enviandoProducto = false;
          state.productoState = JSON.parse(JSON.stringify(productoState));          
          state.activarBotonNuevoProducto = true;
          break;
        }
        case 'PRODUCTO_ENVIADO_ERROR' : {
          state.errorEnvioProducto = true;
          break;
        }
        case 'PRODUCTO_NUEVO' : {
          state.producto = JSON.parse(JSON.stringify(productoState));
          state.activarBotonNuevoProducto = false;
          state.imagenBase64 = null;
          break;
        }
        case 'PRODUCTO_ERROR_REQUERIDO' : {
          state.producto[action.value].error.requerido = true; 
          break;
        }
        case 'LISTADO_PRODUCTOS_ENVIANDO' : {
          state.listadoProductosEnviando = true;
          break;
        }
        case 'LISTADO_PRODUCTOS' : {
          state.listadoProductos = action.value;
          state.listadoProductosEnviando = false;
          break;
        }
        case 'LISTA_PRODUCTOS_ME_GUSTA' : {
          if (action.value.opcion) {
            state.listadoProductosMeGusta.push(action.value.id);
            } else {
            const index = state.listadoProductosMeGusta.indexOf(action.value.id);
            state.listadoProductosMeGusta.splice(index, 1);
            }
          break;
        }        
    }  
    return {...state}; 
  }