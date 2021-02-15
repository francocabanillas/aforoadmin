import React, { useReducer } from 'react';
import proyectoContext from './proyectoContext'
import proyectoReducer from './proyectoReducer'
import axios from 'axios'

import {
    FORMULARIO_PROYECTO,
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTO,
    PROYECTO_ERROR,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO
    } from '../../types'

import clienteAxios from '../../config/axios'

const ProyectoState = props => {


    const initialState = {
        proyectos : [],
        formulario : false,
        errorformulario: false,
        proyecto: null,
        mensaje: null
    }

    //Dispatch para ejecutar las funciones
    const [state, dispatch] = useReducer(proyectoReducer, initialState)

    // Serie de funciones para el CRUD
    const mostrarFormulario = () => {
        dispatch(
            {
                type: FORMULARIO_PROYECTO
            }
        )
    }

    //Obtener los proyectos
    const obtenerProyectos = async () => {
        try {

            const params = new URLSearchParams()

            const config = {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }
            
            const url = 'http://aforoactual.mypressonline.com/index.php/marcas'

            const resultado = await axios.get(url, params, config)

            dispatch({
                type: OBTENER_PROYECTOS,
                payload: resultado.data
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })        
        }
    }

    // Agregar nuevo proyecto
    const agregarProyecto = async proyecto => {

        try {
            
            const params = new URLSearchParams()
            params.append('nombre', proyecto.nombre)
            params.append('imagen', proyecto.url)

            const config = {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }
            
            const url = 'http://aforoactual.mypressonline.com/index.php/marcas'

            const resultado = await axios.post(url, params, config)

            dispatch({
                type: AGREGAR_PROYECTO,
                payload: resultado.data
            })

        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })        
        }
        
    }

    const mostrarError = () => {
        dispatch({
            type: VALIDAR_FORMULARIO
        })
    }

    //Selecciona el proyecto que el usuario dio clic
    const proyectoActual = proyectoId => {
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyectoId
        })
    }

    const eliminarProyecto = async id => {
        try {

            const params = new URLSearchParams()

            const config = {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }
            
            const url = 'http://aforoactual.mypressonline.com/index.php/marcas/' + id
            await axios.delete(url, params, config)

            dispatch({
                type: ELIMINAR_PROYECTO,
                payload: id
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })        
        }
    }

    return (
        <proyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                formulario: state.formulario,
                errorformulario: state.errorformulario,
                proyecto: state.proyecto,
                mensaje: state.mensaje,
                mostrarFormulario,
                obtenerProyectos,
                agregarProyecto,
                mostrarError,
                proyectoActual,
                eliminarProyecto
            }}
        >
            {props.children}
        </proyectoContext.Provider>
    )

}

export default ProyectoState