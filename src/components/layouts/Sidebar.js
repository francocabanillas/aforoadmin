import React from 'react';
import NuevoProyecto from '../marcas/NuevoProyecto'
import ListadoProyectos from '../marcas/ListadoProyectos'

const Sidebar = () => {
    return (  
        <aside>
            <h1><span>Aforo</span> Perú</h1>
            <NuevoProyecto

            />
            <div className="proyectos">
                <h2>Establecimientos</h2>
                <ListadoProyectos />
            </div>
        </aside>
    );
}
 
export default Sidebar;