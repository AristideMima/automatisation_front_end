import {
    HISTORIQUE_LOADED_SUCCESS, HISTORIQUE_LOADED_FAILED
} from "../actions/types";


const initialState = {
   historiques :  []
}

export default function historiques (state = initialState, action) {

        switch (action.type) {
            case HISTORIQUE_LOADED_SUCCESS:
                console.log("Yeah file uploaded")
                return {
                    ...state,
                    historiques: action.payload
                };
            case HISTORIQUE_LOADED_FAILED:
                return {
                    ...state,
                    historiques: []
                };
            default:
                return state;
        }
}

