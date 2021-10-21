import React,{useState, useEffect} from 'react';
import FiledError from '../common/FieldError/FiledError';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';

// CSS asociado al componente
import './FieldText.scss';

/**
 
 * Componente funcional que recoge un campo de texto y lo envía al padre. 
 * @param name              - atributo name del input
 * @param type              - atributo type del input. (text/password)
 * @param placeholder       - atributo placeholder del input
 * @param label             - texto a mostrar en la label
 * @param error             - boolean, determina si el campo tiene un error. Se utiliza por el padre para indicar que hay un error. Ej. Al enviar un formulario
 *                              y detectar en el padre que el campo está vacío y es obligatorio
 * @param requiredError    - texto con el error a mostrar en el caso de error por campo requerido
 * @param value             - valor por defecto 
 * @param required          - boolean, indica si el campo es obligatorio
 * @param disabled          - boolean, indica que el campo no se puede modificar
 * @param validators       - es array opcional, donde se pueden pasar funciones para validar el campo. Las funciones validadoras solo pueden devolver un valor true/false
 *                                  En el array también hay que indicar para cada validador el mensaje a mostrar en caso de error.
 *                                  validators = {[
                                        {validador: validarEmail, mensajeError: 'Formato email no valido'}                                                      
                                    ]}
 * @param onChange         - funcion que devuelve el valor al padre
 */

let newState = {
    value: '',
    errorRequired: false,
    errorFormat: false       
}

export default function FieldText({
    name = '',    
    type='text',
    placeholder = '',
    label = '',
    error = false,    
    value = '',
    required = false,
    disabled = false,
    requiredError = '',
    maxlength = 30,
    isMaxlength = false,    
    validators = [],
    onChange = ()=>{} 
   
}) {  
    const [messageError, setMessageError] = useState('');
    const [state, setState] = useState(newState);
    const [typeInput, setTypeInput] = useState(type);   

    const [iconShowHide, setIconShowHide] = useState(false);
        
    const validate = (value)=>{    
            const newState = JSON.parse(JSON.stringify(state));   
            setIconShowHide(false);
                newState.value = value;
                newState.errorFormat = false;                
                if (newState.value != '') {
                    newState.errorRequired = false;
                    if (validators.length > 0) {
                        validators.map(elem=>{//Se aplican los validadores
                            if (!newState.errorFormat) {
                                newState.errorFormat = elem.validator(state.value);
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
                setState(newState);            
                onChange({name, value: newState.value, error: {required: newState.errorRequired, format: newState.errorFormat}});               
               
    }

    const focus =()=> {
            const newState = JSON.parse(JSON.stringify(state));   
            newState.errorFormat = false;               
            newState.errorRequired = false;
            setIconShowHide(true);
            setState(newState);   
            onChange({name, value: newState.value, error: {required: newState.errorRequired, format: newState.errorFormat}});            
        }    
    
    const changeType = ()=>{
        setTypeInput(typeInput == 'password' ? 'text' : 'password');       
        setIconShowHide(!iconShowHide);
    }

    useEffect(() => {
        if (error || value!='') {
            validate(value);
        }  
        if (value == '') {
            setState(JSON.parse(JSON.stringify(newState)));
        }         
    }, [error, value]);

   
return <>
    <div className="react-fieldText">   
        <div className={`react-fieldText-group ${state.errorRequired || state.errorFormat || error ? 'errorField error' + name: ''} `} >
           {label != '' && <label labelfor={name}>
                {label} 
            </label> }

            <div className={`react-fieldText-group-input ${disabled ? "field__Disabled" : ""}`}>
                <input className="newInputUINormal" key={name} type={typeInput} id={name} data-testid={name} name={name} placeholder={placeholder} disabled={disabled} maxLength={isMaxlength ? maxlength : undefined} value={state.value} onChange={(elem)=>validate(elem.currentTarget.value)} onFocus={()=>focus()}/>
                {typeInput == 'password' && <FontAwesomeIcon icon={iconShowHide ? faEyeSlash : faEye} onClick={changeType}/>}
            </div>          
            
        </div>

        {(error || state.errorRequired || state.errorFormat ) && <FiledError messageError={messageError}/>}           
                    
    </div>
    </>
}
    