/*
* Objeto de configuracion de los campos del formulario
*/

export const productoState = {
  imagen: {
        value: null,       
        rules: {
            requerido: true,
            format: false
        },
        error: {
            requerido: false,
            format: false
        }
    },
  nombre: {
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
  categoria: {
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
  precio: {
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