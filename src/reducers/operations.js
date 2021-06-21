import {
     OPERATION_LOADED_SUCCESS, OPERATION_LOADED_FAILED
} from "../actions/types";


const initialState = {
   operations :  []
}

export default function operations(state = initialState, action) {

        switch (action.type) {
            case OPERATION_LOADED_SUCCESS:
                return {
                    ...state,
                    operations: action.payload
                };
            case OPERATION_LOADED_FAILED:
                return {
                    ...state,
                    operations: []
                };
            default:
                return state;
        }
}
