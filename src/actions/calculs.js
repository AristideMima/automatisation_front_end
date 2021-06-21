import axios from "axios";
import { GET_CALCUL_SUCESS } from "./types";
import { returnErrors } from "./messages";

let url = 'http://127.0.0.1:8000/api/calculs'


// get comptes values
export const getCalcul = (formData) => (dispatch, getState) => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    axios.post(`${url}`, formData, config)
        .then( res => {
            dispatch({
                type: GET_CALCUL_SUCESS,
                payload: res.data
            })

        }).catch( err => {
        dispatch(returnErrors(err.response, err.response.status))
    })
}