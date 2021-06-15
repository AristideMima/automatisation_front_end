import {AUTH_ERROR, USER_LOADED, USER_LOADING} from "./types";
import axios from "axios";
import {returnErrors} from "./messages";





let url = "http://127.0.0.1:8000/"

// Upload file to the server
export const fileUpload  = () => (dispatch, getState) => {
    dispatch({type: USER_LOADING,})

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

    axios.post(`${url}api/auth/user`, config)
        .then( res => {
            console.log("succsess")
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        }).catch( err => {
        console.log("error LOADING")
        dispatch( returnErrors(err.response.data, err.response.status))
        dispatch({
            type: AUTH_ERROR
        })
    })
}