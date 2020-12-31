import React, {useContext} from 'react'
import {NavLink, useHistory} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import s from './Navbar.module.css'

export const Navbar = () => {
const history = useHistory()
    const auth = useContext(AuthContext)
    useContext(AuthContext)
    const logoutHandler = (event) => {
event.preventDefault()
        auth.logout()
        history.push('/')
    }

    return (

            <div className={s.navWrapper}>
<div className={s.Logo}>
    <a href='#'>My  Web  Project</a>
</div>

                <div className={s.Links}>
    <li><NavLink to ="/create" className={s.navlink} >Create</NavLink></li>
    <li><NavLink to ="/links" className={s.navlink}>Links</NavLink></li>
    <li><a href="/" onClick={logoutHandler} className={s.navlink}>Logout</a></li>
</div>
            </div>

    )
}