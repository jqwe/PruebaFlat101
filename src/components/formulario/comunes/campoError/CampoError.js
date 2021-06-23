import React from 'react';
import './CampoError.scss';

/**
 * 
 * Componente funcional que saca el mensaje de error en los campos de un formulario. 
 * @param mensajeError      - mensaje del error 
 */

export default function CampoError({
    mensajeError = ''  
}) {
    
    
return <div className="react-campoError">
            <p className="react-campoError__mensaje" data-testid="error">               
                {mensajeError}
            </p>											
        </div>   
}
    