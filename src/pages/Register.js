import React, { Component } from 'react'
import { paperLogStyle } from '../constants/constants'

import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    Grow,
    Link,
    Paper,
    TextField,
    Typography
} from "@material-ui/core";
import logo from "../assets/newLogo.png";

class Register extends Component {
    render() {
        return (
            <div>
                <Grid item xs={6} md={5} justify="center">
                    <Grow  in={true} style={{ transformOrigin: '0 0 0' }}>
                        <Paper elevation={10}  style={paperLogStyle}>
                            <form noValidate>
                                <Grid align='center'>
                                    <img  src={logo} alt="Afriland" className="" style={{ maxWidth: "40%"}} />
                                    <Box mt={5}>
                                        <Typography variant="h4" color="textSecondary" > Inscription </Typography>
                                    </Box>
                                </Grid>
                                <Box m={2}>
                                    <TextField type="text"  label='Login' placeholder="Login" fullWidth required/>
                                </Box>
                                <Box m={2}>
                                    <TextField type="email"  label='Addresse mail' placeholder="Addresse mail" fullWidth required/>
                                </Box>
                                <Box m={2}>
                                    <TextField label='Mot de passe' placeholder='Mot de passe' type='password' fullWidth required/>
                                </Box>
                                <Box m={2}>
                                    <TextField type="password"  label="Confirmer mot de passe" placeholder="Confirmer mot de passe" fullWidth required/>
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
                                    <Button type='submit' color='secondary' style={{ backgroundColor: "#424242"}} variant="contained" fullWidth>Inscription</Button>
                                </Box>
                            </form>
                            <Grid align="center">
                                <Box mt={3} >
                                    <Typography display="inline">
                                        Vous avez déjà un compte ?  <Link href="#" > Connectez-vous </Link>
                                    </Typography>

                                </Box>
                            </Grid>
                        </Paper>
                    </Grow>
                </Grid>
            </div>
        );
    }
}

export default Register
