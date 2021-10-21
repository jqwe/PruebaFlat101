/*
* Objeto de configuracion de los campos del formulario
*/

export const productState = {
  image: {
        value: null,       
        rules: {
            required: true,
            format: false
        },
        error: {
            required: false,
            format: false
        }
    },
  name: {
        value:'',
        rules: {
            required: true,
            format: false
        },
        error: {
            required: false,
            format: false
        }
    },
  category: {
        value:'',
        rules: {
            required: true,
            format: false
        },
        error: {
            required: false,
            format: false
        }
  },
  price: {
        value:'',
        rules: {
            required: true,
            format: false
        },
        error: {
            required: false,
            format: false
        }
    },

}    