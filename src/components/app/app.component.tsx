import React from 'react';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';

import Header from '../header/header.component';
import About from '../../pages/about/about.page';
import Home from '../../pages/home/home.page';


import '../../common/styles';
import './app.component.css';


const App: React.FC = () => {
    return (
        <Router>
            <Header />
            <Switch>
                <Route path="/about">
                    <About />
                </Route>
                <Route path="/">
                    <Home/>
                </Route>
            </Switch>
        </Router>
    )
}


export default App;
