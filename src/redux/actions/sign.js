import axios from 'axios'
import jwtDecode from 'jwt-decode'

export function signIn(userName, userPassword) {
  return dispatch => {
    axios.post('/api/signin', {
      username: userName,
      password: userPassword
    })

      .then(json => {
        window.localStorage.setItem('token', json.data.data)
        const decoded = jwtDecode(json.data.data)
        window.localStorage.setItem('mail', decoded.mail)
        dispatch({ type: 'AUTH_SUCCESS' })
      })
      .catch(error => {
        dispatch({ type: 'ERROR_FOUND', payload: error.response.data.error })
      })

  }
}

export function signOut(userName, userPassword) {
  return dispatch => {
    window.localStorage.setItem('token', '')
    window.localStorage.setItem('mail', '')
    console.log(localStorage)
    dispatch({ type: 'LOG_OUT' })
  }
}

export function signUp(userName, userPassword) {
  return dispatch => {
    axios.post('/api/signup', {
      username: userName,
      password: userPassword
    })
      .catch(error => {
        dispatch({ type: 'ERROR_FOUND', payload: error.response.data.error })
      })
  }
}


