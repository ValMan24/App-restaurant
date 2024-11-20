import React, { useState, useEffect } from 'react';
 import style from './resumen_carrito.module.css';

const Resumen = () => {


    return (
       
        <div className={style.resumen}>
        <div><h4>Resumen de compra</h4></div>
        <div className={style.datos}><h5>Productos </h5><h5>$500</h5></div>
        <div className={style.datos}><h5>Envio </h5><h5>$500</h5></div>
        <div className={style.datos.subtotal}><h5>Subtotal</h5><h5>$500</h5></div>
        <div className={style.cont_pagar}><button className={style.pagar}>Ir a pagar</button></div>
    </div>

    );
};

export default Resumen;
