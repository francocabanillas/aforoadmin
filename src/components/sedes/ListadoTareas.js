import React, {Fragment, useContext} from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Tarea from './Tarea'
import proyectoContext from '../../context/marcas/proyectoContext'
import tareaContext from '../../context/sedes/tareaContext'

const ListadoTareas = () => {

    //Extraer proyectos de state inicial
    const proyectosContext = useContext(proyectoContext)
    const { proyecto, eliminarProyecto } = proyectosContext;

    //Obtener el state del tareas
    const tareasContext = useContext(tareaContext)
    const { tareasproyecto } = tareasContext

    // Si no hay proyectos seleccionado
    if(!proyecto) return <h2>Selecciona un establecimiento</h2>

    // Array destructuring para extraer el proyecto actual
    const [proyectoActual] = proyecto;

    // Elimina un proyecto
    const onClickEliminar = () => {
        eliminarProyecto(proyectoActual.id)
    }
    

    return ( 
        <Fragment>
            <h1>Establecimiento: {proyectoActual.nombre}</h1>
            <h2>Imagen: {proyectoActual.imagen}</h2>
            <ul className="listado-tareas">
                { tareasproyecto.length === 0 
                ? (
                    <li className="tarea"><p>No hay sedes</p></li>
                  )
                : 
                    <TransitionGroup>
                        {tareasproyecto.map(tarea => (
                            <CSSTransition
                                key={tarea.id}
                                timeout={200}
                                classNames="tarea"
                            >
                                <Tarea
                                    
                                    tarea={tarea}
                                />
                            </CSSTransition>
                        ))}                             
                    </TransitionGroup>
                
                }
            </ul>

            <button 
                type="button"
                className="btn btn-eliminar"
                onClick={ onClickEliminar }
            >Eliminar establecimiento &times;</button>
        </Fragment>
     );
}
 
export default ListadoTareas;