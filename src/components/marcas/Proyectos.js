import React from 'react';
import Sidebar from '../layouts/Sidebar'
import Barra from '../layouts/Barra'
import FormTarea from '../sedes/FormTarea'
import ListadoTareas from '../sedes/ListadoTareas';

const Proyectos = () => {


    return ( 
        <div className="contenedor-app">
            <Sidebar />
            <div className="seccion-principal">
                <Barra />
                <main>
                    <FormTarea />
                    
                    <div className="contenedor-tareas">
                        <ListadoTareas />
                    </div>
                </main>
            </div>
        </div>
     );
}
 
export default Proyectos;