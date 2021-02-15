
import React, { useReducer } from 'react';
import TareaContext from './tareaContext'
import TareaReducer from './tareaReducer'

import axios from 'axios'

import {
        TAREAS_PROYECTO,
        AGREGAR_TAREA,
        VALIDAR_TAREA,
        ELIMINAR_TAREA,
        TAREA_ACTUAL,
        ACTUALIZAR_TAREA,
        LIMPIAR_TAREA
    } from '../../types'

const TareaState = props => {
    const initialState = {
        tareasproyecto: [],
        errortarea: false,
        tareaseleccionada: null
    }

    const [state, dispatch] = useReducer(TareaReducer, initialState)

    // Crear las funciones 
    const obtenerTareas = async proyecto => {
        try {

            const params = new URLSearchParams()

            const config = {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }

            const url = 'http://aforoactual.mypressonline.com/index.php/sedes/'+proyecto
            const resultado = await axios.get(url, params, config)
            
            dispatch({
                type: TAREAS_PROYECTO,
                payload: resultado.data
            })
        } catch (error) {
            
        }
    }

    //Agregar una tarea al proyecto
    const agregarTarea = async  tarea => {
        try {

            tarea.aforo = "0"

            const params = new URLSearchParams()
            params.append('nombre', tarea.nombre)
            params.append('direccion', tarea.direccion)
            params.append('latitud', tarea.latitud)
            params.append('logitud', tarea.longitud)
            params.append('aforo', tarea.aforo )

            const config = {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }
            
            console.log(tarea)
            const url = 'http://aforoactual.mypressonline.com/index.php/sedes/'+tarea.id_marca
            console.log(url)
            const resultado = await axios.post(url, params, config)
            console.log(resultado)
            dispatch({
                type: AGREGAR_TAREA,
                payload: resultado.data
            })

        } catch (error) {
            
        }
        
    }

    //Valida y muestra un error en caso de que sea necesario
    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    //Eliminar tarea por id
    const eliminarTarea = async (id, proyecto) => {
        try {

            const params = new URLSearchParams()

            const config = {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }
            
            const url = 'http://aforoactual.mypressonline.com/index.php/sedes/' + id
            await axios.delete(url, params, config)

            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            })
        } catch (error) {
            console.log(error)
        }
    }

    //Modificar una tarea
    const actualizarTarea = async tarea => {
        try {
            
            const params = new URLSearchParams()
            params.append('nombre', tarea.nombre)
            params.append('direccion', tarea.direccion)
            params.append('latitud', tarea.latitud)
            params.append('longitud', tarea.longitud)
            params.append('aforo', tarea.aforo)
            params.append('id_marca', tarea.id_marca)

            const config = {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }
            
            const url = 'http://aforoactual.mypressonline.com/index.php/sedes/'+tarea.id
            const resultado = await axios.post(url, params, config)

            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: tarea
            })
        } catch (error) {
            console.log(error)
        }
    }

    //Extrae una tarea para su edicion
    const guardarTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }

    // Elimina la tareaseleccionada
    const limpiartTarea = () => {
        dispatch({
            type: LIMPIAR_TAREA
        })
    }

    return (
        <TareaContext.Provider
            value={{
                tareasproyecto: state.tareasproyecto,
                errortarea: state.errortarea,
                tareaseleccionada: state.tareaseleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                guardarTareaActual,
                actualizarTarea,
                limpiartTarea
            }}
        >
            {props.children}
        </TareaContext.Provider>
    )
}

export default TareaState