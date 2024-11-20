import React, { useEffect, useState } from 'react'
import ProductoCarrito from './producto_carrito';
 import style from './producto_carrito.module.css'

export default function ProductoCarrito() {
    useEffect(()=>{
        
    });

  return (
    <>
    {
        (datosPoke) ?
        (   <filtros data = {datosPoke} />):
        (  <>
            <div className={style.card.color}>

                <img src="./public/not-found.png" alt="" />
               
            </div>
           </> )

    }
 
    </>
  )
}
