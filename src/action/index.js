

import axios from 'axios';


export function getTeams() {

const request = axios.get('http://localhost:3000/teams')

    console.log(`Request: `, request)

    return {
        type: 'GET_TEAMS',
        // Send promise back as payload
        payload: request
    };
}



export function getDivision(divisionName) {
    const request = axios.get(`http://localhost:3000/teams/${divisionName}`)

    console.log(`Request: `, request)

    return {
        type: 'GET_DIVISION',
        // Send promise back as payload
        payload: request
    };
}