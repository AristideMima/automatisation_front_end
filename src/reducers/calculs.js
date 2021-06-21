import {
    GET_CALCUL_SUCESS, GET_CALCUL_FAILED
} from "../actions/types";


const initialState = {
   calculs :  []
}

export default function calculs(state = initialState, action) {

        switch (action.type) {
            case GET_CALCUL_SUCESS:
                return {
                    ...state,
                    calculs: action.payload
                };
            case GET_CALCUL_FAILED:
                return {
                    ...state,
                    calculs: []
                };
            default:
                return state;
        }
}

