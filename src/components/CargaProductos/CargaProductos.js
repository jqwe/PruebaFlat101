import React, { useContext } from 'react';
import { Link } from "react-router-dom";

import Formulario from '../formulario/formulario/Formulario';
import CampoTexto from '../formulario/campoTexto/CampoTexto';
import CampoFichero from '../formulario/campoFichero/CampoFichero';
import {validarMaxSizeFichero, validarExtension, validarNumerico} from '../formulario/validators';
import {imagenBase64, enviadoProducto, actualizarProducto, productoNuevo, productoErrorRequerido, productoEnviadoCorrecto, productoEnviadoError} from '../../actions/actions';
import {cargarProductos} from '../../services/services';

import './CargaProductos.scss';
/**
Componente que presenta un formulario para la carga de productos

 * @param contexto  - contexto de la aplicación con el estado
 * 
**/

export default function CargaProductos({
    contexto
}) {
  const {state, dispatch} = useContext(contexto);
  
  const onSubmit = ()=> {    
    dispatch(enviadoProducto);    
    cargarProductos(state, ()=>dispatch(productoEnviadoCorrecto()), ()=>dispatch(productoEnviadoError()));
  }

  const convertirImagenABase64 = (imagen)=>{
    if (imagen) {
      var reader = new FileReader();
      reader.onloadend = function() {   
        dispatch(imagenBase64(reader.result));
      }
      reader.readAsDataURL(imagen);
    } else {
      dispatch(imagenBase64(null));
    }
    
  }
 
  const nuevoEnvio = (e)=>{   
    dispatch(productoNuevo());
  }
    
  return <div className="">      
     <div className="spn-react-carga-productos">     
      <div className="spn-react-carga-productos-container">        
        <h2>Formulario de Productos</h2>
         {!state.enviandoProducto 
         ? <Formulario contex={state.producto}  errorRequerido={(key)=>dispatch(productoErrorRequerido(key))} onSubmit={onSubmit} 
            campos={
              <div className="spn-contenedor-campos-formulario">
                <div className="spn-previsualizar-imagen">
                    {state.imagenBase64 && <img src={state.imagenBase64}></img>}
                </div>
                <div className="react-campo">
                  <CampoFichero                
                    placeholder = ''
                    label = 'Pulsa para añadir una imagen'
                    name='imagen'                                               
                    required={state.producto.imagen.rules.requerido}               
                    errorRequerido = 'Debes intruducir una imagen'
                    value={state.producto.imagen.value}
                    maxSize={10000000}
                    extensionesPermitidas={['png', 'jpg', 'JPG', 'PNG']}
                    error={state.producto.imagen.error.requerido}
                    disabled={state.activarBotonNuevoProducto} 
                    validadores = {[
                      {validador: validarMaxSizeFichero, mensajeError: 'El fichero debe ser menor de 10 MB'},
                      {validador: validarExtension, mensajeError: 'La extensión no es válida'}                                                      
                    ]}                                    
                    onChange = {({name, value, error})=>{     
                        dispatch(actualizarProducto({name, value, error}));                   
                        if (!error.requerido && !error.formato) {
                          convertirImagenABase64(value);
                        } else  {
                          dispatch(imagenBase64(null));
                        }          
                    }
                    }
                  
                  />
                </div>
                <div className="react-campo">
                  <CampoTexto                              
                    placeholder = ''
                    label = 'Nombre'
                    name='nombre'                                               
                    required={state.producto.nombre.rules.requerido}               
                    errorRequerido = 'Debes intruducir un nombre'
                    value={state.producto.nombre.value}
                    error={state.producto.nombre.error.requerido}
                    disabled={state.activarBotonNuevoProducto}                                  
                    onChange = {({name, value, error})=>dispatch(actualizarProducto({name, value, error}))}                  
                  />
                </div>
                <div className="react-campo">
                  <CampoTexto                     
                    type='categoria'
                    label='Categoría'
                    placeholder = ''
                    name='categoria'                                               
                    required={state.producto.categoria.rules.requerido}               
                    errorRequerido = 'Debes introducir una categoria'
                    value={state.producto.categoria.value}
                    error={state.producto.categoria.error.requerido}
                    disabled={state.activarBotonNuevoProducto}                                                
                    onChange = {({name, value, error})=>dispatch(actualizarProducto({name, value, error}))}         
                  />
                </div> 
                <div className="react-campo">
                  <CampoTexto                  
                    type='precio'
                    label='Precio'
                    placeholder = ''
                    name='precio'                                               
                    required={state.producto.precio.rules.requerido}               
                    errorRequerido = 'Debes introducir el precio'
                    value={state.producto.precio.value}
                    error={state.producto.precio.error.requerido}
                    disabled={state.activarBotonNuevoProducto}
                    validadores={[ 
                      {validador: validarNumerico, mensajeError: 'Debes introducir un precio en formato correcto (Ej: 35.99)'}
                    ]}                                 
                    onChange = {({name, value, error})=>dispatch(actualizarProducto({name, value, error}))}         
                  />
                </div> 
                {state.activarBotonNuevoProducto && <div className="spn-react-carga-productos__envio-correcto">Producto enviado correctamente</div>}
                {!state.activarBotonNuevoProducto ? <button className="react-button" data-testid="buttonLogin" type="submit">Enviar</button>
                                                  : <button className="react-button" type='button' onClick={nuevoEnvio}>Introducir otro producto</button>}
                <Link className="spn-link react-button" to="/listado">Ver Listado de productos</Link>
                {/* {errorLogin.estado && <p className="react-campo-server-error">{errorLogin.mensaje}</p>} */}
                

              </div>
            }>
          </Formulario>
          : <div>Enviando datos ...</div>
          }

      </div>
    </div>

    </div>
}
