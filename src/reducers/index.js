import {combineReducers} from 'redux';

import teamReducer from './teams-reducers';
import divisionReducer from './division-reducers';

const rootReducer = combineReducers({
    teams : teamReducer,
    divisions: divisionReducer

});

export default rootReducer;
