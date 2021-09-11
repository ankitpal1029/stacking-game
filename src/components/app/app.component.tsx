import React, {useContext} from 'react';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';

import Header from '../header/header.component';
import GamePage from '../../pages/game/game.page';


import './app.component.css';

import "materialize-css/dist/css/materialize.min.css";
//import SignIn from '../../pages/signin/signin.page';
//import SignUp from '../../pages/signup/signup.page';
import Home from '../../pages/home/home.component';
import AuthProvider from '../../contexts/auth.context';
import GuardedRoute from '../../guards/auth.guard';

const App: React.FC = () => {
    return (
            <Router>
                <AuthProvider>
                    <Switch>
                            <GuardedRoute path="/game" component={GamePage}>
                                {/*<GamePage/>*/}
                            </GuardedRoute>

                        {/*
                            <Route path="/signin">
                            <SignIn/>
                        </Route>

                        <Route path="/signup">
                            <SignUp />
                        </Route>
                          */}

                        <Route path="/">
                            <Header />
                            <Home/ >
                        </Route>


                    </Switch>

                </AuthProvider>
            </Router>
    )
}


export default App;
