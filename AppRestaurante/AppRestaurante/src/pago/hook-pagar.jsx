import React, { useEffect, useState } from 'react'
import Pagar from 'pagar.jsx'


export default function Hooks_Perfil() {
    const [nombre,setNombreAlimento] = useState(
        ''
    );
    const [datosMenu, setDatosMenu] = useState()

    const onChangeInput = ({target}) =>{
        console.log(target.value)
        setNombreAlimento(target.value)
    }

    useEffect(()=>{
        const fetchData = async()=>{
             try{
             const url = `https://randomuser.me/api/`;
             const response = await fetch(url);
             const info = await response.json();
             if(nombre){
         
                setDatosMenu({
                    ...info
                })
             }
           
             } catch (error){
                 console.log('no encontrado')
                  console.log(error);
             }
        }
        fetchData();
        console.log(datosMenu)
    } , [nombre] );

  return (
    <>
    <div className={style.busqueda}>
    
    {
        (datosMenu) ?
        (   <Pagar  />):
        (  <>
            <div className={style.card.color}>

                <img src="./public/not-found.png" alt="" />
               
            </div>
           </> )

    }
 </div>
    
    </>
  )
}
