import React from 'react';
import 'react-circular-progressbar/dist/styles.css';
import "./assets/css/style.css"
import PrivateRoute from "./components/common/PrivateRoute";
import { Provider } from "react-redux";
import { Provider as AlertProvider } from "react-alert";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Route, Switch } from 'react-router-dom';
import AlertTemplate from "react-alert-template-basic";
import store from "./store";
import { alertOptions } from "./constants/constants";
import Alerts from "./pages/Alerts";
import { loadUser } from "./actions/auth";
import Home from "./pages/Home";
import FileUpload from "./pages/FileUpload";
import Results from "./pages/Results";
import NotFound from "./pages/404";
import {ConformeCourant} from "./pages/ConformeCourant";
import ConformeEpargne from "./pages/ConformeEpargne";
import History from "./pages/parameters/History";
import Solde from "./pages/parameters/Solde";
import Journal from "./pages/parameters/Journal";
import Discovered from "./pages/parameters/Discovered";

class App extends React.Component {


     constructor(props) {
         super(props);

         store.dispatch(loadUser())

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
                            <PrivateRoute exact path ='/Home' component={Home} />
                            <Route exact path ='/' component={Login} />
                            <PrivateRoute exact path ='/FileUpload' component={FileUpload} />
                            <PrivateRoute exact path ='/ConformeCourant' component={ConformeCourant} />
                            <PrivateRoute exact path ='/ConformeEpargne' component={ConformeEpargne} />
                            <PrivateRoute exact path ='/Register' component={Register} />
                            <PrivateRoute exact path ='/Results' component={Results} />

                            <PrivateRoute exact path ='/History' component={History} />
                            <PrivateRoute exact path ='/Discovered' component={Discovered} />
                            <PrivateRoute exact path ='/Journal' component={Journal} />
                            <PrivateRoute exact path ='/Solde' component={Solde} />
                            <Route
                                render={function() {
                                    return <NotFound/>
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