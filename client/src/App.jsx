import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Components
import Header from './components/Layout/Header';
import Clients from './components/Clients/Clients';
import NewClient from './components/Clients/NewClient';
import UpdateClient from './components/Clients/UpdateClient';
import NewProduct from './components/Products/NewProduct';
import Products from './components/Products/Products';
import UpdateProduct from './components/Products/UpdateProduct';
import NewOrder from './components/Orders/NewOrder';
import ClientOrders from './components/Orders/ClientOrders';
import Panel from './components/Panel/Panel';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Session from './components/Session';
import PrivateRoute from './components/PrivateRoute';
import Failed from './components/Alerts/Failed';

const App = ({ refetch, session }) => {
  const { getUser } = session;
  return (    
      <Router>
        <Fragment>
          <Header session={ session }/>
          <div className="container">
            <p className="text-right">{ (getUser) ? `Bienvenido: ${ getUser.name }` : null }</p>
            <Switch>
              <PrivateRoute exact path="/clientes" component={ Clients } session={ getUser }/>
              <PrivateRoute exact path="/cliente/nuevo" component={ NewClient } session={ getUser } />
              <PrivateRoute exact path="/cliente/editar/:id" component={ UpdateClient }/>
              <PrivateRoute exact path="/producto/nuevo" component={ NewProduct }/>
              <PrivateRoute exact path="/productos" component={ Products }/>
              <PrivateRoute exact path="/producto/editar/:id" component={ UpdateProduct }/>
              <PrivateRoute exact path="/pedido/nuevo/:id" component={ NewOrder } session={ getUser }/>
              <PrivateRoute exact path="/pedidos/:id" component={ ClientOrders }/>
              <PrivateRoute exact path="/panel" component={ Panel }/>
              <PrivateRoute exact path="/registro" component={ Register } session={ getUser }/>
              <Route exact path="/login" render={ () => <Login refetch={ refetch } /> }/>
              <Route render={ () => <Failed message="La ruta a la que intentas acceder no existe" /> }/>
            </Switch>
          </div>
        </Fragment>
      </Router>
  );  
}

const RootSession = Session(App);

export { RootSession };