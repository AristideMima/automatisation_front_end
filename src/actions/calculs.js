import axios from "axios";
import { GET_CALCUL_SUCESS } from "./types";
import { returnErrors } from "./messages";
import { useHistory } from "react-router";

let url = 'http://127.0.0.1:8000/api/calculs'


// get comptes values
export const getCalcul = (formData) => (dispatch, getState) => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // const history = useHistory()

    console.log(formData)
    axios.post(`${url}`, formData, config)
        .then( res => {

            console.log("well done")

            dispatch({
                type: GET_CALCUL_SUCESS,
                payload: res.data
            })

            // history.push({
            //     pathname: '/Results',
            //     state: { response: res.data}
            // })

        }).catch( err => {
        dispatch(returnErrors(err.response, err.response.status))
    })
}