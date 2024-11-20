import React, { useState, useEffect } from 'react';
import style from './buscador.module.css';

const Carrito = () => {
  const [metodoPago, setMetodoPago] = useState(null);
  const [formData, setFormData] = useState({
    tarjetaNumero: '',
    tarjetaVencimiento: '',
    tarjetaCVV: '',
    mercadoPagoAlias: '',
    direccionEnvio: '',
    nombreDestinatario: '',
    numeroContacto: '',
  });
  const [carrito, setCarrito] = useState([]);
  const [descuento, setDescuento] = useState(0);

  useEffect(() => {
    const carritoDesdeLocalStorage = localStorage.getItem('carrito');
    const descuentoDesdeLocalStorage = localStorage.getItem('descuento');
    if (carritoDesdeLocalStorage) {
      const carritoParsed = JSON.parse(carritoDesdeLocalStorage);
      setCarrito(Array.isArray(carritoParsed) ? carritoParsed : []);
    }
    if (descuentoDesdeLocalStorage) {
      setDescuento(parseFloat(descuentoDesdeLocalStorage));
    }
  }, []);

  const calcularTotal = () => {
    const total = carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
    return total - total * descuento;
  };

  const handleMetodoPagoChange = (metodo) => {
    setMetodoPago(metodo);
    setFormData({
      tarjetaNumero: '',
      tarjetaVencimiento: '',
      tarjetaCVV: '',
      mercadoPagoAlias: '',
      direccionEnvio: '',
      nombreDestinatario: '',
      numeroContacto: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  console.log("soy id usuario")
console.log(localStorage.getItem('id'))
const obtenerYGuardarIdCarrito = async () => {
    try {
      const usuarioId = localStorage.getItem('id');
 console.log("holaaa")
      console.log(JSON.stringify({ usuarioId }))
      if (!usuarioId) {
        throw new Error('No se encontró el ID del usuario en localStorage');
      }
  
      const response = await fetch('http://localhost:3001/obtenerIdCarrito', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usuarioId }),
      });
  
      if (!response.ok) {
        throw new Error('Error al obtener el ID del carrito');
      }
  
      const data = await response.json(); 
      console.log("Respuesta de la API:", data); 
  

      if (!data || !data.idCarrito) {
        throw new Error('idCarrito no encontrado en la respuesta de la API');
      }

      const { idCarrito } = data;
      console.log("ID del carrito extraído:", idCarrito);

      localStorage.setItem('idCarrito', idCarrito);
      console.log('ID del carrito guardado en localStorage:', localStorage.getItem('idCarrito'));
  
      return idCarrito;
    } catch (error) {
      console.error('Error al obtener y guardar el ID del carrito:', error);
      throw error; 
    }
  };
  
 

  


  const actualizarStock = async () => {
    try {

      const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

      if (carrito.length === 0) {
        console.log('El carrito está vacío');
        return;
      }
  

      const response = await fetch('http://localhost:3001/stockArticulo');
      if (!response.ok) {
        throw new Error('Error al obtener el stock de los productos');
      }
  
      const productosStock = await response.json(); 

      const stockActualizado = productosStock.map((producto) => {
        const itemCarrito = carrito.find((item) => item.id === producto.id); 
  
        if (itemCarrito) {
          return {
            id: producto.id,
            stock: producto.stock - itemCarrito.cantidad, 
          };
        }
  
        return { id: producto.id, stock: producto.stock };
      });
  
      console.log('Stock actualizado:', stockActualizado);
  
      const modificarStockResponse = await fetch('http://localhost:3001/modificarStockProductos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(stockActualizado),
      });
  
      if (!modificarStockResponse.ok) {
        throw new Error('Error al modificar el stock de los productos');
      }
  
      const resultado = await modificarStockResponse.json();
      console.log('Modificación de stock exitosa:', resultado);
  
      return resultado;
    } catch (error) {
      console.error('Error al actualizar y modificar el stock:', error);
    }
  };


  const realizarCompra = async () => {
    try {

     actualizarStock()
    const id_carrito =   obtenerYGuardarIdCarrito();


      for (const item of carrito) {
        const responseProducto = await fetch('http://localhost:3001/insertarProductoCarrito', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id_carrito,
            productoId: item.id,
            cantidad: item.cantidad,
          }),
        });
        if (!responseProducto.ok) {
          throw new Error(`Error al insertar el producto ${item.nombre}`);
        }
      }



 
      const responseTotal = await fetch('http://localhost:3001/registrarTotalPagado', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idCarrito,
          totalPagado: calcularTotal(),
        }),
      });
      if (!responseTotal.ok) throw new Error('Error al registrar el total pagado');


      alert('Compra realizada con éxito');
      localStorage.removeItem('carrito');
      localStorage.removeItem('descuento');
      setCarrito([]);
      setDescuento(0);
    } catch (error) {
      console.error('Error en la compra:', error);
      alert('Hubo un error al procesar la compra. Por favor, intente nuevamente.');
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    realizarCompra();
  };

  return (
    <div className={style.carrito}>
      <h2>Carrito</h2>
      {carrito.length === 0 ? (
        <p>No hay productos en el carrito</p>
      ) : (
        <ul>
          {carrito.map((item) => (
            <li key={item.id}>
              {item.nombre} - ${item.precio} x {item.cantidad}
            </li>
          ))}
        </ul>
      )}

      {carrito.length > 0 && (
        <div className={style.total}>
          <h3>Total: ${calcularTotal().toFixed(2)}</h3>
          {descuento > 0 && <p>Descuento aplicado: {descuento * 100}%</p>}
        </div>
      )}

      {carrito.length > 0 && (
        <div className={style.metodosDePago}>
          <h4>Elige un método de pago</h4>

          <button onClick={() => handleMetodoPagoChange('tarjeta')} className={style.botonPago}>
            Pagar con tarjeta
          </button>
          <button onClick={() => handleMetodoPagoChange('mercadoPago')} className={style.botonPago}>
            Pagar con Mercado Pago
          </button>

          {metodoPago === 'tarjeta' && (
            <form onSubmit={handleSubmit}>
              <h5>Datos de la tarjeta</h5>
              <input
                type="text"
                placeholder="Número de tarjeta"
                name="tarjetaNumero"
                value={formData.tarjetaNumero}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                placeholder="Fecha de vencimiento (MM/YY)"
                name="tarjetaVencimiento"
                value={formData.tarjetaVencimiento}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                placeholder="CVV"
                name="tarjetaCVV"
                value={formData.tarjetaCVV}
                onChange={handleInputChange}
                required
              />
            </form>
          )}

          {metodoPago === 'mercadoPago' && (
            <form onSubmit={handleSubmit}>
              <h5>Alias de Mercado Pago</h5>
              <input
                type="text"
                placeholder="Ingresa tu alias de Mercado Pago"
                name="mercadoPagoAlias"
                value={formData.mercadoPagoAlias}
                onChange={handleInputChange}
                required
              />
            </form>
          )}

          <h5>Información de Envío</h5>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nombre del destinatario"
              name="nombreDestinatario"
              value={formData.nombreDestinatario}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              placeholder="Dirección de envío"
              name="direccionEnvio"
              value={formData.direccionEnvio}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              placeholder="Número de contacto"
              name="numeroContacto"
              value={formData.numeroContacto}
              onChange={handleInputChange}
              required
            />

            <button type="submit" className={style.botonPago}>
              Confirmar compra
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Carrito;















