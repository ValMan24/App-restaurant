 import React, { useState, useEffect } from 'react';
  import styleCarrito from './producto_carrito.module.css';

 const ProductoCarrito = () => {


     return (
       
         <div className={styleCarrito.producto_carrito}>
             <div className={styleCarrito.imagen_carrito}>
                 <img></img>
             </div>
             <div className={styleCarrito.descripcion}>
                 <h2>Hamburguesa</h2>
                 <div className={styleCarrito.contenedor}>
                 <div className={styleCarrito.cantidad}><button>-</button> <div id="cant">1</div> <button>+</button></div>
                 <h3>$500</h3> 
                 <button>Eliminar</button>
             </div>
         </div>
     </div>

     );
 };

 export default ProductoCarrito;
