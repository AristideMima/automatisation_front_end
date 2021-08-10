import React, { Component  } from 'react'
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import { getCalcul } from "../actions/calculs";
import ControlledSelectionGrid from "./FullSelected"
import axios from "axios";
import {Grid, Button, Stepper, Step, StepLabel, Box, Paper, TextField,
} from "@material-ui/core";
import { useStyles, url} from "../constants/constants";
import { compose } from "redux";
import {withStyles} from "@material-ui/core/styles";
import Template from "./Template";
import img from "../assets/google_compute_engine_48px.png";
import { Popconfirm, Typography} from 'antd';
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { notification } from 'antd';
import {withRouter} from 'react-router-dom';
import { formStepperStyle } from "../constants/constants";
import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';


// Form stepper to for Epargne and Courant
class FormCourant extends Component {

    state = {
        options: this.props.options,
        openAlert: false,
        choice: this.props.choice
    }

    handleChange = (e) => {
        const options = this.state.options;
        const newValue = e.target.value

        options[e.target.name] = newValue

        this.setState({options: options})
    }

    handleSubmit = (e) =>{
        e.preventDefault()

        const options = this.state.options
        const choice = this.state.choice

        const isEmpty = Object.values(options).every(x => x === null || x === '');

        if (!isEmpty) {
            this.props.updateProps({options, choice})
            this.setState({ openAlert: true})
        }else{
            notification.error({
                message: 'Erreur optons',
                description: 'Aucun paramètre ne doit être vide',
                placement: 'bottomRight',
                duration: 5
            })
        }
    }

    render() {

        const { taux_interet_debiteur_1, taux_interet_debiteur_2, taux_interet_debiteur_3, taux_commision_mouvement, taux_commision_decouvert, taux_tva,   date_deb, date_fin } = this.state.options

        return (
            <>
                <Grid container >
                    <Grid item md={12} xs={12}>
                        <Collapse in={this.state.openAlert}>
                            <Alert
                                action={
                                    <IconButton
                                        aria-label="close"
                                        color="inherit"
                                        size="small"
                                        onClick={() => {
                                            this.setState({openAlert: false });
                                        }}
                                    >
                                        <CloseIcon fontSize="inherit" />
                                    </IconButton>
                                }
                            >
                                Période d'arrêté mise à jour
                            </Alert>
                        </Collapse>
                        <Box mb={3}>

                        </Box>
                    </Grid>
                </Grid>
                <Paper elevation={10} style={formStepperStyle}>
                    <form onSubmit={this.handleSubmit}>
                        <Grid spacing={1} container justify="left">
                            <Grid item md={3}>
                                <h3>Taux d'intérêts</h3>
                            </Grid>
                            <Grid item md={3}>
                                <Box>
                                    <TextField
                                        name="taux_interet_debiteur_1"
                                        label='Intérêt débiteur 1'
                                        placeholder="Intérêt débiteur 1"
                                        value={taux_interet_debiteur_1}
                                        onChange={this.handleChange}
                                        type="number"
                                        InputProps={{ inputProps: { min: 0, step: "any" } }}
                                        required/>
                                </Box>
                            </Grid>
                            <Grid item md={3}>
                                <Box>
                                    <TextField
                                        name="taux_interet_debiteur_2"
                                        label='Intérêt débiteur 2'
                                        placeholder="Intérêt débiteur 2"
                                        value={taux_interet_debiteur_2}
                                        onChange={this.handleChange}
                                        type="number"
                                        InputProps={{ inputProps: { min: 0, step: "any" } }}
                                        required/>
                                </Box>
                            </Grid>
                            <Grid item md={3}>
                                <Box>
                                    <TextField
                                        name="taux_interet_debiteur_3"
                                        label='Intérêt débiteur 3'
                                        placeholder="Intérêt débiteur 3"
                                        value={taux_interet_debiteur_3}
                                        onChange={this.handleChange}
                                        type="number"
                                        InputProps={{ inputProps: { min: 0, step: "any" } }}
                                        required/>
                                </Box>
                                <Box mt={4}></Box>
                            </Grid>
                            <Grid item md={3}>
                                <h3>Commissions / Tva </h3>
                            </Grid>

                            <Grid item md={3}>
                                <Box >
                                    <TextField
                                        name="taux_commision_mouvement"
                                        label='Mouvement'
                                        placeholder="Mouvement"
                                        onChange={this.handleChange}
                                        type="number"
                                        InputProps={{ inputProps: { min: 0, step: "any" } }}
                                        value={taux_commision_mouvement}
                                        required/>
                                </Box>
                            </Grid>
                            <Grid item md={3}>
                                <Box >
                                    <TextField
                                        name="taux_dec"
                                        label='Découvert'
                                        placeholder="Découvert"
                                        onChange={this.handleChange}
                                        type="number"
                                        InputProps={{ inputProps: { min: 0, step: "any" } }}
                                        value={taux_commision_decouvert}
                                        required/>
                                </Box>
                            </Grid>

                            <Grid item md={3}>
                                <Box >
                                    <TextField
                                        name="taux_tva"
                                        label='Taux tva'
                                        placeholder="Taux tva"
                                        onChange={this.handleChange}
                                        type="number"
                                        InputProps={{ inputProps: { min: 0, step: "any" } }}
                                        value={taux_tva}
                                        required/>
                                </Box>
                                <Box mt={4} ></Box>
                            </Grid>
                            <Grid item md={4}>
                                <h3>Période de l'arrêté</h3>
                            </Grid>
                            <Grid item  md={3}>
                                <Box>
                                    <TextField
                                        id="date"
                                        type="date"
                                        name="date_deb"
                                        label="Date de début"
                                        value={date_deb}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </Box>
                            </Grid>
                            <Grid item md={3}>
                                <Box>
                                    <TextField
                                        id="date"
                                        type="date"
                                        name="date_fin"
                                        label="Date de fin"
                                        value={date_fin}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </Box>
                            </Grid>
                            <Grid container justify="center" alignContent="center">
                                <Box mt={5}>
                                    <Button type="submit" variant="contained" color="primary">
                                        Valider
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </>
        )
    }
}


class FormEpargne extends Component {

    state = {
        options : this.props.options,
        openAlert: false,
        choice: this.props.choice
    }


    handleChange = (e) => {
        const options = this.state.options;
        const newValue = e.target.value

        options[e.target.name] = newValue

        this.setState({options: options})
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const options = this.state.options
        const choice = this.state.choice

        const isEmpty = Object.values(options).every(x => x === null || x === '');
        console.log(isEmpty)

        if (!isEmpty) {
            this.props.updateProps({options, choice})
            this.setState({ openAlert: true})
        }else{
            notification.error({
                message: 'Erreur optons',
                description: 'Aucun paramètre ne doit être vide',
                placement: 'bottomRight',
                duration: 5
            })
        }
    }

   render() {
       const { taux_interet_inferieur, taux_interet_superieur, taux_ircm, taux_tva, date_deb, date_fin } = this.state.options

       return (
           <>
               <Grid container >
                   <Grid item md={12} xs={12}>
                       <Collapse in={this.state.openAlert}>
                           <Alert
                               action={
                                   <IconButton
                                       aria-label="close"
                                       color="inherit"
                                       size="small"
                                       onClick={() => {
                                           this.setState({openAlert: false });
                                       }}
                                   >
                                       <CloseIcon fontSize="inherit" />
                                   </IconButton>
                               }
                           >
                               Période d'arrêté mise à jour
                           </Alert>
                       </Collapse>
                       <Box mb={3}>

                       </Box>
                   </Grid>
               </Grid>
               <Paper elevation={10} style={formStepperStyle}>
                   <form onSubmit={this.handleSubmit}>
                       <Grid spacing={1} container justify="left">
                           <Grid item md={3}>
                               <h3>Taux d'intérêts</h3>
                           </Grid>
                           <Grid item md={3}>
                               <Box>
                                   <TextField
                                       name="taux_interet_inferieur"
                                       label='Taux <= 10 000'
                                       placeholder="Taux <= 10 000"
                                       value={taux_interet_inferieur}
                                       onChange={this.handleChange}
                                       type="number"
                                       InputProps={{ inputProps: { min: 0, step: "any" } }}
                                       required />
                               </Box>
                           </Grid>
                           <Grid item md={3}>
                               <Box>
                                   <TextField
                                       name="taux_interet_superieur"
                                       label='Taux > 10 000'
                                       placeholder="Taux > 10 000"
                                       value={taux_interet_superieur}
                                       onChange={this.handleChange}
                                       type="number"
                                       InputProps={{ inputProps: { min: 0, step: "any" } }}
                                       required/>
                               </Box>
                               <Box mt={4} ></Box>
                           </Grid>
                           <Grid item md={4}>
                               <h3>Tva / Taux Ircm : </h3>
                           </Grid>
                           <Grid item md={3}>
                               <Box >
                                   <TextField
                                       name="tva"
                                       label='Taux tva'
                                       type="number"
                                       InputProps={{ inputProps: { min: 0, step: "any" } }}
                                       placeholder="Taux tva"
                                       value={taux_tva}
                                       onChange={this.handleChange}
                                       required/>
                               </Box>
                           </Grid>

                           <Grid item md={3}>
                               <Box >
                                   <TextField
                                       name="taux_ircm"
                                       label='Taux Ircm'
                                       placeholder="Taux Ircm"
                                       value={taux_ircm}
                                       type="number"
                                       InputProps={{ inputProps: { min: 0, step: "any" } }}
                                       onChange={this.handleChange}
                                       required/>
                               </Box>
                               <Box mt={4} ></Box>
                           </Grid>
                           <Grid item md={4}>
                               <h3>Période de l'arrêté</h3>
                           </Grid>
                           <Grid item  md={3}>
                               <Box>
                                   <TextField
                                       id="date"
                                       type="date"
                                       name="date_deb"
                                       label="Date de début"
                                       value={date_deb}
                                       onChange={this.handleChange}
                                       required
                                   />
                               </Box>
                           </Grid>
                           <Grid item md={3}>
                               <Box>
                                   <TextField
                                       id="date"
                                       type="date"
                                       name="date_fin"
                                       label="Date de fin"
                                       value={date_fin}
                                       onChange={this.handleChange}
                                       required
                                   />
                               </Box>
                           </Grid>
                           <Grid container justify="center" alignContent="center">
                               <Box mt={5}>
                                   <Button type="submit" variant="contained" color="primary">
                                       Valider
                                   </Button>
                               </Box>
                           </Grid>
                       </Grid>
                   </form>
               </Paper>
           </>
       )
   }
}

class Calcul extends Component {


    state = {
        data: [],
        open: false,
        classes: this.props,
        activeStep: 0,
        accounts_selected: [],
        index: [],

        // Operations part
        data_operations : [],
        selectedOperations: [],
        indexOperations: [],

        key: `open${Date.now()}`,

        // Period chosen
        openAlert: false,
        alertComp: null,
        options_courant: {},
        options_epargne: {},
        // Popup confirm
        visible: false,
        confirmationLoading: false,
        laoding: false,
        choice: "unique"
    }

    getAccounts = (props) => {

        this.setState((prev) => ({
            accounts_selected: props.selected_rows,
            index: props.newSelectionModel,
            data: typeof props.updateData !== 'undefined' ? props.updateData:prev.data
        }))
    }

    getOperations = (props) => {

        this.setState((prev) => ({
            operations: props.selected_rows,
            indexOperations: props.newSelectionModel,
            data_operations: typeof props.updateData !== 'undefined' ? props.updateData:prev.data_operations
        }))
    }

    updateOptions = (optionsChild) => {

        const options = optionsChild.options
        const choice = optionsChild.choice

        if (choice === "Epargne") {
            this.setState({
                options_courant: options
            })
        }else {
            this.setState({
                options_epargne: options
            })
        }
    }

    handleChoice = (e) => {
        this.setState({
            choice: e.target.value
        })
        notification.success({
            message: 'Mode d\'arrêté',
            description: `Nouveau mode: ${e.target.value}`,
            placement: 'bottomRight',
            duration: 5
        })
    }

    static propTypes = {

        getCalcul: PropTypes.func.isRequired,
        calculs: PropTypes.array.isRequired,
        auth: PropTypes.object.isRequired,
        typeArrete: PropTypes.string.isRequired,
        typeCalcul: PropTypes.string.isRequired
    }

    getSteps = () => {
        return [ 'Choix des numéros de compte', 'Opérations à exclure', 'Options supplémentaires', 'Mode d\'arrêté', 'Lancer le calcul'];
    }

    getStepContent = (stepIndex) => {

        switch (stepIndex) {
            case 0:
                return   <ControlledSelectionGrid data={this.state.data} selected_accounts={this.state.accounts_selected} index_selected={this.state.index}
                                                  setSelection={this.getAccounts}  choice="calcul" check={true} loading={this.state.loading} />;
            case 1:
                    return   <ControlledSelectionGrid data={this.state.data_operations} selected_accounts={this.state.selectedOperations} index_selected={this.state.indexOperations}
                                                      setSelection={this.getOperations}  choice="operations" check={true} loading={false} />;
            case 2:

                const type_computation = this.props.typeCalcul
                let component = <></>

                if (type_computation === "Courant") component = <FormCourant updateProps={this.updateOptions} options={this.state.options_courant} choice={type_computation} />;
                else component = <FormEpargne updateProps={this.updateOptions} options={this.state.options_epargne} choice={type_computation} />;

                return <Grid container spacing={2} justify="center" alignItems="center">
                            <Grid item md={6}>
                                {component}
                            </Grid>
                        </Grid>;
            case 3:
                return <Grid item md={12} xs={12} >
                    <Grid container spacing={0} justify="center" alignItems="center" direction="column">
                        <Box mt={5} mb={5}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Chosir le mode d'arrêté </FormLabel>
                                <RadioGroup row aria-label="Choices" name="choice" value={this.state.choice} onChange={this.handleChoice}>
                                    <FormControlLabel value="unique" control={<Radio />} label="Unique" />
                                    <FormControlLabel value="fusion" control={<Radio />} label="Fusion" />
                                </RadioGroup>
                            </FormControl>
                        </Box>
                    </Grid>
                </Grid>
            case 4:
                const resultsOperations = this.state.data_operations.filter(({ code_operation: id1 }) => !this.state.selectedOperations.some(({ value: id2 }) => id2 === id1));
                let options = this.state.options_courant
                let recap_options =
                    <>
                        <Alert>
                            Intérêt 1: {options.taux_interet_debiteur_1} %, Intérêt 2: {options.taux_interet_debiteur_2} %, Intérêt 3: {options.taux_interet_debiteur_3} %,
                            Com Mouvement: {options.taux_commision_mouvement}, Com Découvert: {options.taux_commision_decouvert}, Tva: {options.taux_tva}
                        </Alert>
                    </>
                if (this.props.typeCalcul === "Epargne"){
                    options = this.state.options_epargne
                    recap_options =
                        <>
                            <Alert>
                                Intérêt {"<="} 10 000: {options.taux_interet_superieur} %, Intérêt {">"} 10 000: {options.taux_interet_superieur} %, Ircm: {options.taux_ircm} %,
                                Tva: {options.taux_tva}
                            </Alert>
                        </>
                }

                return <Grid container spacing={0} justify="center">
                      <Grid item md={8} xs={12} >
                          <Collapse in={true}>
                              <Alert>
                                  Période de l'arrêté: du {options.date_deb} au {options.date_fin}   Mode : {this.state.choice}
                              </Alert>
                              {recap_options}
                          </Collapse>
                          <Box mt={2}></Box>
                      </Grid>
                    <Grid item md={6} xs={4}>
                        <ControlledSelectionGrid data={this.state.accounts_selected} selected_accounts={[]} index_selected={[]}
                                                 setSelection={this.getAccounts}  choice="accounts_recap" check={false} loading={false} />;
                    </Grid>
                    <Grid item md={6}>
                        <ControlledSelectionGrid data={resultsOperations} selected_accounts={[]} index_selected={[]}
                                                 setSelection={this.getAccounts}  choice="operations_recap" check={false} loading={false} />;
                    </Grid>
                </Grid> ;
            default:
                return 'cliquez sur lancer l\'arrêté';
        }
    }

    componentDidMount() {

        // Set accounts
        const token  = this.props.auth.token

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        if(token){
            config.headers['Authorization'] = `Token  ${token}`
        }

        axios.post(`${url}`, {"conf": this.props.typeArrete, "type_account": this.props.typeCalcul }, config)
            .then( res => {
                this.setState({data: res.data['accounts'], data_operations: res.data['operations'],  loading: false})
            }).catch( err => {
            this.setState({loading: false})
        })

        // Set date_fin
        let today = new Date()
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();
        today = yyyy + "-" + mm + '-' + dd;

        // set options dates
        const options_courant =  {
            taux_interet_debiteur_1: 15.5,
                taux_interet_debiteur_2: 6.5,
                taux_interet_debiteur_3: 0,
                taux_commision_mouvement: 0.025,
                taux_commision_decouvert: 0.020833,
                taux_tva: 19.25,
                date_fin: `${today}`,
                date_deb: "2000-01-01"
        }
        const options_epargne =  {
            taux_interet_inferieur: 2.45,
                taux_interet_superieur: 2.45,
                taux_ircm: 16.5,
                taux_tva: 19.25,
                date_fin: `${today}`,
                date_deb: "2000-01-01",
        }

        // Set all options values
        this.setState({options_courant: options_courant, options_epargne: options_epargne})
    }

    next = () => {

        this.setState((prevState) => ({
            activeStep: prevState.activeStep + 1
        }) )
    }
    handleNext = () => {
        switch (this.state.activeStep) {
            case 0:
                if(this.state.accounts_selected.length !== 0){
                    this.next()
                }else{
                    notification.error({
                        message: 'Erreur choix du compte',
                        description: 'Vous devez sélectionner au moins 1 compte',
                        placement: 'bottomRight',
                        duration: 5
                    });
                }
                return;
            case 1:
                this.next()
                return
            case 2:
                let options = this.state.options_courant
                if (this.props.typeCalcul === "Epargne") options = this.state.options_epargne

                if ((options.date_deb) && (options.date_fin) && (options.date_deb < options.date_fin)) {
                    this.next()
                }else{
                    notification.error({
                        message: 'Erreur choix de la période',
                        description: 'Dates incorrectes',
                        placement: 'bottomRight',
                        duration: 5
                    });
                }
                return;
            case 3:
                this.next()
                return;
            case 4:
                this.setState({
                    visible: true
                })
                return;
            default:
                return;
        }

    };

    handleOk = () => {
        this.setState({
            confirmationLoading: true
        })

        setTimeout(() => {
            this.setState({
                visible: false,
                confirmationLoading: false
            });
        }, 2000);

        const token  = this.props.auth.token

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        if(token){
            config.headers['Authorization'] = `Token  ${token}`
        }

        let options = this.state.options_courant

        if(this.state.choice === "Epargne") options = this.state.options_epargne

        // Computation happening
        axios.post('http://127.0.0.1:8000/api/calculs', {"accounts": this.state.accounts_selected, "operations": this.state.data_operations,
            "options": options,
            "period": [this.state.date_deb, this.state.date_fin], "type_account": this.props.typeCalcul, "conf": this.props.typeArrete}, config)
            .then(
                res => {
                    console.log()
                    this.props.history.push(
                        {
                            pathname: '/Results',
                            state: res.data
                        }
                    )
                    notification.success({
                        message: 'Calcul éffectué',
                        description: `Calcul terminé pour les comptes }`,
                        placement: 'bottomRight',
                        duration: 5
                    });
                }
            ).catch( err => {
            console.log(err)
        })
    }

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };

    handleBack = () => {
        this.setState((prevState) => ({
            activeStep: prevState.activeStep - 1
        }) )
    };

    handleReset = () => {
        this.setState( {
            activeStep: 0
        })
    };

    render() {

        // console.log(this.state.accounts_selected, this.state.index )

        // {this.state.data.length > 0 && console.log(this.state.data)}

        const { classes } = this.props;

        const activeStep = this.state.activeStep

        const steps = this.getSteps()

        const title = this.props.title.title
        const subTitle = this.props.title.subTitle

        const content = (
                <div className={classes.rootStepper}>
                    {this.state.alertComp}
                    <Grid container justify="center" >
                        <Box
                            mt={5}
                            mb={3}
                        >
                            <Button
                                disabled={activeStep === 0}
                                onClick={this.handleBack}
                                className={classes.backButton}
                            >
                                Précédent
                            </Button>
                            <Popconfirm
                                title="Confirmation"
                                visible={this.state.visible}
                                onConfirm={this.handleOk}
                                okButtonProps={{ loading: this.state.confirmLoading }}
                                onCancel={this.handleCancel}
                            >
                            <Button disabled={activeStep === steps.length} variant="contained" color="secondary" onClick={this.handleNext}>
                                {activeStep === steps.length - 1 ? 'Lancer l\'arrêté' : 'Suivant'}
                            </Button>
                            </Popconfirm>
                        </Box>
                    </Grid>
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? (
                        <div>
                            <Typography className={classes.instructions}>Terminer</Typography>
                            <Button onClick={this.handleReset}>Recommencer</Button>
                        </div>
                    ) : (
                        <Grid container justify="center" spacing={0}>
                            <Box mt={4}>
                                <Grid container >
                                    <Grid item xs={12} md={12}>
                                        <div className={classes.instructions}>{this.getStepContent(activeStep)}</div>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    )}
                </div>
        )

        const component = {
            'title': title,
            'subTitle': subTitle,
            'content': content,
            'selected': this.props.id,
            "img": img
        }

        return (
            <Template component={component} />

        );
    }
}

const mapStateToProps = state => ({
    calculs: state.calculs.calculs,
    auth: state.auth
})

export default compose(withStyles(useStyles, {withTheme: true}), connect(mapStateToProps, { getCalcul }))(withRouter(Calcul))