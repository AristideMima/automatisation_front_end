import React from 'react';
import 'react-circular-progressbar/dist/styles.css';
import "./assets/css/style.css"
import { withStyles } from "@material-ui/core/styles";
import PrivateRoute from "./components/common/PrivateRoute";
import { Provider } from "react-redux";
import { Provider as AlertProvider } from "react-alert";
import {login} from "./actions/auth";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Route, Switch } from 'react-router-dom';
import AlertTemplate from "react-alert-template-basic";
import store from "./store";
import { alertOptions } from "./constants/constants";
import Alerts from "./pages/Alerts";
import HomePage from "./pages/Home";

class App extends React.Component {


     constructor(props) {
         super(props);

     }

    render(){

        return (
            <Provider store={store}>
                <AlertProvider template={AlertTemplate} {...alertOptions}>
                    <div className="grey">
                        <Alerts />
                    </div>
                    <div className='flyout'>
                        <Switch>
                            <PrivateRoute exact path ='/HomeIdentity' component={HomePage} />
                            <Route exact path ='/' component={Login} />
                            <Route exact path ='/Register' component={Register} />
                            <Route
                                render={function() {
                                    return <h1>Not Found</h1>;
                                }}
                            />
                        </Switch>
                    </div>
                </AlertProvider>
            </Provider>
        )
    }
    // NavBar and form datas
}

export default App