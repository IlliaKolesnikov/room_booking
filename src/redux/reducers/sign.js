const initialState = {
  error: null,
  mail: null
}

function sign(state = initialState, action){
  switch(action.type){
    case "AUTH_SUCCESS":
      return {...state, mail: action.payload} // POCHTA I TOKEN
    case "LOG_OUT":
      return {...state, mail: null, error: null}
    case "ERROR_FOUND":
      return {...state, error: action.payload}
    case "MESSAGE_CLOSED":
      return {...state, error: null}
    case "SET_ERROR":
      return {...state, error: action.payload}
    default:
      return state
  }
}

export default sign
