import React, { useContext } from 'react';
import proyectoContext from '../../context/marcas/proyectoContext'
import tareaContext from '../../context/sedes/tareaContext'

const Proyecto = ({proyecto}) => {

    //Obtener el state del proyectos
    const proyectosContext = useContext(proyectoContext)
    const { proyectoActual } = proyectosContext    
    //Obtener el state del tareas
    const tareasContext = useContext(tareaContext)
    const { obtenerTareas } = tareasContext

    // Función para agregar el proyecto actual
    const seleccionarProyecto = id => {
        proyectoActual(id) // Fijar un proyecto actual
        obtenerTareas(id) // Filtrar las tareas cuando se da clic
    }

    return ( 
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={()=> { seleccionarProyecto(proyecto.id)}}
            >{proyecto.nombre}</button>
        </li>
     );
}
 
export default Proyecto;