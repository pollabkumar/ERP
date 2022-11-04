import React,{useContext} from 'react' 
import {NavLink} from 'react-router-dom'
import { BiLogOut } from "react-icons/bi"; 
import Context from '../store/Context' 
import { useHistory } from 'react-router-dom';

function Nav(props) { 
    const {state,dispatch} = useContext(Context)   
    const history = useHistory()
    const logOut = ()=>{
        localStorage.removeItem('token');
        history.push('/login')

    } 
    return ( 
        <ul className='ulNav'>
            <li><NavLink to="/home" activeClassName="active"> Home</NavLink></li>
            <li><NavLink to="/login" activeClassName="active"> Login</NavLink></li>
            <li><NavLink to="/registration" activeClassName="active"> Registration</NavLink></li>

            <li className="logOut" onClick={logOut}> LogOut <BiLogOut style={{fontSize:'22'}} /></li>
            <li style={{float:'right'}}><NavLink to="/test"> {state.name}</NavLink></li>
        </ul> 
    )
}

export default Nav
