import React, { Component } from 'react'
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    Grow,
    Paper,
    TextField,
    Typography,
    Container
} from "@material-ui/core";
import logo from "../assets/newLogo.png";
import { paperLogStyle } from '../constants/constants'
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import { login } from "../actions/auth";
import image from '../assets/back_5.jpg'


const gridContainerStyle = {
    minHeight: '100vh',
    backgroundImage: `url(${image})`
}

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
                            <form onSubmit={this.onSubmit} noValidate>
                                <Grid align='center'>
                                    <img  src={logo} alt="Afriland" className="" style={{ maxWidth: "40%"}} />
                                    <Box mt={5}>
                                        <Typography variant="h4" color="textSecondary" >Connexion</Typography>
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
                                <Grid align="center">
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                name="checkedB"
                                                color="primary"
                                            />
                                        }
                                        label="Se souvenir de moi"
                                    />
                                </Grid>
                                <Box mt={2}>
                                    <Button type='submit' color='secondary' style={{ backgroundColor: "#424242"}} variant="contained" fullWidth>Connexion</Button>
                                </Box>
                            </form>
                            <Grid align="center">
                                <Box mt={3} >
                                    <Typography>
                                        Vous avez déjà un compte ?  <Link href="#" > Inscrivez-vous </Link>
                                    </Typography>
                                </Box>
                            </Grid>
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