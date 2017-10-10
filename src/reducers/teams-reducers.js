
export default function (state = { teams: []}, action) {
    // create switch statement
    switch (action.type) {
        case 'GET_TEAMS':
            //console.log(`payload get teams:`, action.payload)
            //console.log(`this is the teams state: `, state)
            return {...state, teams: [...action.payload.data]};
            //return {...state, teams: [...action.payload.data, ...state.teams]};
            // alternative code return state.concat([action.payload.data]);
        case 'PATCH_TEAM_DIVISION':
            //console.log(`this is working`)
            //console.log(`this is the payload from PATCH_DIVISION: `, action.payload)
            return {...state, teams: [...state.teams]}
            // }

    }
    return state
}