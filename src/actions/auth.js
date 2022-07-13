import axios from "axios";
import {createMessage, returnErrors} from "./messages";
import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS, REGISTER_FAIL
} from "./types";
import {urlLoadUser, urlLoginUser, urlLogoutUser, urlregisterUser} from "../constants/constants";
import {message} from "antd";



// Check token and load the user
export const loadUser  = () => (dispatch, getState) => {

    dispatch({type: USER_LOADING,})

    // Get the token from the state
    const token  = getState().auth.token

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    console.log(urlLoadUser)
    // If token, add to headers
    if(token){
        config.headers['Authorization'] = `Token  ${token}`}

    axios.get(urlLoadUser, config)
        .then( res => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        }).catch( err => {
            // console.log(err)
            // dispatch( returnErrors(err.response.data, err.response.status))
            dispatch({
                type: AUTH_ERROR
            })
    })
}

// LOGIN

// Login the user
export const login = (username, password) =>  dispatch => {

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // Request body
    const body = JSON.stringify({username, password})

    axios.post(urlLoginUser, body, config)
        .then( res => {
            // dispatch(createMessage("You are now login"));
            message.success('Connexion réussie')
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
        })
        .catch( err => {
        // dispatch(returnErrors(err.response.data, err.response.status));
        if(err.response.status === 400) message.error('Mot de passe incorrect')
        dispatch({
            type: LOGIN_FAIL
        })
    })
}

// LOGOUT
export const logout  = () => (dispatch, getState) => {

    // Get the token from the state
    const token  = getState().auth.token

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // If token, add to headers
    if(token){
        config.headers['Authorization'] = `Token  ${token}`
    }

    axios.post(urlLogoutUser, null,  config)
        .then( res => {
            dispatch({
                type: LOGOUT_SUCCESS,
            })
        }).catch( err => {
        dispatch( returnErrors(err.response.data, err.response.status))
    })
}


// Register user
export const register = ({username, password, email}) =>  dispatch => {

    // Headers
    const config = {
        headers: {
            'Content-Type': 'aplication/json'
        }
    }
    // Request body
    const body = JSON.stringify({username, password, email})

    axios.post(urlregisterUser, body, config)
        .then( res => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
        })
        .catch( err => {
            dispatch({
                type: REGISTER_FAIL
            })
        })
}