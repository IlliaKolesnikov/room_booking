const initialState = {
  error: null,
  isAuth: false,
};

function sign(state = initialState, action) {
  switch (action.type) {
    case 'AUTH_SUCCESS':
      return { ...state, isAuth: true };
    case 'LOG_OUT':
      return { ...state, isAuth: false, error: null };
    case 'ERROR_FOUND':
      return { ...state, error: action.payload };
    case 'MESSAGE_CLOSED':
      return { ...state, error: null };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

export default sign;
