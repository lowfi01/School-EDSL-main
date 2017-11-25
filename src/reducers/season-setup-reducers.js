export default function(state = {
    season: [],
    table: []
  } , action) {
  switch (action.type) {
    case 'ADD_SEASON':
      return {
        season: action.payload
      }
      break;

  }


  return state
}