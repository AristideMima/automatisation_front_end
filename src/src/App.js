import React from 'react';
import 'antd/dist/antd.css';
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
import Help from "./pages/Help";
import CourantConfig from "./pages/parameters/Courantconfig";
import EpargneConfig from "./pages/parameters/EpargneConfig";
import StatCourant from "./pages/StatCourant";
import StatEpargne from "./pages/StatEpargne";
import ConformeUnique from "./pages/ConformeUnique";

// document.body.style.overflow = "hidden"

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
                            <PrivateRoute exact path ='/ConformeUnique' component={ConformeUnique} />
                            <PrivateRoute exact path ='/ConformeEpargne' component={ConformeEpargne} />
                            <PrivateRoute exact path ='/Register' component={Register} />
                            <PrivateRoute exact path ='/Results' component={Results} />
                            <PrivateRoute exact path ='/Statcourant' component={StatCourant} />
                            <PrivateRoute exact path ='/Statepargne' component={StatEpargne} />
                            <PrivateRoute exact path ='/Courantconfig' component={CourantConfig} />
                            <PrivateRoute exact path ='/Epargneconfig' component={EpargneConfig} />
                            {/*<PrivateRoute exact path ='/Journal' component={Journal} />*/}
                            {/*<PrivateRoute exact path ='/Solde' component={Solde} />*/}
                            <PrivateRoute exact path ='/Help' component={Help} />
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
