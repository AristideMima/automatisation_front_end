import {
    FILE_UPLOAD_SUCCESS,
    FILE_UPLOAD_FAILED
} from "../actions/types";


const initialState = {
   files :  []
}

export default function (state = initialState, action) {

        switch (action.type) {
            case FILE_UPLOAD_SUCCESS:
                console.log("Yeah file uploaded")
                return {...state};
            case FILE_UPLOAD_FAILED:
                return {...state};
            default:
                return state;
        }
}

