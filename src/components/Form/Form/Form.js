import React from 'react';
/** 
 * Componente funcional para gestionar formularios
 Para que funcione el componente se necesita un objeto como este (ejemplo de formulario con dos campos, login y password):
 const newState = {
    name: {
      value:'',
      rules: {
        required: true,
        format: true
      },
      error: {
        required: false,
        format: false
      }
    }    
  }

 * @param contex             - estado inicial de los campos del formulario. Se envía desde el padre
 * @param onSubmit           - Función a la que se va a llamar en caso de enviar el formulario sin errores
 * @param onError            - Función a la que se va a llamar en caso de intentar enviar el formulario con errores
 * @param campos             - Cada uno de los componentes que componen el formualario
 **/

export default function Form ({
    contex,
    onSubmit=()=>{},
    onError=()=>{},
    errorRequerired=()=>{},
    fields
}) {
   
        
    const validateForm = (contex)=>{
        let errorForm = true;       
        Object.keys(contex).forEach(
            function(elem) {
                if ((contex[elem].rules && contex[elem].rules.required && !contex[elem].value)) {                   
                    errorRequerired(elem);
                    errorForm = false;
                } else if (contex[elem].rules && contex[elem].rules.format && contex[elem].error.format) {
                    errorForm = false;
                } 
            }
        )
        return errorForm;
    }

    const register = (e)=> {       
        e.preventDefault();        
       
        if (validateForm(contex)) {
            onSubmit();
        } else {
            onError();            
        }
    }

    return <>
        <form className="react-form" onSubmit={register}>
            {fields}
        </form>
    </>
}
