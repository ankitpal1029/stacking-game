import {Component, MouseEvent} from 'react';
import "./signup.page.css";


class SignUp extends Component<{},{
    firstName:string,
    lastName:string,
    email:string,
    password:string
}>{

    constructor(props: any){
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: ""
        };
        this.changeHandler = this.changeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this)

    }

    changeHandler(e:React.ChangeEvent<HTMLInputElement>){
        const { id, value } = e.target;
        this.setState({
            ...this.state,
            [id]: value
        },() => console.log(this.state));
         

    }

    submitHandler(e: MouseEvent){
        e.preventDefault();
        console.log(this.state);
    }


    render(){
        return(
            <div className="center">
                <div className="container">
                    <form className="white">
                        <h5 className="grey-text text-darken-3">Sign Up</h5>
                        <div className="input-field">
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" id="firstName" onChange={this.changeHandler}/>
                        </div>
                        <div className="input-field">
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" id="lastName" onChange={this.changeHandler} />
                        </div>
                        <div className="input-field">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" onChange={this.changeHandler} />
                        </div>
                        <div className="input-field">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" onChange={this.changeHandler}/>
                        </div>
                        <div className="input-field">
                            <button className="btn lighten-1 z-depth-0" onClick={this.submitHandler}>Sign Up</button>
                        </div>
                        <div className="red-text center">
                        </div>

                    </form>
                </div>
            </div>
        )
    }
}


export default SignUp;
