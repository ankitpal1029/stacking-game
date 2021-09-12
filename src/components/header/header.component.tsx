import React, {useContext, useEffect, useState} from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
import {AuthContext} from '../../contexts/auth.context';
import M from "materialize-css/dist/js/materialize.min.js";
import './header.component.css';



const Header: React.FC = () => {
    //const [ logout ] = useMutation(LOGOUT_USER);
    const history = useHistory();

    const userCtx = useContext(AuthContext);
    console.log(userCtx);

    //function logoutHandler(){
        //logout();
        //history.push("/signin");
    //}
    const [ loginStatus, setLoginStatus ] = useState(false);
    let responseSuccessGoogle = (response: any):void => {
        axios({
            method:"POST",
            url:"https://stacking-game.herokuapp.com/googlelogin",
            data: { tokenId: response.tokenId}
        }).then((response) => {
            console.log(`Google login success:`, response);
            if(!response.data.auth){
                setLoginStatus(false);
                console.log("response.data.auth is false");
                console.log(response);
            } else {
                setLoginStatus(true);
                console.log("should make token");
                localStorage.setItem("token",response.data.token)
                window.location.reload(false);
                M.toast({ html: `User Logged In`}, 500);
            }
        });
    }

    let responseErrorGoogle = (response:any): void => {
        console.log("google verification failed");
        console.log(response);
    }

    let logOutUser = () =>{
        localStorage.removeItem("token");
        window.location.reload(false);
        M.toast({ html: `User Logged Out`}, 500);

    }

    //const userAuthenticated = () => {
        //axios.get("http://localhost:8000/isUserAuth", {
            //headers: {
                //"x-access-token": localStorage.getItem("token"),
            //}
        //}).then((response) => {
            //console.log(response);
        //})
    //}
    return (
        <header>
            <nav>
                <ul>
                    { userCtx && !userCtx.auth &&
                    <li>
                        <GoogleLogin
                            clientId="690778545706-nck63lit5qofrpe4o0qs65kk7h9un14u.apps.googleusercontent.com"
                            buttonText="Login"
                            onSuccess={responseSuccessGoogle}
                            onFailure={responseErrorGoogle}
                            cookiePolicy={'single_host_origin'}
                          />
                    </li>

                    }


                    {userCtx && userCtx.auth && 
                        <li style={{
                                paddingLeft: "20px"
                            }} 
                            onClick={logOutUser}>
                                LogOut
                        </li>

                    }

                 </ul>
            
            </nav>
        </header>
    )
}
export default Header;
