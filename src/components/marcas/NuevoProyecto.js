import React,{Fragment, useState, useContext} from 'react';
import proyectoContext from '../../context/marcas/proyectoContext'

const NuevoProyecto = () => {

    const proyectosContext = useContext(proyectoContext)
    const { formulario, errorformulario, mostrarFormulario, agregarProyecto, mostrarError } = proyectosContext

    const [proyecto, setProyecto] = useState({
        nombre: '',
        url: ''
    })

    const {nombre, url} = proyecto 

    // Lee los contenidos del input
    const onChangeProyecto = e => {
        setProyecto({
            ...proyecto,
            [e.target.name] : e.target.value
        })
    }

    // Cuando el usuario envia un proyecto
    const onSubmitProyecto = e => {
        e.preventDefault()
        
        //Validar el proyecto
        if(nombre === ''){
            mostrarError()
            return
        }

        //Validar el url
        if(url === ''){
            mostrarError()
            return
        }
        
        //Agregar el state
        agregarProyecto(proyecto)

        //Reiniciar form
        setProyecto({
            nombre: '',
            url: ''
        })        
        
    }

    return (  
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={()=> mostrarFormulario()}
            >Nuevo establecimiento</button>
            {
                formulario 
                ?
                (
                    <form
                        className="formulario-nuevo-proyecto"
                        onSubmit={onSubmitProyecto}
                    >
                        <br/>
                        <br/>
                        <br/>
                        <input
                            type="text"
                            className="input-text"
                            placeholder="Nombre del establecimiento"
                            name="nombre"
                            value={nombre}
                            onChange={onChangeProyecto}
                        />
                        <br/>
                        <br/>
                        <input
                            type="text"
                            className="input-text"
                            placeholder="Url de imagen"
                            name="url"
                            value={url}
                            onChange={onChangeProyecto}
                        />

                        <input 
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Agregar establecimiento"
                        />
                    </form>
                ) 
                :
                    null
            }

            {
                errorformulario ? <p className="mensaje error"> Los campos son obligatorios </p> : null
            }
        </Fragment>
        

    );
}
 
export default NuevoProyecto;