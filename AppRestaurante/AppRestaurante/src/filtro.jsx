import React, { useState, useEffect } from 'react';
 import styleFiltro from './filtros.module.css';

const Filtro = () => {


    return (
       
       
        <section class="cont_filtros"> 

        {/* <div className={styleFiltro.cont_busqueda}>
            <input type="text" className={styleFiltro.busqueda} placeholder="Buscar"/> 
            <div >
                <button className={styleFiltro.lupa}><i class="iconos ">search</i></button>
            </div>
        </div> */}
        <div className={styleFiltro.select}>
            <select className={styleFiltro.filtro} name="categoria" id="categ">
            <option value="0">Todo</option>
              <option value="1">Entradas</option>
              <option value="2">Platos Principales</option>
              <option value="3">Postres</option>
              <option value="4">Bebidas</option>
            </select>
    

      
            <select className={styleFiltro.filtro} name="ordenar" id="orden">
              <option value="1">Mayor a menor precio</option>
              <option value="2">Menor a mayor precio</option>
            </select>
        </div>

    </section>

    );
};

export default Filtro;
