import React, {useState, useContext
    // , useEffect
} from 'react';
import AlertaContext from '../../context/alertas/alertaContext'
import axios from 'axios'

const Login = props => {

    // extraer los valores de alerta
    const alertaContext = useContext(AlertaContext)
    const { alerta, mostrarAlerta } = alertaContext
    
    const [usuario, setUsuario] = useState({
        email: '',
        password: ''
    })

    const {email, password} = usuario

    const onChange = e => {
        setUsuario({
            ...usuario,
            [e.target.name]:e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault()

        if( email.trim() === '' || 
            password.trim() === ''){
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error')
            return 
        }

        iniciarSesion(email, password)
    }

    const iniciarSesion = async (email, password) => {

        const params = new URLSearchParams()
        params.append('usuario', email)
        params.append('clave', password)

        const config = {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }
        const url = 'http://aforoactual.mypressonline.com/index.php/login'

        const mensaje = await axios.post(url, params, config)

        if (typeof mensaje.data[0] !== 'undefined')  {
            props.history.push('/marcas')
        } else {
            mostrarAlerta('El usuario o clave es incorrecta', 'alerta-error')
        }
        
        
    }

    return ( 
        <div className="form-usuario">
            { alerta ? ( <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
            <div className="contenedor-form sombra-dark">
                <h1>AFORO PERÚ+</h1>
                <br></br>
                <h2>Iniciar sesión</h2>
                <form
                    onSubmit={onSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="email">Usuario</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            placeholder="Tu usuario"
                            value={email}
                            onChange={onChange}
                            maxLength={20}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Tu contraseña"
                            value={password}
                            onChange={onChange}
                            maxLength={20}
                        />
                    </div>

                    <div className="campo-form">
                        <input 
                            type="submit" 
                            className="btn btn-primario btn-block"
                            value="Iniciar sesión"
                        />
                    </div>
                </form>
            </div>
        </div>
     );
}
 
export default Login;