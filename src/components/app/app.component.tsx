import React from 'react';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';

import Header from '../header/header.component';
import GamePage from '../../pages/game/game.page';


import '../../common/styles';
import './app.component.css';

import "materialize-css/dist/css/materialize.min.css";
import SignIn from '../../pages/signin/signin.page';
import SignUp from '../../pages/signup/signup.page';
import Home from '../../pages/home/home.component';


const App: React.FC = () => {
    return (
            <Router>
                <Header />
                <Switch>
                    <Route path="/game">
                        <GamePage/>
                    </Route>

                    <Route path="/signin">
                        <SignIn/>
                    </Route>

                    <Route path="/signup">
                        <SignUp />
                    </Route>

                    <Route path="/">
                        <Home/ >
                    </Route>


                </Switch>

            </Router>
    )
}


export default App;
