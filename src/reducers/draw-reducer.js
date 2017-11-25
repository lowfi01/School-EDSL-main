export default function (state = {
        draw: [],
        drawSetup: [],
        round: []
    } , action) {
    // create switch statement
    switch (action.type) {
        case 'GET_DRAW':
            //console.log(action.payload)
            return {
                ...state,
                draw: [...action.payload.data]
            }
            // alternative code return state.concat([action.payload.data]);
            break;
        case 'GET_DRAW_SETUP':
            return {
                ...state,
                drawSetup: [...action.payload.data]
            }
            break;
        case 'GET_DRAW_ROUND':
            return {
                ...state,
                round: [...action.payload.data]
            }
            break;
    }
    return state
}