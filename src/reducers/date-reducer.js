export default function (state = {
    dates: {}
  }, action) {
  // create switch statement
  switch (action.type) {
    case 'GET_DATES':
      console.log(`action`, action.payload.data[0])
      return {
        ...state,
        dates: action.payload.data[0]
      }
      break;

  }
  return state
}