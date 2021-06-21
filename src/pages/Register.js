import React, { Component } from 'react'
import {paperLogStyle, gridContainerStyle, specialLinkLog} from '../constants/constants'
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

} from "@material-ui/core";
import logo from "../assets/newLogo.png";
import {Link, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { register } from "../actions/auth";
import imageRegister from "../assets/add_user_male.svg"
import { createMessage } from "../actions/messages";

class Register extends Component {


    state = {
        username: '',
        email:'',
        password: '',
        passwordConfirm: '',
        showPaswword: false
    }

    static propTypes = {
        register: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool
    }

    onChange = e=> this.setState({ [e.target.name]: e.target.value})

    onSubmit = (e) => {

        // Disable from native behavior
        e.preventDefault()

        const { username, email, password, passwordConfirm } = this.state

        if( password !== passwordConfirm){
            this.props.createMessage({
                passwordDoNotMatch: 'Passwords do not match'
            })
        }else{
            const newUser = { username, email, password }
            this.props.register(newUser)
        }

    }

    render() {

        if(this.props.isAuthenticated) return <Redirect to="/Home"/>

        const { username, email, password, passwordConfirm } = this.state

        return (
            <div>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={ gridContainerStyle }
                >
                    <Grid item xs={8} md={5}>
                        <Grow  in={true} style={{ transformOrigin: '0 0 0' }}>
                            <Paper elevation={10}  style={paperLogStyle}>
                                <form onSubmit={this.onSubmit} >
                                    <Grid align='center'>
                                        <img  src={logo} alt="Afriland" className="" style={{ maxWidth: "40%"}} />
                                        <Box mt={5}>
                                            <img  src={imageRegister} alt="Inscription" className="" style={{ maxWidth: "12%"}} />
                                            <Typography variant="h6" color="textSecondary" > Inscription </Typography>
                                        </Box>
                                    </Grid>
                                    <Box m={2}>
                                        <TextField
                                            name="username"
                                            value={username}
                                            onChange={this.onChange}
                                            type="text"  label='Login'
                                            placeholder="Login" fullWidth required/>
                                    </Box>
                                    <Box m={2}>
                                        <TextField
                                            name="email"
                                            value={email}
                                            onChange={this.onChange}
                                            type="email"  label='Addresse mail'
                                            placeholder="Addresse mail" fullWidth required/>
                                    </Box>
                                    <Box m={2}>
                                        <TextField
                                            name="password"
                                            value={password}
                                            onChange={this.onChange}
                                            label='Mot de passe' placeholder='Mot de passe' type='password' fullWidth required/>
                                    </Box>
                                    <Box m={2}>
                                        <TextField
                                            name="passwordConfirm"
                                            value={passwordConfirm}
                                            onChange={this.onChange}
                                            type="password"  label="Confirmer mot de passe" placeholder="Confirmer mot de passe"
                                            fullWidth required/>
                                    </Box>

                                    {/*<Box>*/}
                                    {/*    <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>*/}
                                    {/*        <Input*/}
                                    {/*            id="standard-adornment-weight"*/}
                                    {/*            value={values.weight}*/}
                                    {/*            onChange={handleChange('weight')}*/}
                                    {/*            endAdornment={<InputAdornment position="end">Kg</InputAdornment>}*/}
                                    {/*            aria-describedby="standard-weight-helper-text"*/}
                                    {/*            inputProps={{*/}
                                    {/*                'aria-label': 'weight',*/}
                                    {/*            }}*/}
                                    {/*        />*/}
                                    {/*        <FormHelperText id="standard-weight-helper-text">Weight</FormHelperText>*/}
                                    {/*    </FormControl>*/}
                                    {/*</Box>*/}
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
                                        <Button type='submit' color='secondary' style={{ backgroundColor: "#424242"}} variant="contained" fullWidth>Inscription</Button>
                                    </Box>
                                </form>
                                <Grid align="center">
                                    <Box mt={3} >
                                        <Typography display="inline">
                                            Vous avez déjà un compte ?  <Link style={specialLinkLog} to="/" > Connectez-vous </Link>
                                        </Typography>

                                    </Box>
                                </Grid>
                            </Paper>
                        </Grow>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, { register, createMessage })(Register);