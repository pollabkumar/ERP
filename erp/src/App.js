import logo from './logo.svg';
import React, { useReducer } from 'react'
import './App.css';
import Home from './components/Home'
import Login from './components/Login'
import Registration from './components/Registration'
import { Route, Switch, withRouter } from 'react-router-dom'
import Nav from './widgets/Nav' 

import OtpForm from './components/OtpForm'

import {Provider} from './store/Context'
import {initialState,reducer} from './store/UserReducer'

const NavHideComp = (props) => {
  const { location } = props
  return (
    (location.pathname.match(/^\/(login|registration|reset-password)$/)) ? <div style={{ padding: '35px' }}></div> : <Nav />
  )
}

const NavHide = withRouter(NavHideComp)
 
function App() {  
  const [state,dispatch] = useReducer(reducer,initialState)
  return ( 
    <Provider value={{state,dispatch}}>
    <div className="app">
      <NavHide /> 
        <Switch>
          <Route path='/' exact={true} component={Home} />
          <Route path='/home' component={Home} />
          <Route path='/login' component={Login} /> 
          <Route path='/reset-password' component={OtpForm} />
          <Route path='/registration' component={Registration} />
        </Switch> 
    </div> 
    </Provider>
  );
}

export default App;
