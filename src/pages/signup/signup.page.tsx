import React, {useState} from "react";
import { useHistory} from 'react-router';
import "./signup.page.css";


const SignUp:React.FC = () => {
    const [ firstName, setfirstName ] = useState("")
    const [ lastName, setlastName] = useState("")
    const [ password, setPassword] = useState("")
    const [ email, setEmail] = useState("")

    //const [ createUser, { data } ] = useMutation(CREATE_USER)
    const history = useHistory();

    async function submitHandler(e: React.FormEvent<HTMLFormElement>){
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
