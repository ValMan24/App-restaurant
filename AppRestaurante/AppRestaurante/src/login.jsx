
import React, { useState } from 'react';
import styleLogin from './login.module.css';
import { useNavigate } from 'react-router-dom';
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); 
  
  const handleChange = (e) => {
    if (e.target.name === 'email') {
      setEmail(e.target.value);
    } else if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
  };


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
    //    
    const {ID_USUARIO: id, email: mail, } = data[0];
    localStorage.setItem('id', id);
    localStorage.setItem('email', mail);
    const FK_USER = localStorage.getItem('id')
    const estado="en proceso"
        if(FK_USER){
           
           const response = await fetch('http://localhost:3001/carrito', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({estado,FK_USER })
          });
    
          const data = await response.json();
          const pedido = [{}]
          localStorage.setItem('pedido', );
          navigate('/');

            
        }else{
            console.log("NOOOO LOGEADO")
        }
// const usuario = localStorage.getItem('user');
//         console.log(JSON.parse(usuario))

//        }

    } catch (error) {
      setErrorMessage('Error de conexión');
    }
  };

  return (
    <div className={styleLogin.cont_formulario}>
    
      <form onSubmit={handleLogin} className={styleLogin.formulario}>
      <h2>¡Ingresa a tu cuenta!</h2>
          <label>Email:</label>
          <input 
            type="email" 
            name="email" 
            placeholder='ejemplo@gmail.com'
            value={email} 
            onChange={handleChange} 
            required 
            className={styleLogin.input_form}
          />
    
        
          <label>Password:</label>
          <input 
            type="password" 
            name="password" 
             placeholder='************'
            value={password} 
            onChange={handleChange} 
            className={styleLogin.input_form}
            required 
          />
        
        <div  className={styleLogin.borde_externo}>
        <button type="submit" className={styleLogin.iniciar}>Login</button>
        </div>
       
      </form>

      {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
    </div>
  );
}

