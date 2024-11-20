import React, { useEffect, useState } from 'react'
import Filtro from './filtro';
 import style from './filtros.module.css'

export default function HooksFilto() {
    useEffect(()=>{
        
    });

  return (
    <>
    {
        (dataSearch) ?
        (   <filtros data = {dataSearch} />):
        (  <>
            <div className={style.card.color}>

                <img src="./public/not-found.png" alt="" />
               
            </div>
           </> )

    }
 
    </>
  )
}
