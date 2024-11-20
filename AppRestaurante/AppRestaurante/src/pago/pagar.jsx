import React, { useState, useEffect } from 'react';
import pagar from './pagar.module.css';
import styleCarrito from './producto_carrito.module.css';

const Pagar = () => {
    return (


        <>
            <div className={pagar.cont_pagar}></div>
            <div className={pagar.form}>
                
                
                <div className={pagar.datosTarjeta}>
                
                Realizar compra
                <select name="categoria" id="categ">
                    <option> </option>
                    {/* <option value="1">Efectivo</option> */}
                    <option value="2">Tarjeta de credito</option>
                    <option value="3">Tarjeta de debito</option>
                    <option value="4">Transferncia bancaria</option>
                    <option value="5">Paypal</option>
                </select>
                    <input type='text' id='nombre' placeholder='Nombre' />
                    <input type='text' id='apellido' placeholder='Apellido' />
                    <input type='tel' id='tarjeta' placeholder='Numero de tarjeta' />
                    <div className={pagar.fechaSeg}>
                        <input type='month' id='vencimiento' placeholder='MMM/YY' className={pagar.inputChico}/>
                        <input type='tel' id='seguridad' placeholder='CVC' className={pagar.inputChico}/>
                    </div>
                    <div className={pagar.monto}>Total <p id='valor'> $13</p></div>
                    <button className={pagar.boton}>
                            Confirmar compra
                        </button>
        
                </div>
            </div>

            {/* <div className={perfil.imagen_perfil}>
            <div className={perfil.cont_foto}>
                <img  src="data:image/jpeg;base64,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"/> 
            </div>
        </div>
            <section className={perfil.datos_perfil}>
                <div className={perfil.cont_dato}>
                    <input id="nombre" className={perfil.dato} placeholder="Name" />
                    <input id="apellido"className={perfil.dato}  placeholder="Second name"/>
                    <input id="direccion" className={perfil.dato } placeholder="Email"/>
                    <input id="telefono" className={perfil.dato} placeholder="Location"/>
                </div>
            </section> */}
        </>
    );

};

export default Pagar;
