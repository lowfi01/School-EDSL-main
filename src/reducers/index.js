import { combineReducers } from 'redux';

import teamReducer from './teams-reducers';
import divisionReducer from './division-reducers';
import seasonReducer from './season-setup-reducers';
import getDrawReducer from './draw-reducer';
import tableReducer from './table-reducer';
import datesReducer from './date-reducer';

const rootReducer = combineReducers({
    teams: teamReducer,
    divisions: divisionReducer,
    season: seasonReducer,
    draw: getDrawReducer,
    table: tableReducer,
    dates: datesReducer
});

export default rootReducer;
