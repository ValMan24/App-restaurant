import React, { useEffect, useState } from 'react'
import Resumen from './resumen_carrito';
 import style from './resumen_carrito.module.css'
export default function Resumen() {
    

  return (
    <>

    
    {
        (datosPoke) ?
        (   <Resumen/>):
        (  <>
            <div className={style.card.color}>

                <img src="./public/not-found.png" alt="" />
               
            </div>
           </> )

    }
 
    
    </>
  )
}
