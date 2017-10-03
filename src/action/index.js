

import axios from 'axios';

const localHost = 'http://localhost:3000/'
const heroku = 'https://guarded-shelf-10743.herokuapp.com/'


export function updateDivision(term, id){
    //find team & update division.divCode to term
    
    //Term is passed down as a component state
    //value is defined from the dropDownMenu
    //value of term is required as we will update the team: divisionCode with term
    //term is passed as a request.body.value, in this instance req.body.term
    
    
    // API will _pick values passed as a url:variable
    // API will set final value
    
const request = axios.patch(`/teams/${id}`, {term})
            console.log(`Request: `, request)
            console.log(`id: `, id)
            console.log(`term: `, term)
            
            

                return {
                    type: 'PATCH_TEAM_DIVISION',
                    // Send promise back as payload
                    payload: request
                };
}

// CREATE AN ACTION FOR REMOVING TEAM FROM DIVISION

// logic
// - SET division to unset
// - CREATE UNSET VALUE in MENU-DROP-DOWN 

export function getTeams() {

const request = axios.get(`/teams`)

    console.log(`Request: `, request)

    return {
        type: 'GET_TEAMS',
        // Send promise back as payload
        payload: request
    };
}



export function getDivision(divisionName) {
    const request = axios.get(`/teams/${divisionName}`)

    //console.log(`Request: `, request)

    return {
        type: 'GET_DIVISION',
        // Send promise back as payload
        payload: request
    };
}