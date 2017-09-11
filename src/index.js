
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxPromise from 'redux-promise';

//IMPORT COMPONENTS
import AddTeamDivision from './components/add-team-to-division'


//IMPORT REDUCERS
import reducers from './reducers'

class App extends Component{
    render(){
        return(
            <h1>
                <AddTeamDivision />
            </h1>
        )
    }
}

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
    <App/>
</Provider>, document.getElementById('root'));




