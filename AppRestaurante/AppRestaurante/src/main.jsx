import React from 'react'
import ReactDOM from 'react-dom/client'
 import Menu from './Menu.jsx'
import Navbar from './carrito.jsx'
import Footer from './Footer'
import Perfil from './perfil-menu nuevo/perfil.jsx'
import Principal from './hooks-menu.jsx'
import Carrito from './carrito.jsx'
import Login from './login.jsx'
import './material-icons.css'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
<>
 
 
<BrowserRouter>
 
 <Routes>
 <Route path="login" element={<Login />} />
  <Route path="" element={<Principal />} /> 
 <Route path="Perfil" element={<Perfil />} />
    <Route path="Carrito" element={<Carrito />} /> 
   {/* <Route path="Menu" element={<AppDBZ />} /> */}

 </Routes>
 <Footer />
 </BrowserRouter>

 
</>
)

