import React, { Component } from 'react'
import {
    Box,
    Button,
    // Checkbox,
    // FormControlLabel,
    Grid,
    Grow,
    Paper,
    TextField,
    Typography,
} from "@material-ui/core";
import logo from "../assets/newLogo.png";
import loginImage from "../assets/external2.svg"
import {paperLogStyle, gridContainerStyle,
    // specialLinkLog
} from '../constants/constants'
import PropTypes from 'prop-types';
import {
    // Link,
    Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import { login } from "../actions/auth";

class Login extends Component {

    // state declaration
    state = {
        username: '',
        password: ''
    }

    static propTypes = {
        login: PropTypes.func.isRequired,
        auth: PropTypes.object.isRequired
    }

    onChange = e => this.setState( {[e.target.name]: e.target.value});

    onSubmit = e => {

        e.preventDefault();

        const { username, password } = this.state

        this.props.login(username, password)
        this.setState({
            username: '',
            password: ''
        })
    };

    render() {

        if(this.props.auth.isAuthenticated) return <Redirect to="/Home"/>

        // get state properties
        const { username, password } = this.state

        return (

            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={ gridContainerStyle }
            >

                <Grid item xs={8} md={4}>
                    <Grow  in={true} style={{ transformOrigin: '0 0 0' }}>
                        <Paper elevation={10}  style={paperLogStyle}>
                            <form onSubmit={this.onSubmit}>
                                <Grid align='center'>
                                    <img  src={logo} alt="Afriland" className="" style={{ maxWidth: "40%"}} />
                                    <Box mt={5}>
                                        <img  src={loginImage} alt="login" className="" style={{ maxWidth: "12%"}} />
                                        <Typography variant="h6" color="textSecondary" >Connexion</Typography>
                                    </Box>
                                </Grid>
                                <Box m={2}>
                                    <TextField
                                        name="username"
                                        onChange={this.onChange}
                                        value={username}
                                        label='Login'
                                        placeholder="Login"
                                        fullWidth
                                        required/>
                                </Box>
                                <Box m={2}>
                                    <TextField
                                        name="password"
                                        value={password}
                                        onChange={this.onChange}
                                        label='Mot de passe'
                                        placeholder='Mot de passe'
                                        type='password'
                                        fullWidth required/>
                                </Box>
                                {/*<Grid align="center">*/}
                                {/*    <FormControlLabel*/}
                                {/*        control={*/}
                                {/*            <Checkbox*/}
                                {/*                name="checkedB"*/}
                                {/*                color="primary"*/}
                                {/*            />*/}
                                {/*        }*/}
                                {/*        label="Se souvenir de moi"*/}
                                {/*    />*/}
                                {/*</Grid>*/}
                                <Box mt={5}>
                                    <Button type='submit' color='secondary' style={{ backgroundColor: "#424242"}} variant="contained" fullWidth>Connexion</Button>
                                </Box>
                            </form>
                            {/*<Grid align="center">*/}
                            {/*    <Box mt={3} >*/}
                            {/*        <Typography>*/}
                            {/*            Vous n'avez pas de compte ?  <Link style={specialLinkLog} to="/Register">Inscrivez-vous</Link>*/}
                            {/*        </Typography>*/}
                            {/*    </Box>*/}
                            {/*</Grid>*/}
                        </Paper>
                    </Grow>
                </Grid>

            </Grid>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {login})(Login)