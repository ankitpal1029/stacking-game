import React from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';



const Header: React.FC = () => {
    //const [ logout ] = useMutation(LOGOUT_USER);
    const history = useHistory();

    //function logoutHandler(){
        //logout();
        //history.push("/signin");
    //}
    let responseSuccessGoogle = (response: any):void => {
        console.log(response);
        axios({
            method:"POST",
            url:"http://localhost:8000/googlelogin",
            data: { tokenId: response.tokenId}
        }).then((response) => {
            console.log(response);
        });
    }

    let responseErrorGoogle = (response:any): void => {
    }
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/game">Game</NavLink>
                    </li>
                    
                    {/*<li>
                        <NavLink to="/signin">SignIn</NavLink>
                    </li>
                      */}
                    <li>
                        <GoogleLogin
                            clientId="690778545706-nck63lit5qofrpe4o0qs65kk7h9un14u.apps.googleusercontent.com"
                            buttonText="Login"
                            onSuccess={responseSuccessGoogle}
                            onFailure={responseErrorGoogle}
                            cookiePolicy={'single_host_origin'}
                          />
                    </li>

                    <li>
                        <NavLink to="/signup">SignUp</NavLink>
                    </li>
                    <li >
                        LogOut
                    </li>

                 </ul>
            
            </nav>
        </header>
    )
}
export default Header;
