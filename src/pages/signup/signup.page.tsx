import {useMutation} from "@apollo/client";
import React, {useState} from "react";
import {CREATE_USER} from "../../hooks/user/useCreateUser";
import "./signup.page.css";


const SignUp:React.FC = () => {
    const [ firstName, setfirstName ] = useState("")
    const [ lastName, setlastName] = useState("")
    const [ password, setPassword] = useState("")
    const [ email, setEmail] = useState("")

    const [ createUser, { data } ] = useMutation(CREATE_USER)

    function submitHandler(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        createUser({ variables: {firstName, lastName , email, password} } );
        console.log(data);


    }



    return(
        <div className="center">
            <div className="container">
                <form className="white" onSubmit={submitHandler}>
                    <h5 className="grey-text text-darken-3">Sign Up</h5>
                    <div className="input-field">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" id="firstName" onChange={(e) => setfirstName(e.target.value)}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" id="lastName" onChange={(e) => setlastName(e.target.value)} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className="input-field">
                        <button className="btn lighten-1 z-depth-0">Sign Up</button>
                    </div>
                    <div className="red-text center">
                    </div>

                </form>
            </div>
        </div>
    )
}


export default SignUp;
