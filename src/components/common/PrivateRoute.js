import React, {Component} from 'react';
import { Route, Redirect, BrowserRouter as Router} from "react-router-dom";
import { connect} from "react-redux";
// import Container from "../../pages/loading";

const PrivateRoute =  ({ component: Component, auth, ...rest }) => {
    return (
        <div>
            <Route
                {...rest}
                render={ props => {
                    if(auth.isLoading){
                        return "Loading"
                    }else if(auth.isAuthenticated){
                        console.log("authenticated");
                        return <Component {...props} />
                    }else {
                        console.log("Not Authenticated");
                        return <Redirect to="/" />
                    }
                }}
            />
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
})


export default connect(mapStateToProps)(PrivateRoute);