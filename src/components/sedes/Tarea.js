import React, {useContext} from 'react';
import tareaContext from '../../context/sedes/tareaContext'

const Tarea = ({tarea}) => {

    //Obtener el state del tareas
    const tareasContext = useContext(tareaContext)
    const { eliminarTarea, obtenerTareas, actualizarTarea, guardarTareaActual } = tareasContext

    //Funcion que se ejecuta cuando el usuario presiona eliminar tarea
    const tareaEliminar = id => {
        eliminarTarea(id, tarea.id_marca)
        obtenerTareas(tarea.id_marca)
    }

    //Funcion que modifica el estado de las tareas
    // const cambiarEstado = tarea => {
    //     if (tarea.estado) {
    //         tarea.estado=false
    //     } else {
    //         tarea.estado=true
    //     }
    //     actualizarTarea(tarea)
    // }

    const seleccionarTarea = tarea => {
        guardarTareaActual(tarea)
    }

    return ( 
        <li className="tarea sombra">
            <p>{tarea.nombre}</p>
            <div className="estado">
                {/* {tarea.estado
                ?
                    (
                        <button
                            type="button"
                            className="completo"
                            onClick={()=> cambiarEstado(tarea)}
                        >Completo</button>
                    )
                :
                    (
                        <button
                            type="button"
                            className="incompleto"
                            onClick={()=> cambiarEstado(tarea)}
                        >Incompleto</button>
                    )   
                } */}
            </div>

            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={()=> seleccionarTarea(tarea)}
                >Editar</button>
                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={()=>{ tareaEliminar(tarea.id) }}
                >Eliminar</button>
            </div>
        </li>
    );
}
 
export default Tarea;