import React from 'react';
/** 
 * Componente funcional para gestionar formularios
 Para que funcione el componente se necesita un objeto como este (ejemplo de formulario con dos campos, login y password):
 const newState = {
    login: {
      value:'',
      rules: {
        requerido: true,
        format: true
      },
      error: {
        requerido: false,
        format: false
      }
    },
    password: {
      value:'',
      rules: {
        requerido: true,
        format: false
      },
      error: {
        requerido: false,
        format: false
      }
    },
  }

 * @param contex             - estado inicial de los campos del formulario. Se envía desde el padre
 * @param onSubmit           - Función a la que se va a llamar en caso de enviar el formulario sin errores
 * @param onError            - Función a la que se va a llamar en caso de intentar enviar el formulario con errores
 * @param campos             - Cada uno de los componentes que componen el formualario
 **/

export default function FormularioReact ({
    contex,
    onSubmit=()=>{},
    onError=()=>{},
    errorRequerido=()=>{},
    campos
}) {
   
        
    const validarFormulario = (contex)=>{
        let errorForm = true;       
        Object.keys(contex).forEach(
            function(elem) {
                if ((contex[elem].rules && contex[elem].rules.requerido && !contex[elem].value)) {                   
                    errorRequerido(elem);
                    errorForm = false;
                } else if (contex[elem].rules && contex[elem].rules.formato && contex[elem].error.formato) {
                    errorForm = false;
                } 
            }
        )
        return errorForm;
    }

    const registrar = (e)=> {       
        e.preventDefault();        
       
        if (validarFormulario(contex)) {
            onSubmit();
        } else {
            onError();            
        }
    }

    return <>
        <form className="react-formulario" onSubmit={registrar}>
            {campos}
        </form>
    </>
}
