import {FILE_UPLOAD_SUCCESS} from "./types";
import axios from "axios";



const url = 'http://127.0.0.1:8000/api/upload/';

// Upload file to the server
export const fileUpload  = (file) => (dispatch, getState) => {

    // Get the token from the state
    //const token  = getState().auth.token

    // Headers
    // const config = {
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // }

    // If token, add to headers
    // if(token){
    //     config.headers['Authorization'] = `Token  ${token}`
    // }

    console.log(" yeah i'm here " + getState)

    const token  = getState().auth.token

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    if(token){
        config.headers['Authorization'] = `Token  ${token}`
    }
    const formData = new FormData();
    formData.append('file', file);

    axios.put(`${url}`, formData, config)
        .then( res =>{
            //dispatch(createMessage({ fileupload: res.data}));
            dispatch({type: FILE_UPLOAD_SUCCESS,})
            console.log(res.data)
        }).catch( err => {
        console.log(err)
    })
}