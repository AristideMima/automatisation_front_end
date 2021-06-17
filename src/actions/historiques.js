import axios from "axios";
import { HISTORIQUE_LOADED_SUCCESS } from "./types";
import { returnErrors } from "./messages";

let url = 'http://127.0.0.1:8000/api/historiques'

// get historiques values
export const getHistoriques = () => (dispatch, getState) => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    axios.get(`${url}`)
        .then( res => {
            console.log("Data retrieved")
            dispatch({
                type: HISTORIQUE_LOADED_SUCCESS,
                payload: res.data
            })

        }).catch( err => {
        dispatch(returnErrors(err.response, err.response.status))
    })
}
