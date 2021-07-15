import {
    COMPTES_LOADED_SUCCESS, COMPTES_LOADED_FAILED
} from "../actions/types";


const initialState = {
   comptes :  [],
    isLoading: true,
}

export default function comptes(state = initialState, action) {

        switch (action.type) {
            case COMPTES_LOADED_SUCCESS:
                return {
                    ...state,
                    comptes: action.payload,
                    isLoading: true
                };
            case COMPTES_LOADED_FAILED:
                return {
                    ...state,
                    comptes: [],
                    isLoading: false
                };
            default:
                return state;
        }
}

