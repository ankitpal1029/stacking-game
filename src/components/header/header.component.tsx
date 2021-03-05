import React from 'react';
import {NavLink} from 'react-router-dom';



const Header: React.FC = () => {
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/game">Game</NavLink>
                    </li>
                    <li>
                        <NavLink to="/signin">SignIn</NavLink>
                    </li>
                    <li>
                        <NavLink to="/signup">SignUp</NavLink>
                    </li>
                </ul>
            
            </nav>
        </header>
    )
}


export default Header;
