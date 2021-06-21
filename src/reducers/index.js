import { combineReducers} from "redux";
import errors from "./errors";
import messages from "./messages";
import auth from './auth'
import files from './files'
import historiques from "./historiques";
import comptes from "./comptes";
import operations from "./operations";
import calculs from "./calculs";

export default combineReducers({
    errors,
    messages,
    auth,
    files,
    historiques,
    comptes,
    operations,
    calculs
})