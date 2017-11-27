import axios from 'axios';

// const localHost = 'http://localhost:3000/';
// const heroku = 'https://guarded-shelf-10743.herokuapp.com/';

export function updateDivision(term, id) {
  // find team & update division.divCode to term

  // Term is passed down as a component state
  // value is defined from the dropDownMenu
  // value of term is required as we will update the team: divisionCode with term
  // term is passed as a request.body.value, in this instance req.body.term

  // API will _pick values passed as a url:variable
  // API will set final value

  const request = axios.patch(`/teams/${id}`, {
    term
  });
  console.log('Request: ', request);
  console.log('id: ', id);
  console.log('term: ', term);

  return {
    type: 'PATCH_TEAM_DIVISION',
    // Send promise back as payload
    payload: request,
  };
}

// CREATE AN ACTION FOR REMOVING TEAM FROM DIVISION

// logic
// - SET division to unset
// - CREATE UNSET VALUE in MENU-DROP-DOWN

export function getTeams(team = 'div00') {
  console.log(`this is axios call for term team = : ${team}`);
  const request = axios.get(`/teams/${team}`);

  // console.log(`Request: `, request)

  return {
    type: 'GET_TEAMS',
    // Send promise back as payload
    payload: request,
  };
}

export function getDivision(divisionName) {
  const request = axios.get(`/divisions/${divisionName}`);

  // console.log(`Request: `, request)

  return {
    type: 'GET_DIVISION',
    // Send promise back as payload
    payload: request,
  };
}

export function postSeasonSetup(season) {
  return {
    type: 'ADD_SEASON',
    payload: season,
  };
}


export function postRound(term) {
  console.log(term)
  const request = axios.post(`/rounds`, {
    term
  });
  console.log('Request: ', request);
  console.log('term: ', term);

  return {
    type: 'POST_ROUND',
    // Send promise back as payload
    payload: request
  };
}


export function getDrawSetup(season, division) {

  const request = axios.get(`/rounds/${division}/${season}`);


  console.log(request)
  return {
    type: 'GET_DRAW_SETUP',
    payload: request
  }

}

export function getDrawRound(season, division, roundNumber) {

  const request = axios.get(`/rounds/${division}/${season}/${roundNumber}`);

  console.log(`getDrawRound: `, request)
  return {
    type: 'GET_DRAW_ROUND',
    payload: request
  }

}

export function getDraw() {

  const request = axios.get('/rounds');

  return {
    type: 'GET_DRAW',
    payload: request
  }

}

export function patchRound(home, away, id) {

  const request = axios.patch(`/rounds/${home}/${away}/${id}`);

  return {
    type: 'PATCH_ROUND',
    payload: request
  };

}

export function patchRoundLock(lock, id) {

  const request = axios.patch(`/rounds/${lock}/${id}`);

  return {
    type: 'LOCK_ROUND',
    payload: request
  }

}


export function postTable(term, div, season, time, dates) {
  const request = axios.post(`/tables/${div}/${season}/${time}`, {
    term,
    dates
  });


  return {
    type: 'POST_TABLE',
    // Send promise back as payload
    payload: request
  };
}


// export function getTable() {
//   const request = axios.get(`/tables`);

//   // console.log(`Request: `, request)

//   return {
//     type: 'GET_TABLE',
//     // Send promise back as payload
//     payload: request,
//   };
// }

export function getTable(season, division) {
  const request = axios.get(`/tables/season/${season}/${division}`);

  // console.log(`Request: `, request)

  return {
    type: 'GET_TABLE',
    // Send promise back as payload
    payload: request,
  };
}


export function getSeasonTable() {
  const request = axios.get(`/tables/seasons`);

  // console.log(`Request: `, request)

  return {
    type: 'GET_TABLESEASON',
    // Send promise back as payload
    payload: request,
  };
}
export function postDates(dates) {
  const request = axios.post(`/dates`, {
    dates
  });


  return {
    type: 'POST_DATES',
    // Send promise back as payload
    payload: request
  };
}


export function getDate() {
  const request = axios.get(`/dates`);

  // console.log(`Request: `, request)

  return {
    type: 'GET_DATES',
    // Send promise back as payload
    payload: request,
  };
}


export function getLockTable(season, division) {
  const request = axios.get(`/tableslock/season/${season}/${division}`);

  // console.log(`Request: `, request)

  return {
    type: 'GET_LOCK_TABLE',
    // Send promise back as payload
    payload: request,
  };
}



export function getDrawLockSetup(season, division) {

  const request = axios.get(`/roundslock/${division}/${season}`);


  console.log(request)
  return {
    type: 'GET_DRAW_LOCK_SETUP',
    payload: request
  }

}