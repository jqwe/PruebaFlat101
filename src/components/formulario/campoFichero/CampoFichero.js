import React,{useState, useEffect, useReducer, useRef} from 'react';
import CampoError from '../comunes/campoError/CampoError';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';

// CSS asociado al componente
import './CampoFichero.scss';

/**
 
 * Componente funcional que recoge un campo de tipo file y lo envía al padre. 
 * @param name                  - atributo name del input
 * @param label                 - texto a mostrar en la label
 * @param error                 - boolean, determina si el campo tiene un error. Se utiliza por el padre para indicar que hay un error. Ej. Al enviar un formulario
 *                              y detectar en el padre que el campo está vacío y es obligatorio
 * @param errorRequerido        - texto con el error a mostrar en el caso de error por campo requerido
 * @param value                 - valor por defecto 
 * @param extensionesPermitidas -array con las extensiones permitidas
 * @param maxSize               - tamaño maximo permitido del fichero
 * @param disabled              - boolean, indica que el campo no se puede modificar
 * @param disabled              - boolean, indica que el campo no se puede modificar
 * @param validadores           - es array opcional, donde se pueden pasar funciones para validar el campo. Las funciones validadoras solo pueden devolver un valor true/false
 *                                  En el array también hay que indicar para cada validador el mensaje a mostrar en caso de error.
 *                                  validadores = {[
                                        {validador: validarEmail, mensajeError: 'Formato email no valido'}                                                      
                                    ]}
 * @param onChange              - funcion que devuelve el valor al padre
 */

    const newState = {
        value: '',
        errorRequired: false,
        errorFormat: false       
    }



export default function CampoFichero({
    name = '',   
    label = '',
    error = false,    
    value = '',
    maxSize='',
    extensionesPermitidas=[],
    required = false,
    disabled = false,
    errorRequerido = '',  
    validadores = [],
    onChange = ()=>{} 
   
}) {  
    const [mensajeError, setMensajeError] = useState('');
    const [state, setState] = useState(newState)
    
    const file = useRef(null);

    const cambiar = (event) => {
        const newState = JSON.parse(JSON.stringify(state));
            newState.value = event.currentTarget.files.length > 0 ? event.currentTarget.files[0] : null;
            newState.errorFormat = false;                
            if (newState.value != null) {
                newState.errorRequired = false;
                if (validadores.length > 0) {
                    validadores.map(elem=>{//Se aplican los validadores
                        if (!newState.errorFormat) {
                            newState.errorFormat = elem.validador(newState.value, maxSize, extensionesPermitidas);
                            if (newState.errorFormat) {
                                setMensajeError(elem.mensajeError);                                    
                            } 
                        }        
                    }) 
                }                     
            } else if (required) {                           
                newState.errorRequired = true;
                setMensajeError(errorRequerido);                   
            } 
        
        onChange({name, value: newState.value, error: {requerido: newState.errorRequired, formato: newState.errorFormat}});
        setState(newState);
       
    }
    
    useEffect(() => {        
        if (value == null) {
            setState(JSON.parse(JSON.stringify(newState)));
            file.current.value = null;
        }         
    }, [value]);
    

    useEffect(() => {
        if (error ) {
            setMensajeError(errorRequerido); 
        }
             
    }, [error, value]); 
 

return <div className="react-campoFichero">   
            <div className={`react-campoFichero-grupo ${state.errorRequired || state.errorFormat || error ? 'errorCampo error' + name: ''} `} >
                <label className={`${!state.value ? 'react-campoFichero-grupo-label' : 'react-campoFichero-grupo-label-modificar'}`} htmlFor={name}>{!state.value ? label : 'Pulsa para modificar'}</label>

                <div className={`react-campoFichero-grupo-input ${disabled ? "campo__Disabled" : ""}`}>
                    <input className="newInputUINormal texto" key={name} type='file' id={name} ref={file} name={name} disabled={disabled}  onChange={cambiar} />               
                </div>  
            </div>

            {(error || state.errorRequired || state.errorFormat ) && <CampoError mensajeError={mensajeError}/>} 
        </div>  
}
    