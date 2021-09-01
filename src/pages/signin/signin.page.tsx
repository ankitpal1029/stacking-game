//import {useMutation} from '@apollo/client';
import React, {useState} from 'react';
import {useHistory} from 'react-router';
//import {LOGIN_USER} from '../../hooks/user/loginUser';
import "./signin.page.css";


const SignIn: React.FC = () => {
    const [ password, setPassword] = useState("")
    const [ email, setEmail] = useState("")
    const [ loginfail, setLoginFail ] = useState(false);
    const history = useHistory();

    //const [ login , { data } ] = useMutation(LOGIN_USER)

    //login({ variables: { email, password } });

    function submitHandler (e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        //if(data == null){
            //console.log(data);
            //setLoginFail(true);
            //console.log('fail');
        //} else{
            //setLoginFail(true);
            //history.push("/home");
        //}


    }


    return (
            <div className="center">
                <div className="container">
                    <form  className="white" onSubmit={submitHandler}>
                        <h5 className="grey-text text-darken-3">Sign In</h5>
                        <div className="input-field">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="input-field">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <div className="input-field">
                            <button className="btn lighten-1 z-depth-0" >Sign In</button>
                            <div className="red-text center">
                                { loginfail &&
                                <p> Please check your login details</p>}
                            </div>
                        </div>
                    </form>
                </div>
            </div>

    )
}

export default SignIn;
