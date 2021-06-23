const URL_CARGAR_PRODUCTOS = 'http://localhost:3004/imagenes';
const URL_LISTADO_PRODUCTOS = 'http://localhost:3004/imagenes';

export const cargarProductos = (state, exito, error)=>{
    const data = {
        "imagen": state.imagenBase64,
        "nombre": state.producto.nombre.value,
        "categoria": state.producto.categoria.value,
        "precio": state.producto.precio.value
      }
      fetch(URL_CARGAR_PRODUCTOS, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(resp => {
        if (resp.ok) {
          exito();          
        } else {
          error();        
        }        
    })
}

export const listaDeProductos = (exito, error)=>{
   fetch(URL_LISTADO_PRODUCTOS)
    .then(resp => {   
      if (resp.ok) {
          resp.json().then(resp=>exito(resp));          
      } else {
        error();
      }        
  })
}
