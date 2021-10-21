import React from 'react';
import './FieldError.scss';

/**
 * 
 * Componente que saca el mensaje de error en los campos de un formulario. 
 * @param FiledError      - mensaje del error 
 */

export default function FiledError({
    messageError = ''  
}) {
    
    
return <div className="react-fieldError">
            <p className="react-fieldError__message" data-testid="error">               
                {messageError}
            </p>											
        </div>   
}
    