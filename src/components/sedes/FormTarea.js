import React,{useContext, useState, useEffect} from 'react';
import proyectoContext from '../../context/marcas/proyectoContext'
import tareaContext from '../../context/sedes/tareaContext'

const FormTarea = () => {

    //Extraer si el proyecto esta activo
    const proyectosContext = useContext(proyectoContext)
    const { proyecto } = proyectosContext;

    //Obtener el state del tareas
    const tareasContext = useContext(tareaContext)
    const { tareaseleccionada, errortarea, agregarTarea, validarTarea, obtenerTareas, actualizarTarea, limpiartTarea } = tareasContext

    useEffect(() => {
        if(tareaseleccionada !== null) {
            setTarea(tareaseleccionada)
        } else {
            setTarea({
                nombre: '',
                direccion: '',
                longitud: '',
                latitud: '',
                aforo: '',
                id_marca: ''
            })
        }
    }, [tareaseleccionada])

    //State del formulario
    const [tarea, setTarea] = useState({
        nombre: '',
        direccion: '',
        latitud: '',
        longitud: '',
        aforo: '',
        id_marca: ''
    })

    //Extrer el nombre de la tarea
    const {nombre,direccion,latitud,longitud,aforo,id_marca} = tarea

    
    // Si no hay proyectos seleccionado
    if(!proyecto) return null

    // Array destructuring para extraer el proyecto actual
    const [proyectoActual] = proyecto;

    // Leer los valores del formulario
    const handleChange = e => {
        setTarea({
            ...tarea,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault()

        //Validar el proyecto
        if(nombre.trim() === ''){
            validarTarea()
            return
        }

        // if(direccion.trim() === ''){
        //     validarTarea()
        //     return
        // }

        // if(latitud.trim() === ''){
        //     validarTarea()
        //     return
        // }

        // if(longitud.trim() === ''){
        //     validarTarea()
        //     return
        // }


        //Si es una tarea editada o para crear
        if (tareaseleccionada === null) {

            //agregar la nueva tarea al state de tareas
            tarea.id_marca = proyectoActual.id
            agregarTarea(tarea)

        } else {
            //Actualizar tarea existente
            actualizarTarea(tarea)

            //Elimina la tarea seleccionada
            limpiartTarea()
        }

        //Obtener y filtrar las tareas
        obtenerTareas(proyectoActual.id)

        //reiniciar el form
        setTarea({
            nombre: '',
            direccion: '',
            latitud: '',
            longitud: '',
            aforo: '',
            id_marca: ''
        })

    }



    return (  
        <div className="formulario">
            <form
                onSubmit= {onSubmit}
            >
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre de sede"
                        name="nombre"
                        value={nombre}
                        onChange= {handleChange}
                    />
                </div>

                <br/>

                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Dirección de sede"
                        name="direccion"
                        value={direccion}
                        onChange= {handleChange}
                    />
                </div>

                <br/>

                <div className="contenedor-input">
                    <input
                        type="number"
                        className="input-text"
                        placeholder="Dirección (latitud)"
                        name="latitud"
                        value={latitud}
                        onChange= {handleChange}
                    />
                </div>

                <br/>

                <div className="contenedor-input">
                    <input
                        type="number"
                        className="input-text"
                        placeholder="Dirección (longitud)"
                        name="longitud"
                        value={longitud}
                        onChange= {handleChange}
                    />
                </div>

                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={tareaseleccionada ? "Editar tarea" :"Agregar tarea"}
                    />
                </div>
            </form>
            {errortarea ? <p className="mensaje error">Los campos son obligatorios</p> : null}
        </div>
    );
}
 
export default FormTarea;