import { combineReducers} from "redux";
import errors from "./errors";
import messages from "./messages";
import auth from './auth'
import files from './files'
import historiques from "./historiques";

export default combineReducers({
    errors,
    messages,
    auth,
    files,
    historiques
})