export default function (state = {
    divisions: []
}, action) {
    // create switch statement
    switch (action.type) {
        case 'GET_DIVISION':
            console.log(action.payload)
            return {...state, divisions: 
                [...action.payload.data]}
            // alternative code return state.concat([action.payload.data]);

    }
    return state
}