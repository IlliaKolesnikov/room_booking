import axios from 'axios';
import jwtDecode from 'jwt-decode';

export function signIn(userName, userPassword, history) {
  return dispatch => {
    axios.post('/api/signin', {
      username: userName,
      password: userPassword
    })
      .then(json => {
        localStorage.setItem('token', json.data.data)
        const decoded = jwtDecode(json.data.data)
        localStorage.setItem('mail', decoded.mail)
        localStorage.setItem('user', decoded._id)
        dispatch({ type: 'AUTH_SUCCESS' })
        history.push('/home')
      })
      .catch(error => {
        dispatch({ type: 'ERROR_FOUND', payload: error.response.data.error })
      })

  }
}

export function signOut() {
  return dispatch => {
    localStorage.setItem('token', '')
    localStorage.setItem('mail', '')
    localStorage.setItem('user', '')
    dispatch({ type: 'LOG_OUT' })
  }
}

export function signUp(userName, userPassword, history) {
  return dispatch => {
    axios.post('/api/signup', {
      username: userName,
      password: userPassword
    })
      .then(() => {
        dispatch(signIn(userName, userPassword, history))
      })
      .catch(error => {
        dispatch({ type: 'ERROR_FOUND', payload: error.response.data.error })
      })
  }
}


