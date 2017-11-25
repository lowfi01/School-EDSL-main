export default function(state = {
    table: [],
    tableSeason: [],
    dates: []
  } , action) {
  switch (action.type) {
    case 'GET_TABLE':
      //console.log(`GET_TABLE DATA `, action.payload.data[0].table)
      return {
        ...state,
        table: action.payload.data[0].table
      }
      break;
    case 'GET_TABLESEASON':
      return {
        ...state,
        tableSeason: action.payload.data
      }
      break;





  }


  return state
}