import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './components/autenticacion/Login'
import Marcas from './components/marcas/Marcas'

import AlertaState from './context/alertas/alertaState'
import ProyectoState from './context/marcas/proyectoState'
import TareaState from './context/sedes/tareaState'


function App() {
  return (
    <ProyectoState>
      <TareaState>
        <AlertaState>
          <Router>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/marcas" component={Marcas} />
            </Switch>
          </Router>
        </AlertaState>
      </TareaState>
    </ProyectoState>
  );
}

export default App;