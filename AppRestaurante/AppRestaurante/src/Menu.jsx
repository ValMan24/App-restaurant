import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './buscador.module.css';

const Menu = ({ data }) => {
  const [carrito, setCarrito] = useState([]);
  const [codigoDescuento, setCodigoDescuento] = useState(''); 
  const [descuento, setDescuento] = useState(0); 
  const navigate = useNavigate(); 
  const articulos = localStorage.getItem("cantidadComensales") * 4;

  
  const codigosDescuento = {
    "DESCUENTO10": 0.10,  
    "DESCUENTO20": 0.20,  
  };


  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];
    console.log("Carrito cargado desde localStorage:", carritoGuardado);
    setCarrito(carritoGuardado);

 
    const descuentoGuardado = localStorage.getItem('descuento');
    if (descuentoGuardado) {
      setDescuento(parseFloat(descuentoGuardado));  
    }
  }, []);

 
  const handleClick = ({ target: { value } }) => {
    const producto = data.find(item => item.ID_ARTICULO === parseInt(value, 10));
    if (!producto) {
      console.error("Producto no encontrado en los datos");
      return;
    }

    let carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];

    const productoExistente = carritoGuardado.find(item => item.id === value);

    const cantidadTotal = carritoGuardado.reduce((total, item) => total + item.cantidad, 0);

  
    if (cantidadTotal >= articulos) {
      alert(`El límite total de productos (${articulos}) ha sido alcanzado.`);
      return;
    }

    if (productoExistente) {

      productoExistente.cantidad += 1;
    } else {
  
      carritoGuardado.push({
        id: value,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: 1
      });
    }


    localStorage.setItem('carrito', JSON.stringify(carritoGuardado));

    setCarrito(carritoGuardado);
  };

  const handleDecrement = (id) => {
    let carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];

    const productoExistente = carritoGuardado.find(item => item.id === id);

    if (productoExistente) {

      if (productoExistente.cantidad > 1) {
        productoExistente.cantidad -= 1;
      } else {

        carritoGuardado = carritoGuardado.filter(item => item.id !== id);
      }

      localStorage.setItem('carrito', JSON.stringify(carritoGuardado));


      setCarrito(carritoGuardado);
    }
  };

  const calcularTotal = () => {
    const total = carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
    return total - total * descuento; 
  };

  const calcularCantidadTotal = () => {
    return carrito.reduce((total, item) => total + item.cantidad, 0);
  };

  const aplicarDescuento = () => {
    if (codigosDescuento[codigoDescuento]) {
      const porcentajeDescuento = codigosDescuento[codigoDescuento];
      setDescuento(porcentajeDescuento);
      localStorage.setItem('descuento', porcentajeDescuento);
      alert(`Código de descuento aplicado: ${codigoDescuento}`);
    } else {
      alert("Código de descuento no válido.");
    }
  };

  const eliminarDescuento = () => {
    setDescuento(0); 
    setCodigoDescuento('');
    localStorage.removeItem('descuento'); 
    alert("Descuento eliminado.");
  };

  const realizarCompra = () => {
    for (let item of carrito) {
      const producto = data.find(producto => producto.ID_ARTICULO === parseInt(item.id, 10));
      
      if (producto && item.cantidad > producto.stock) {
        alert(`Stock insuficiente para el producto: ${producto.nombre}. Solo hay ${producto.stock} unidades disponibles.`);
        return; 
      }
    }

    alert("Compra realizada con éxito.");
    navigate('/Carrito');

    // setCarrito([]); 
    // localStorage.removeItem('carrito'); 
  };

  return (
    <div>
      <div className={style.menu}>
        {data.map((datos) => (
          <section className={style.restaurantes} key={datos.ID_ARTICULO}>
            <div className={style.resto}>
              <div className={style.imagen_resto}>
                <img src={datos.img} alt={datos.nombre} />
              </div>
              <div className={style.desc_resto}>
                <span className={style.name}>{datos.nombre}</span>
                <span className={style.precio}>${datos.precio}</span>
                <button
                  value={datos.ID_ARTICULO}
                  className={style.boton_carrito}
                  onClick={handleClick}
                >
                  Agregar
                </button>
              </div>
            </div>
          </section>
        ))}
      </div>

      <div className={style.carrito}>
        <h2>Carrito</h2><h4>"se permiten 4 articulos por comensal"</h4>
        {carrito.length === 0 ? (
          <p>No hay productos en el carrito</p>
        ) : (
          <ul>
            {carrito.map((item) => (
              <li key={item.id}>
                {item.nombre} - ${item.precio} x {item.cantidad}
                <button onClick={() => handleDecrement(item.id)}>Eliminar 1</button>
              </li>
            ))}
          </ul>
        )}

 
        {carrito.length > 0 && (
          <div className={style.totalCantidad}>
            <h3>Total de productos: {calcularCantidadTotal()}</h3>
            <h3>Total: ${calcularTotal().toFixed(2)}</h3>
          </div>
        )}


        <div>
          <input
            type="text"
            placeholder="Introduce código de descuento"
            value={codigoDescuento}
            onChange={(e) => setCodigoDescuento(e.target.value)}
          />
          <button onClick={aplicarDescuento}>Aplicar</button>
        </div>


        {descuento > 0 && (
          <div>
            <h4>Descuento aplicado: {descuento * 100}%</h4>
            <button onClick={eliminarDescuento}>Eliminar descuento</button>
          </div>
        )}


        <button onClick={realizarCompra}>Comprar</button>
      </div>
    </div>
  );
};

export default Menu;














