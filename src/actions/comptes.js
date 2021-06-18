import axios from "axios";
import { COMPTES_LOADED_SUCCESS } from "./types";
import { returnErrors } from "./messages";

let url = 'http://127.0.0.1:8000/api/comptes'


// get comptes values
export const getComptes = () => (dispatch, getState) => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    axios.get(`${url}`, config)
        .then( res => {
            dispatch({
                type: COMPTES_LOADED_SUCCESS,
                payload: res.data
            })

        }).catch( err => {
        dispatch(returnErrors(err.response, err.response.status))
    })
}