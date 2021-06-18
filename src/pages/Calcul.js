import React, { Component  } from 'react'
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import { getHistoriques } from "../actions/historiques";
import { getComptes } from "../actions/comptes"
import { getOperations } from "../actions/operations";

import {
    Grid,
    IconButton, Button, Stepper, Step, StepLabel, Typography, Box, Paper, TextField, FormControlLabel, Checkbox, Grow
} from "@material-ui/core";
import {data, formStepperStyle, paperLogStyle, specialLinkLog, useStyles} from "../constants/constants";
import { compose } from "redux";
import {withStyles} from "@material-ui/core/styles";
import Template from "./Template";
import MUIDataTable from "mui-datatables";

class SelectAccount extends Component{

    constructor(props) {
        super(props);


        this.state = {
            data: this.props.data,
            accountsSelected : [],
            columns : [
                {
                    name: "num_compte",
                    label: "Numéro de compte",
                    options: {
                        filter: true,
                        sort: true,

                    }
                },
                {
                    name: "intitule_compte",
                    label: "Intitulé du compte",
                    options: {
                        filter: true,
                        sort: true
                    },
                }
            ],
            options : {
                filterType: 'checkbox',
                rowsPerPage: 5,
                onRowsSelect: this.onRowsSelect,
                print: false,
                download: false,
                filter: false,
                viewColumns: false
            },
            accounts_selected : []
        }
    }

    sendAccount = (accounts) => {
        console.log("called")
        this.props.getAccount(accounts)
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.data !== this.state.data) {
            this.setState({
                data: nextProps.data
            });
        }
    }


    onRowsSelect = (curRowSelected, allRowsSelected) => {

        // console.log("Row Selected: ", this.state.data[curRowSelected[0].index].num_compte);
        // console.log("All Selected: ", allRowsSelected);

        const accounts = allRowsSelected.map( ind => this.state.data[ind.index].num_compte)
        this.setState({
            accounts_selected: accounts
        })

        this.sendAccount(accounts)
    }


    render() {

        return (
            <>
                <MUIDataTable
                    title={"Liste des numéros de compte"}
                    data={this.state.data}
                    columns={this.state.columns}
                    options={this.state.options}

                />
            </>
        );
    }

}

class SelectOperation extends Component{


    constructor(props) {
        super(props);

        this.state = {
            data: this.props.data,
            operations_selected : [],
            columns : [
                {
                    name: "code_operation",
                    label: "Code opération",
                    options: {
                        filter: true,
                        sort: true
                    }
                },
            ],
            options : {
                filterType: 'checkbox',
                rowsPerPage: 5,
                onRowsSelect: this.onRowsSelect,
                print: false,
                download: false,
                filter: false,
                viewColumns: false
            },
        }
    }

    onRowsSelect = (curRowSelected, allRowsSelected) => {

        // console.log("Row Selected: ", this.state.data[curRowSelected[0].index].num_compte);
        // console.log("All Selected: ", allRowsSelected);

        const operations = allRowsSelected.map( ind => this.state.data[ind.index].code_operation)

        this.sendOperation(operations)
    }

    sendOperation = (operations) => {
        console.log("called")
        this.props.getOpera(operations)
    }


    render() {
        return (
            <>
                <MUIDataTable
                    title={"Opérations à exclure"}
                    data={this.state.data}
                    columns={this.state.columns}
                    options={this.state.options}
                />
            </>
        );
    }
}

class FormStepper extends Component {

    state = {
        taux_int_1: 13.25,
        taux_int_2: 14.25,
        taux_com: 0.025,
        fort_dec: 0.02,
        tva: 19.25
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })

        this.props.updateOptions(this.state)
    }


    render() {

        const { taux_int_1, taux_int_2, taux_com, fort_dec, tva } = this.state

        return (
            <>
                <Paper elevation={10} style={formStepperStyle}>
                    <form>
                        <Grid spacing={2} container justify="center">
                            <Grid item md={3}>
                                <Box>
                                    <TextField
                                        name="taux_int_1"
                                        label='Taux d’intérêts 1'
                                        placeholder="Taux d’intérêts"
                                        defaultValue={13.5}
                                        value={taux_int_1}
                                        onChange={this.handleChange}
                                        type="number"
                                        required/>
                                </Box>
                            </Grid>
                            <Grid item md={3}>
                                <Box>
                                    <TextField
                                        name="taux_int_2"
                                        label='Taux d’intérêts 2'
                                        placeholder="Taux d’intérêts"
                                        defaultValue={14.5}
                                        value={taux_int_2}
                                        onChange={this.handleChange}
                                        type="number"
                                        required/>
                                </Box>
                            </Grid>
                            <Grid item md={3}>
                                <Box >
                                    <TextField
                                        name="taux_com"
                                        label='Taux de commissions,'
                                        placeholder="Taux de commissions,"
                                        defaultValue={0.025}
                                        type="number"
                                        value={taux_com}
                                        onChange={this.handleChange}
                                        required/>
                                </Box>
                            </Grid>
                            <Grid item md={3}>
                                <Box >
                                    <TextField
                                        name="fort_dec"
                                        label='Taux du plus fort découvert'
                                        placeholder="Taux du plus fort découvert"
                                        defaultValue={0.020833}
                                        value={fort_dec}
                                        onChange={this.handleChange}
                                        required/>
                                </Box>
                            </Grid>
                            <Grid item md={3}>
                                <Box >
                                    <TextField
                                        name="tva"
                                        label='TVA'
                                        placeholder="tva"
                                        defaultValue={19.25}
                                        value={tva}
                                        onChange={this.handleChange}
                                        required/>
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

    constructor(props) {
        super(props);
    }

    state = {
        open: false,
        files: [],
        activeStep: 0,
        accounts: [],
        operations: [],
        options: {
            taux_int_1: 13.25,
            taux_int_2: 14.25,
            taux_com: 0.025,
            fort_dec: 0.02,
            tva: 19.25
        }
    }

    getAccounts = (accs) => {
        this.setState({
            accounts: accs
        })
    }
    getOperations = (ops) => {
        this.setState({
            operations: ops
        })
    }
    updateOptions = (optionsChild) => {
        this.setState({
            options: optionsChild
        })

        console.log(optionsChild)
    }

    static propTypes = {
        getHistoriques: PropTypes.func.isRequired,
        historiques: PropTypes.array.isRequired,

        // getComptes: PropTypes.func.isRequired,
        // comptes: PropTypes.array.isRequired,
        // getOperations: PropTypes.func.isRequired,
        // operations: PropTypes.array.isRequired
    }

    getSteps = () => {
        return ['Choix des numéros de compte', 'Opérations à exclure', 'Options suplémentaires', 'Lancement'];
    }

     getStepContent = (stepIndex) => {
        switch (stepIndex) {
            case 0:
                return <SelectAccount getAccount={this.getAccounts} data={this.props.comptes} />;
            case 1:
                return <SelectOperation getOpera={this.getOperations}  data={this.props.operations} />;
            case 2:
                return <FormStepper updateProps={this.updateOptions} />;
            case 3:
                return 'cliquez sur lancer l\'arrêté';
            default:
                return 'cliquez sur lancer l\'arrêté';
        }
    }

    componentDidMount() {
        this.props.getHistoriques()
        this.props.getComptes()
        this.props.getOperations()
    }

     handleNext = () => {

        switch (this.state.activeStep) {
            case 0:
                if(this.state.accounts.length !== 0){
                    this.setState((prevState) => ({
                        activeStep: prevState.activeStep + 1
                    }) )
                }
                return;
            case 1:
                this.setState((prevState) => ({
                    activeStep: prevState.activeStep + 1
                }))
                return;
            case 2:
                const obj = this.state.options
                const res = Object.keys(obj).every((k) => isNaN(obj[k]))
                if (!res){
                    this.setState((prevState) => ({
                        activeStep: prevState.activeStep + 1
                    }))
                }
                return;
            default:
                return;



        }

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

        const { classes } = this.props;

        const activeStep = this.state.activeStep

        const steps = this.getSteps()

        const title = 'Calcul des arrêtés'
        const subTitle = 'Suivant les différentes étapes pour faire vos arrêtés'

        const content = (
            <>
                <div className={classes.rootStepper}>
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
                            <Button variant="contained" color="secondary" onClick={this.handleNext}>
                                {activeStep === steps.length - 1 ? 'Lancer l\'arrêté' : 'Suivant'}
                            </Button>

                        </Box>
                    </Grid>
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <div>
                        {activeStep === steps.length ? (
                            <div>
                                <Typography className={classes.instructions}>Terminer</Typography>
                                <Button onClick={this.handleReset}>Recommencer</Button>
                            </div>
                        ) : (
                            <div>
                                <Grid container justify="center">
                                    <Box mt={5} mb={5}>
                                        <Typography className={classes.instructions}>{this.getStepContent(activeStep)}</Typography>
                                    </Box>
                                </Grid>
                            </div>
                        )}
                    </div>
                </div>
            </>
        )

        const component = {
            'title': title,
            'subTitle': subTitle,
            'content': content
        }


        return (
            <Template component={component} />
        );
    }
}

const mapStateToProps = state => ({
    historiques: state.historiques.historiques,
    comptes: state.comptes.comptes,
    operations: state.operations.operations
})

export default compose(withStyles(useStyles, {withTheme: true}), connect(mapStateToProps, { getHistoriques, getComptes, getOperations }))(Calcul)