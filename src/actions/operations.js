import axios from "axios";
import { OPERATION_LOADED_SUCCESS } from "./types";
import { returnErrors } from "./messages";

let url = 'http://127.0.0.1:8000/api'


// get historiques values
export const getOperations = () => (dispatch, getState) => {


    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    axios.get(`${url}/operations`)
        .then( res => {

            console.log("Data retrieved")

            dispatch({
                type: OPERATION_LOADED_SUCCESS,
                payload: res.data
            })

        }).catch( err => {
        dispatch(returnErrors(err.response, err.response.status))
    })
}