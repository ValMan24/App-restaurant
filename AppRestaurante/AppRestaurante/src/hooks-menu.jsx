
import React, { useEffect, useState } from 'react';
import NavbarStyle from './buscador.module.css';
import styleFiltro from './filtros.module.css';
import './material-icons.css';
import Menu from './Menu';
import Filtro from './filtro';

export default function Principal() {

    const [nombre, setNombre] = useState('');
    const [datosSearch, setDatosSearch] = useState([]);
    const [categoria, setCategoria] = useState('0');
    const [precioMin, setPrecioMin] = useState(0);
    const [precioMax, setPrecioMax] = useState(500);  
    const [ordenar, setOrdenar] = useState('1');  
    const [buttonValue, setButtonValue] = useState(1);
    const [comensal, setComensal] = useState(1);

    const filterCategory = (event) => {
        setCategoria(event.target.value); 
    };

    const handleClick = (event) => {
        const comensal = parseInt(event.target.value, 10);
        if (!(comensal < 5)) {
            setButtonValue(4);
            alert("No puedes ingresar una cantidad mayor al limite de comensales");
            return;
        }
        setButtonValue(comensal);
        setComensal(comensal);
    };

    const guardarComensal = (event) => {
        contedorComensal.style.display = 'none';
        localStorage.setItem('cantidadComensales', comensal);
    };

    const onChangeInput = ({ target }) => {
        setNombre(target.value);
    };

    useEffect(() => {
        let url = `http://localhost:3001/menu/${nombre}`;

        if (categoria > 0) {
            url = `http://localhost:3001/category/${categoria}`;
        }

        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const info = await response.json();

                
                const productosFiltrados = info.filter((item) => {
                    return item.precio >= precioMin && item.precio <= precioMax;
                });

                
                if (ordenar === '1') {
                    productosFiltrados.sort((a, b) => b.precio - a.precio);  
                } else if (ordenar === '2') {
                    productosFiltrados.sort((a, b) => a.precio - b.precio);  
                }

                setDatosSearch(productosFiltrados);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();

    }, [nombre, categoria, precioMin, precioMax, ordenar]);  

    return (
        <>
            <header className={NavbarStyle.encabezado}>
                <div className={NavbarStyle.Navbar}>
                    <div className={NavbarStyle.logo}><img src="https://static.vecteezy.com/system/resources/previews/009/291/628/original/restaurant-logo-design-vector.jpg" alt="" /></div>
                    <div className={NavbarStyle.buscar}>
                        <input className={NavbarStyle.buscador} type="text" placeholder='Nombre' value={nombre} onChange={onChangeInput} />
                    </div>
                    <div className={NavbarStyle.carrito_icono}>
                        <i className='iconos'>shopping_cart </i>
                    </div>
                </div>
            </header>
            <div className={NavbarStyle.contendorFiltroComensal}>
                <div className={styleFiltro.select}>
                    <select className={styleFiltro.filtro} name="categoria" value={categoria} id="categ" onChange={filterCategory}>
                        <option value="0">Todo</option>
                        <option value="1">Entradas</option>
                        <option value="2">Platos Principales</option>
                        <option value="3">Postres</option>
                        <option value="4">Bebidas sin alcohol</option>
                        <option value="5">Bebidas con alcohol</option>
                    </select>

                    {/* Filtro por precio
                    <div>
                        <label>Rango de Precio:</label>
                        <input
                            type="number"
                            value={precioMin}
                            onChange={(e) => setPrecioMin(e.target.value)}
                            placeholder="Precio mínimo"
                            
                        />
                        <input
                            type="number"
                            value={precioMax}
                            onChange={(e) => setPrecioMax(e.target.value)}
                            placeholder="Precio máximo"
                        />
                    </div> */}


                    <select className={styleFiltro.filtro} name="ordenar" value={ordenar} id="orden" onChange={(e) => setOrdenar(e.target.value)}>
                        <option value="1">Mayor a menor precio</option>
                        <option value="2">Menor a mayor precio</option>
                    </select>

                    <div className={NavbarStyle.comensales} id="contedorComensal">
                        Cantidad de comensales:
                        <input type='number' value={buttonValue} name="comensal" onChange={handleClick} required />
                        <button onClick={guardarComensal}>Enviar</button>
                    </div>
                </div>
            </div>

            {
                datosSearch.length > 0 ? (
                    <div className={NavbarStyle.resultado}>
                        <Menu data={datosSearch} />
                    </div>
                ) : (
                    <div className={NavbarStyle.resultado}>
                        <div className={NavbarStyle.card_error}>
                            <div className={NavbarStyle.msj_error}>
                                Lo sentimos... no contamos con ese articulo
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
}
