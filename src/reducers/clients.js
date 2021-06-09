import { GET_CLIENTS, ADD_CLIENT, DELETE_CLIENT, CHECK_IDENTITY_SUCCESS, CHECK_IDENTITY_FAIL } from "../actions/types.js"

const initialState = {
    clients: [],
    clients_check: []
}

export default function(state = initialState, action){
    switch (action.type) {
        case GET_CLIENTS:
            return {
            ...state,
                clients: action.payload
        };
        case CHECK_IDENTITY_SUCCESS:
            return {
                ...state,
                clients_check: action.payload
            };
        case CHECK_IDENTITY_FAIL:
            return {
                ...state,
                clients_check: []
            };
        case DELETE_CLIENT:
            return {
                ...state,
                clients: state.clients.filter(client => client.id != action.payload)
            };
        case ADD_CLIENT:
            return {
              ...state,
              clients: [...state.clients, action.payload]
            };
        default:
            return state;
     }
}