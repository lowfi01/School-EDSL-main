
export default function (state = { teams: []}, action) {
    // create switch statement
    switch (action.type) {
        case 'GET_TEAMS':
            console.log(action.payload)
            console.log(`this is the teams state: `, state)
            return {...state, teams: [...action.payload.data, ...state.teams]};
            // alternative code return state.concat([action.payload.data]);
     
    }
    return state
}