import {useMutation} from '@apollo/client';
import React from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import {LOGOUT_USER} from '../../hooks/user/logoutUser';



const Header: React.FC = () => {
    const [ logout ] = useMutation(LOGOUT_USER);
    const history = useHistory();

    function logoutHandler(){
        logout();
        history.push("/signin");
    }
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/game">Game</NavLink>
                    </li>
                    {/*
<li>
                        <NavLink to="/signin">SignIn</NavLink>
                    </li>
                    <li>
                        <NavLink to="/signup">SignUp</NavLink>
                    </li>
                    <li onClick={logoutHandler}>
                        LogOut
                    </li>

                      */}                </ul>
            
            </nav>
        </header>
    )
}


export default Header;
