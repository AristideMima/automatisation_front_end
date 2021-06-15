import { combineReducers} from "redux";
import errors from "./errors";
import messages from "./messages";
import auth from './auth'
import files from './files'

export default combineReducers({
    errors,
    messages,
    auth,
    files
})