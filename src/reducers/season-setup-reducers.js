export default function(state = {season: []}, action){
    switch(action.type){
        case 'ADD_SEASON':
        return { season: action.payload}
    }

    return state
}