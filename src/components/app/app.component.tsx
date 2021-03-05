import React from 'react';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import {ApolloProvider} from '@apollo/client';

import Header from '../header/header.component';
import GamePage from '../../pages/game/game.page';


import '../../common/styles';
import './app.component.css';
import client from '../../common/apollo-client';

import "materialize-css/dist/css/materialize.min.css";
import SignIn from '../../pages/signin/signin.page';
import SignUp from '../../pages/signup/signup.page';


const App: React.FC = () => {
    return (
        <ApolloProvider client={client}>
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
                </Switch>

            </Router>
        </ApolloProvider>
    )
}


export default App;
