import axios from "axios";
import { returnErrors } from "./messages";
import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS, REGISTER_FAIL
} from "./types";


let url = "http://127.0.0.1:8000/"

// Check token and load the user
export const loadUser  = () => (dispatch, getState) => {
    dispatch({type: USER_LOADING,})

    // Get the token from the state
    const token  = getState().auth.token

    console.log(token)

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

    axios.get(`${url}api/auth/user`, config)
        .then( res => {
            console.log("succsess")
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        }).catch( err => {
            console.log("error")
            dispatch( returnErrors(err.response.data, err.response.status))
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

    axios.post(`${url}api/auth/login`, body, config)
        .then( res => {
            console.log(res)
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
        })
        .catch( err => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
            type: LOGIN_FAIL
        })
    })
}

// LOGOUT
export const logout  = () => (dispatch, getState) => {

    // Get the tokent from the state
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

    axios.post(`${url}api/auth/logout/`, null,  config)
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
            'Content-Type': 'application/json'
        }
    }
    // Request body
    const body = JSON.stringify({username, password, email})

    axios.post(`${url}api/auth/register`, body, config)
        .then( res => {
            console.log(res)
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
        })
        .catch( err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: REGISTER_FAIL
            })
        })
}