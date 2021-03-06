import {useMutation} from '@apollo/client';
import React, {useState} from 'react';
import {LOGIN_USER} from '../../hooks/user/loginUser';
import "./signin.page.css";


const SignIn: React.FC = () => {
    const [ password, setPassword] = useState("")
    const [ email, setEmail] = useState("")

    const [ login , { data } ] = useMutation(LOGIN_USER)

    async function submitHandler (e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        await login({ variables: { email, password } });
        console.log(data);


    }


    return (
            <div className="center">
                <div className="container">
                    <form  className="white" onSubmit={submitHandler}>
                        <h5 className="grey-text text-darken-3">SignIn</h5>
                        <div className="input-field">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="input-field">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <div className="input-field">
                            <button className="btn lighten-1 z-depth-0" >SignIn</button>
                            <div className="red-text center">
                            </div>
                        </div>
                    </form>
                </div>
            </div>

    )
}

export default SignIn;
