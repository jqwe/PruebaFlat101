import React,{useState, useEffect, useRef} from 'react';
import FiledError from '../common/FieldError/FiledError';

// CSS asociado al componente
import './FieldFile.scss';

/**
 
 * Componente funcional que recoge un campo de tipo file y lo envía al padre. 
 * @param name                  - atributo name del input
 * @param label                 - texto a mostrar en la label
 * @param error                 - boolean, determina si el campo tiene un error. Se utiliza por el padre para indicar que hay un error. Ej. Al enviar un formulario
 *                              y detectar en el padre que el campo está vacío y es obligatorio
 * @param requiredError        - texto con el error a mostrar en el caso de error por campo requerido
 * @param value                 - valor por defecto 
 * @param allowedExtensions     -array con las extensiones permitidas
 * @param maxSize               - tamaño maximo permitido del fichero
 * @param disabled              - boolean, indica que el campo no se puede modificar
 * @param validators           - es array opcional, donde se pueden pasar funciones para validar el campo. Las funciones validadoras solo pueden devolver un valor true/false
 *                                  En el array también hay que indicar para cada validador el mensaje a mostrar en caso de error.
 *                                  validators = {[
                                        {validador: validarEmail, mensajeError: 'Formato email no valido'}                                                      
                                    ]}
 * @param onChange              - funcion que devuelve el valor al padre
 */

const newState = {
    value: '',
    errorRequired: false,
    errorFormat: false       
}

export default function FieldFile({
    name = '',   
    label = '',
    labelModify = '',
    error = false,    
    value = '',
    maxSize='',
    allowedExtensions=[],
    required = false,
    disabled = false,
    requiredError = '',  
    validators = [],
    onChange = ()=>{} 
   
}) {  
    const [messageError, setMessageError] = useState('');
    const [state, setState] = useState(newState)
    
    const file = useRef(null);

    const changeField = (event) => {
        const newState = JSON.parse(JSON.stringify(state));
            newState.value = event.currentTarget.files.length > 0 ? event.currentTarget.files[0] : null;
            newState.errorFormat = false;                
            if (newState.value != null) {
                newState.errorRequired = false;
                if (validators.length > 0) {
                    validators.map(elem=>{//Se aplican los validadores
                        if (!newState.errorFormat) {
                            newState.errorFormat = elem.validator(newState.value, maxSize, allowedExtensions);
                            if (newState.errorFormat) {
                                setMessageError(elem.messageError);                                    
                            } 
                        }        
                    }) 
                }                     
            } else if (required) {                           
                newState.errorRequired = true;
                setMessageError(requiredError);                   
            } 
        
        onChange({name, value: newState.value, error: {required: newState.errorRequired, format: newState.errorFormat}});
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
            setMessageError(requiredError); 
        }
             
    }, [error, value]); 
 

return <div className="react-fieldFile">   
            <div className={`react-fieldFile-group ${state.errorRequired || state.errorFormat || error ? 'errorField error' + name: ''} `} >
                <label className={`${!state.value ? 'react-fieldFile-group-label' : 'react-fieldFile-group-label-modify'}`} htmlFor={name}>{!state.value ? label : labelModify}</label>

                <div className={`react-fieldFile-group-input ${disabled ? "field__Disabled" : ""}`}>
                    <input className="newInputUINormal text" key={name} type='file' id={name} ref={file} name={name} disabled={disabled}  onChange={changeField} />               
                </div>  
            </div>

            {(error || state.errorRequired || state.errorFormat ) && <FiledError messageError={messageError}/>} 
        </div>  
}
    