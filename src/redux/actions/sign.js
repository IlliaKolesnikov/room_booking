import axios from 'axios';
import jwtDecode from 'jwt-decode';

export function signIn(userName, userPassword, history) {
  return dispatch => {
    axios.post("/api/signin", {
      username: userName,
      password: userPassword
    })
      .then(json => {
        localStorage.setItem('token', json.data.data)
        const decoded = jwtDecode(json.data.data)
        localStorage.setItem('mail', decoded.mail)
        dispatch({type: "AUTH_SUCCESS"})
        history.push('/home')
      })
      .catch(error => {
        dispatch({type: "ERROR_FOUND", payload: error.response.data.error})
      })

  }
}
export function signOut() {
  return dispatch => {
    localStorage.setItem('token', "");
    localStorage.setItem('mail', "");
    dispatch({type: "LOG_OUT"})
  }
}

export function signUp(userName, userPassword) {
  return dispatch => {
    axios.post("/api/signup", {
      username: userName,
      password: userPassword
    })
      .catch(error=> {
        dispatch({type: "ERROR_FOUND", payload: error.response.data.error})
      })
  }
}


