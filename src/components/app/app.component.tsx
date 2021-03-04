import React from 'react';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import {ApolloProvider} from '@apollo/client';

import Header from '../header/header.component';
import Home from '../../pages/home/home.page';


import '../../common/styles';
import './app.component.css';
import client from '../../common/apollo-client';

import "materialize-css/dist/css/materialize.min.css";
import Login from '../../pages/login/login.page';


const App: React.FC = () => {
    return (
        <ApolloProvider client={client}>
            <Router>
                <Header />
                <Switch>
                    <Route path="/login">
                        <Login/>
                    </Route>
                    <Route path="/">
                        <Home/>
                    </Route>
                </Switch>
            </Router>
        </ApolloProvider>
    )
}


export default App;
