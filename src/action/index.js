

import axios from 'axios';


export function updateDivision(term, id){
    //find team & update division.divCode to term
    
    //Term is passed down as a component state
    //value is defined from the dropDownMenu
    
    
    // API will _pick values passed as a url:variable
    // API will set final value
    
    const request = axios.patch(`http://localhost:3000/teams/${id}`, {term}) 
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

const request = axios.get('http://localhost:3000/teams')

    //console.log(`Request: `, request)

    return {
        type: 'GET_TEAMS',
        // Send promise back as payload
        payload: request
    };
}



export function getDivision(divisionName) {
    const request = axios.get(`http://localhost:3000/teams/${divisionName}`)

    //console.log(`Request: `, request)

    return {
        type: 'GET_DIVISION',
        // Send promise back as payload
        payload: request
    };
}