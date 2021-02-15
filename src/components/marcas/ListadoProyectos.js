import React, {useContext, useEffect} from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Proyecto from './Proyecto'
import ProyectoContext from '../../context/marcas/proyectoContext'
import AlertaContext from '../../context/alertas/alertaContext'

const ListadoProyectos = () => {

    //Extraer proyectos de state inicial
    const proyectosContext = useContext(ProyectoContext)
    const { mensaje, proyectos, obtenerProyectos } = proyectosContext

    //Extraer alertas de state
    const alertaContext = useContext(AlertaContext)
    const { alerta, mostrarAlerta } = alertaContext

    //Obtener proyectos cuando carga el componente
    useEffect(() => {

        // si hay un error
        if(mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }

        obtenerProyectos()

        // eslint-disable-next-line
    }, [mensaje])

    // revisar si proyectos tiene contenido
    if(proyectos.length === 0) return <p>No hay establecimientos, comienza creando uno</p>

    return (  
        <ul className="listado-proyectos">

            { alerta ? ( <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}

            <TransitionGroup>
            {proyectos.map(proyecto => (
                <CSSTransition
                    key={proyecto.id}
                    timeout={200}
                    classNames="proyecto"
                >
                    <Proyecto
                        proyecto={proyecto}
                    />
                </CSSTransition>
            ))}
            </TransitionGroup>
        </ul>
    );
}
 
export default ListadoProyectos;