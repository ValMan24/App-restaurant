import style from './footer.module.css';
import { Link } from 'react-router-dom'
import React, { useState } from 'react';

export default function Navbar() {
  const [activeIndex, setActiveIndex] = useState(0); // Estado para rastrear el índice activo

  const handleActiveLink = (index) => {
    setActiveIndex(index);
  };

  return (
    <>
    
      <div className={style.navigation}>
        <ul>
          <li
            className={`${style.list} ${activeIndex === 0 ? style.active : ''}`}
            onClick={() => handleActiveLink(0)}
          ><Link  to="/">
             
              <span className={style.icon}>
                <ion-icon name="home-outline"></ion-icon>
              </span>
              <span className={style.text}>Inicio</span>
              </Link>
          </li>
          <li
            className={`${style.list} ${activeIndex === 1 ? style.active : ''}`}
            onClick={() => handleActiveLink(1)}
          ><Link  to="/Perfil">
            
              <span className={style.icon}>
                <ion-icon name="person-outline"></ion-icon>
              </span>
              <span className={style.text}>Perfil</span>
            </Link>
          </li>
          <li
            className={`${style.list} ${activeIndex === 2 ? style.active : ''}`}
            onClick={() => handleActiveLink(2)}
          ><Link  to="/Carrito">
              <span className={style.icon}>
                <ion-icon name="cart-outline"></ion-icon>
              </span>
              <span className={style.text}>Carrito</span>
            </Link>
          </li>
          <div className={style.indicator}></div>
        </ul>
      </div>
      
    </>
  );
}
