"use strict"

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxPromise from 'redux-promise';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import logger from 'redux-logger';



//IMPORT COMPONENTS
import AddTeamDivision from './components/add-team-to-division'
import Menu from './components/header';
import SignUpContainer from './components/login';
import SeasonSetup from './components/season-setup.js'

//IMPORT REDUCERS
import reducers from './reducers'

// class App extends Component{
//     render(){
//         return(
//             <div>
//                 <AddTeamDivision />
//             </div>
//         )
//     }
// }

const createStoreWithMiddleware = applyMiddleware(ReduxPromise, logger)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
         <BrowserRouter> 
            <div>
                <Menu />
                <Switch>
                   
                    <Route exact path="/" component={AddTeamDivision} />
                    <Route exact path="/season" component={SeasonSetup} />
                    <Route component={() => <div>Not found</div>} />
                    <Route exact path="/login" component={SignUpContainer} />

                </Switch>
            </div>
        </BrowserRouter>
    </Provider>, document.getElementById('root'));




