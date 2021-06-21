import {
    COMPTES_LOADED_SUCCESS, COMPTES_LOADED_FAILED
} from "../actions/types";


const initialState = {
   comptes :  []
}

export default function comptes(state = initialState, action) {

        switch (action.type) {
            case COMPTES_LOADED_SUCCESS:
                return {
                    ...state,
                    comptes: action.payload
                };
            case COMPTES_LOADED_FAILED:
                return {
                    ...state,
                    comptes: []
                };
            default:
                return state;
        }
}

