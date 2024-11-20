// import React, { useEffect, useState } from 'react'
// import Login from './login.jsx'
// import login from './login.module.css'

// export default function Hooks_Perfil() {
//     const [nombre,setNombreAlimento] = useState(
//         ''
//     );
//     const [datosMenu, setDatosMenu] = useState()

//     const onChangeInput = ({target}) =>{
//         console.log(target.value)
//         setNombreAlimento(target.value)
//     }

//     useEffect(()=>{
//         const fetchData = async()=>{
//              try{
//              const url = `http://localhost:3001/login/${email}/${password}`;
//              const response = await fetch(url);
//              const info = await response.json();
//              if(nombre){
         
//                 setDatosMenu({
//                     ...info
//                 })
//              }
           
//              } catch (error){
//                  console.log('no encontrado')
//                   console.log(error);
//              }
//         }
//         fetchData();
//         console.log(datosMenu)
//     } , [nombre] );

//   return (
//     <>
//     <div className={style.busqueda}>
    
//     {
//         (datosMenu) ?
//         (   <Login data = {datosMenu} />):
//         (  <>
//             <div className={style.card.color}>

//                 <img src="./public/not-found.png" alt="" />
               
//             </div>
//            </> )

//     }
//  </div>
    
//     </>
//   )
// }
import React, { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Maneja el cambio de los inputs
  const handleChange = (e) => {
    if (e.target.name === 'email') {
      setEmail(e.target.value);
    } else if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
  };

  // Envia las credenciales al backend
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        // Si el login es exitoso, guardamos el token
        localStorage.setItem('token', data.token);
        alert('Login exitoso');
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage('Error de conexión');
    }
  };

  return (
    <div className={login.cont_formulario}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            name="email" 
            value={email} 
            onChange={handleChange} 
            required 
            className={login.input_form}
          />
        </div>
        <div>
          <label>Password:</label>
          <input 
            type="password" 
            name="password" 
            value={password} 
            onChange={handleChange} 
            className={login.input_form}
            required 
          />
        </div>
        <div  className={login.borde_externo}>
        <button type="submit" lassName={login.iniciar}>Login</button>
        </div>
       
      </form>

      {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
    </div>
  );
}


