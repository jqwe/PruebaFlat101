import React,{useState, useEffect, useReducer} from 'react';
import CampoError from '../comunes/campoError/CampoError';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';

// CSS asociado al componente
import './CampoTexto.scss';

/**
 
 * Componente funcional que recoge un campo de texto y lo envía al padre. 
 * @param name              - atributo name del input
 * @param type              - atributo type del input. (text/password)
 * @param placeholder       - atributo placeholder del input
 * @param label             - texto a mostrar en la label
 * @param error             - boolean, determina si el campo tiene un error. Se utiliza por el padre para indicar que hay un error. Ej. Al enviar un formulario
 *                              y detectar en el padre que el campo está vacío y es obligatorio
 * @param errorRequerido    - texto con el error a mostrar en el caso de error por campo requerido
 * @param value             - valor por defecto 
 * @param required          - boolean, indica si el campo es obligatorio
 * @param disabled          - boolean, indica que el campo no se puede modificar
 * @param validadores       - es array opcional, donde se pueden pasar funciones para validar el campo. Las funciones validadoras solo pueden devolver un valor true/false
 *                                  En el array también hay que indicar para cada validador el mensaje a mostrar en caso de error.
 *                                  validadores = {[
                                        {validador: validarEmail, mensajeError: 'Formato email no valido'}                                                      
                                    ]}
 * @param onChange         - funcion que devuelve el valor al padre
 */

let newState = {
    value: '',
    errorRequired: false,
    errorFormat: false       
}

export default function CampoTexto({
    name = '',    
    type='text',
    placeholder = '',
    label = '',
    error = false,    
    value = '',
    required = false,
    disabled = false,
    errorRequerido = '',
    maxlength = 30,
    isMaxlength = false,    
    validadores = [],
    onChange = ()=>{} 
   
}) {  
    const [mensajeError, setMensajeError] = useState('');
    const [state, setState] = useState(newState);
    const [tipo, setTipo] = useState(type);   

    const [iconoVerOcultar, setIconoVerOcultar] = useState(false);
        
    const validar = (value)=>{    
            const newState = JSON.parse(JSON.stringify(state));   
            setIconoVerOcultar(false);
                newState.value = value;
                newState.errorFormat = false;                
                if (newState.value != '') {
                    newState.errorRequired = false;
                    if (validadores.length > 0) {
                        validadores.map(elem=>{//Se aplican los validadores
                            if (!newState.errorFormat) {
                                newState.errorFormat = elem.validador(state.value);
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
                setState(newState);            
                onChange({name, value: newState.value, error: {requerido: newState.errorRequired, formato: newState.errorFormat}});               
               
    }

    const focus =()=> {
            const newState = JSON.parse(JSON.stringify(state));   
            newState.errorFormat = false;               
            newState.errorRequired = false;
            setIconoVerOcultar(true);
            setState(newState);   
            onChange({name, value: newState.value, error: {requerido: newState.errorRequired, formato: newState.errorFormat}});            
        }    
    
    const cambiarType = ()=>{
        setTipo(tipo == 'password' ? 'text' : 'password');       
        setIconoVerOcultar(!iconoVerOcultar);
    }

    useEffect(() => {
        if (error || value!='') {
            validar(value);
        }  
        if (value == '') {
            setState(JSON.parse(JSON.stringify(newState)));
        }         
    }, [error, value]);

   
return <>
    <div className="react-campoTexto">   
        <div className={`react-campoTexto-grupo ${state.errorRequired || state.errorFormat || error ? 'errorCampo error' + name: ''} `} >
           {label != '' && <label className="react-campoDocumento-grupo-label" labelfor={name}>
                {label} 
            </label> }

            <div className={`react-campoTexto-grupo-input ${disabled ? "campo__Disabled" : ""}`}>
                <input className="newInputUINormal texto" key={name} type={tipo} id={name} data-testid={name} name={name} placeholder={placeholder} disabled={disabled} maxLength={isMaxlength ? maxlength : undefined} value={state.value} onChange={(elem)=>validar(elem.currentTarget.value)} onFocus={()=>focus()}/>
                {type == 'password' && <FontAwesomeIcon icon={iconoVerOcultar ? faEyeSlash : faEye} onClick={cambiarType}/>}
            </div>          
            
        </div>

        {(error || state.errorRequired || state.errorFormat ) && <CampoError mensajeError={mensajeError}/>}           
                    
    </div>
    </>
}
    