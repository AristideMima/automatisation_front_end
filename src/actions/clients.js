import axios from 'axios'
import {GET_CLIENTS, DELETE_CLIENT, ADD_CLIENT, GET_ERRORS, CHECK_IDENTITY_SUCCESS, CHECK_IDENTITY_FAIL, REGISTER_FAIL} from "./types";
import { createMessage, returnErrors } from "./messages";
import React from "react";


let url = "http://127.0.0.1:8000/"

const getConfig =  (state) => {
    const token = state().auth.token
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

    return config;
}


// Get all clients
export const getClients = () => (dispatch, getState) => {

    const config  = getConfig(getState)

            axios.get(`${url}api/clients/`, config)
                .then( res =>{
                        dispatch({
                            type: GET_CLIENTS,
                            payload: res.data
                        })
                    }
                ).catch(err => {
                dispatch(returnErrors(err.response, err.response.status))

            })

}


// Delete clients
export const deleteClient = (id) => (dispatch, getState) => {

    const config  = getConfig(getState)

    axios.delete(`${url}api/clients/${id}/`, config)
        .then( res => {
            dispatch(createMessage({clientMsg: "Client deleted"}));
            dispatch({
                type: DELETE_CLIENT,
                payload: id
            });
            }
        ).catch(err => console.log(err))
}

// Add client
export const addClient = (client) => (dispatch, getState) => {

    const config  = getConfig(getState)

    axios.post(`${url}api/clients/`, client, config)
        .then( res => {
            dispatch(createMessage({ clientMsg: "Client added" }));
                dispatch({
                    type: ADD_CLIENT,
                    payload: res.data
                })
        }
        ).catch( err => {
            dispatch(returnErrors(err.response.data, err.response.status))
    })
}

// Check client identity by matricule

export const checkIdentity = (account_number) => (dispatch, getState) =>{

    const start = Date.now()
    console.log("function launched" + start)
    const config = getConfig(getState)

    const end_inter = Date.now()

    console.log("Time inter" + (end_inter - start))

    axios.get(`${url}api/clients/check_identity?account_number=${account_number}`, config)
        .then( res => {
            console.log("Time finish" + (Date.now() - end_inter))
            dispatch(createMessage({ clientMsg: 'Client well checked'}));
            dispatch({
                type: CHECK_IDENTITY_SUCCESS,
                payload: res.data
            })
           console.log(res.data)
        }).catch( err => {
        dispatch(returnErrors(err.response.data, err.response.status))
        dispatch({
            type: CHECK_IDENTITY_FAIL
        })
    })

}