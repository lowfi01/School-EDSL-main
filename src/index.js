import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import logger from 'redux-logger';

// IMPORT COMPONENTS
import AddTeamDivision from './components/add-team-to-division';
import Menu from './components/header';
import SignUpContainer from './components/login';
import SeasonSetup from './components/season-setup.js';
import ProcessRound from './components/process-round';
import roundUpdateLocal from './components/process-round/round-update-local';
import Ladder from './components/ladder.js';
import Table from './components/table.js';


// IMPORT REDUCERS
import reducers from './reducers';

// class App extends Component{     render(){         return(             <div>
//          <AddTeamDivision />             </div>         )     } }

const createStoreWithMiddleware = applyMiddleware(ReduxPromise, logger)(createStore);

ReactDOM.render(
  <Provider store={ createStoreWithMiddleware(reducers) }>
    <BrowserRouter>
      <div>
        <Menu />
        <Switch>
          <Route exact path="/" component={ AddTeamDivision } />
          <Route exact path="/season" component={ SeasonSetup } />
          <Route exact path="/round" component={ ProcessRound } />
          <Route exact path="/login" component={ SignUpContainer } />
          <Route exact path="/local" component={ roundUpdateLocal } />
          <Route exact path="/ladder" component={ Ladder } />
          <Route exact path="/table" component={ Table } />
          <Route component={ () => <div>Not found</div> } />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>, document.getElementById('root'));
