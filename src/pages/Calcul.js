import React, { Component  } from 'react'
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import { getComptes } from "../actions/comptes"
import { getOperations } from "../actions/operations";
import { getCalcul } from "../actions/calculs";
import axios from "axios";
import {
    Grid,
    Button,
    Stepper,
    Step,
    StepLabel,
    Typography,
    Box,
    Paper,
    TextField,
    Table,
    TableRow,
    TableCell,
    TableBody,
    TableHead,
    TableContainer,
} from "@material-ui/core";
import { formStepperStyle, useStyles} from "../constants/constants";
import { compose } from "redux";
import {withStyles} from "@material-ui/core/styles";
import Template from "./Template";
import MUIDataTable from "mui-datatables";
import img from "../assets/google_compute_engine_48px.png";


class SelectAccount extends Component{

    state = {
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
            },
            {
                name: "code_agence",
                label: "Code agence",
                options: {
                    filter: true,
                    sort: true
                },
            },
            {
                name: "type_account",
                label: "Type de compte",
                options: {
                    filter: true,
                    sort: true
                },
            },
            {
                name: "montant",
                label: "Montant autorisé",
                options: {
                    filter: true,
                    sort: true
                },
            },
            {
                name: "period",
                label: "Période autorisation",
                options: {
                    filter: true,
                    sort: true
                },
            },

        ],
        rows_selected : this.props.index,
        accounts_selected : [],
    }

    sendAccount = (accounts) => {
        this.props.getAccount(accounts)
    }

    static getDerivedStateFromProps(nextProps, state) {

        if (nextProps.data !== state.data) {
            return {
                data: nextProps.data,
            }
        }

        if(nextProps.index !== state.rows_selected){
            return {
                rows_selected: nextProps.index
            }
        }

        return null
    }

    onRowsSelect = (curRowSelected, allRowsSelected) => {

        // console.log("Row Selected: ", this.state.data[curRowSelected[0].index].num_compte);
        // console.log("All Selected: ", allRowsSelected);

        const accounts = allRowsSelected.map( ind => this.state.data[ind.index].num_compte)
        const indexes = allRowsSelected.map( ind => ind.dataIndex)
        this.setState({
            accounts_selected: accounts,
            rows_selected: indexes
        })

        this.sendAccount({accounts, indexes})
    }

    render() {

        const selected = (({num_compte, code_agence, type_account, intitule_compte}) => ({num_compte, code_agence, type_account, intitule_compte}))(this.props.data)

        console.log(selected)

        const options =  {
                filterType: 'checkbox',
                rowsPerPage: 200,
                onRowSelectionChange: this.onRowsSelect,
                print: false,
                download: false,
                filter: false,
                viewColumns: false,
                rowsSelected: this.state.rows_selected,
                selectableRowsHideCheckboxes: false
            }

            // console.log(this.state.rows_selected)

        return (
            <Grid item md={12}>
                <MUIDataTable
                    title={"Liste des numéros de compte"}
                    data={this.props.data}
                    columns={this.state.columns}
                    options={options}

                />
            </Grid>
        );
    }

}


class SelectOperation extends Component{


    state = {
        data: this.props.data,
        operations_selected : [],
        rows_selected: this.props.index,
        columns : [
            {
                name: "code_operation",
                label: "Code opération",
                options: {
                    filter: true,
                    sort: true
                }
            },
        ]
    }

    onRowsSelect = (curRowSelected, allRowsSelected) => {

        // console.log("Row Selected: ", this.state.data[curRowSelected[0].index].num_compte);
        // console.log("All Selected: ", allRowsSelected);

        const operations = allRowsSelected.map( ind => this.state.data[ind.index].code_operation)
        const indexes = allRowsSelected.map(ind => ind.dataIndex)

        this.setState({
            rows_selected: indexes
        })

        this.sendOperation({operations, indexes})
    }

    sendOperation = (operations) => {
        console.log("called")
        this.props.getOpera(operations)
    }


    render() {

        const options = {
                filterType: 'checkbox',
                rowsPerPage: 10,
                onRowSelectionChange: this.onRowsSelect,
                print: false,
                download: false,
                filter: false,
                viewColumns: false,
                rowsSelected: this.state.rows_selected
            }

        return (
            <Grid item md={10}>
                <MUIDataTable
                    title={"Opérations à exclure"}
                    data={this.state.data}
                    columns={this.state.columns}
                    options={options}
                />
            </Grid>
        );
    }
}

class FormStepper extends Component {

    state = {
        taux_int_1: this.props.options['taux_int_1'],
        taux_int_2: this.props.options['taux_int_2'],
        taux_com: this.props.options['taux_com'],
        fort_dec: this.props.options['fort_dec'],
        tva: this.props.options['tva'],
        date_deb: this.props.options['date_deb'],
        date_fin: this.props.options['date_fin'],
        solde_initial: this.props.options['solde_initial']
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        // this.props.updateProps(this.state)
    }

    handleSubmit = (e) =>{

        e.preventDefault()

        this.props.updateProps(this.state)
    }


    render() {

        const { taux_int_1, taux_int_2, taux_com, fort_dec, tva, date_deb, date_fin, solde_initial } = this.state

        return (
            <>
                <Paper elevation={10} style={formStepperStyle}>
                    <form onSubmit={this.handleSubmit}>
                        <Grid spacing={1} container justify="center">
                            <Grid item md={4}>
                                <h3>Taux d'intérêts</h3>
                            </Grid>
                            <Grid item md={4}>
                                <Box>
                                    <TextField
                                        name="taux_int_1"
                                        label='Taux d’intérêts 1'
                                        placeholder="Taux d’intérêts"
                                        value={taux_int_1}
                                        onChange={this.handleChange}
                                        type="number"
                                        required/>
                                </Box>
                            </Grid>
                            <Grid item md={4}>
                                <Box>
                                    <TextField
                                        name="taux_int_2"
                                        label='Taux d’intérêts 2'
                                        placeholder="Taux d’intérêts"
                                        value={taux_int_2}
                                        onChange={this.handleChange}
                                        type="number"
                                        required/>
                                </Box>
                            </Grid>

                            <Grid item md={4}>
                                <h3>Commissions/ Fort découvert</h3>
                            </Grid>

                            <Grid item md={4}>
                                <Box >
                                    <TextField
                                        name="taux_com"
                                        label='Taux de commissions,'
                                        placeholder="Taux de commissions,"
                                        type="number"
                                        value={taux_com}
                                        onChange={this.handleChange}
                                        required/>
                                </Box>
                            </Grid>
                            <Grid item md={4}>
                                <Box >
                                    <TextField
                                        name="fort_dec"
                                        label='Taux du plus fort découvert'
                                        placeholder="Taux du plus fort découvert"
                                        value={fort_dec}
                                        onChange={this.handleChange}
                                        required/>
                                </Box>
                            </Grid>

                            <Grid item md={4}>
                                <h3>TVA / Solde</h3>
                            </Grid>

                            <Grid item md={4}>
                                <Box >
                                    <TextField
                                        name="tva"
                                        label='TVA'
                                        placeholder="tva"
                                        value={tva}
                                        onChange={this.handleChange}
                                        required/>
                                </Box>
                            </Grid>
                            <Grid item md={4}>
                                <Box >
                                    <TextField
                                        name="solde_initial"
                                        label='Solde initial'
                                        placeholder="Solde inititial"
                                        value={solde_initial}
                                        onChange={this.handleChange}
                                        required/>
                                </Box>
                            </Grid>

                            <Grid item md={4}>
                                <h3>Période de l'arrêté</h3>
                            </Grid>
                            <Grid item  md={4}>
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
                            <Grid item md={4}>
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
        open: false,
        classes: this.props,
        activeStep: 0,
        accounts: [],
        index: [],
        index_operations: [],
        operations: [],
        options: {
            taux_int_1: 7.0,
            taux_int_2: 15.5,
            taux_com: 0.025,
            fort_dec: 0.020833,
            tva: 19.25,
            date_deb: "2021-04-30",
            date_fin: "2021-05-31",
            solde_initial: 2369317300
        }
    }

    getAccounts = (props) => {

        // Updating new selected accounts
        // const new_accs = [...new Set([...props.accounts,...this.state.accounts])]
        // const new_indexes = [...new Set([...props.indexes,...this.state.index])]


        this.setState({
            accounts: props.accounts,
            index: props.indexes
        })

        // console.log(props.accounts)

    }
    getOperations = (props) => {
        this.setState({
            operations: props.operations,
            index_operations: props.index_operations
        })
    }

    updateOptions = (optionsChild) => {
        this.setState({
            options: optionsChild
        })

        console.log(optionsChild)
    }

    static propTypes = {

        getComptes: PropTypes.func.isRequired,
        comptes: PropTypes.array.isRequired,
        getOperations: PropTypes.func.isRequired,
        operations: PropTypes.array.isRequired,

        getCalcul: PropTypes.func.isRequired,
        calculs: PropTypes.array.isRequired
    }

    getSteps = () => {
        return ['Choix des numéros de compte', 'Opérations à exclure', 'Options suplémentaires', 'Lancement'];
    }

    getStepContent = (stepIndex) => {
        switch (stepIndex) {
            case 0:
                return <SelectAccount getAccount={this.getAccounts} data={this.props.comptes} index={this.state.index} />;
            case 1:
                return <SelectOperation getOpera={this.getOperations}  data={this.props.operations} index={this.state.index_operations} />;
            case 2:
                return <FormStepper updateProps={this.updateOptions} options={this.state.options} />;
            case 3:
                return<Grid container spacing={2}>
                    <Grid item md={3} xs={12}>
                        <TableContainer component={Paper}>
                            <Table className={this.state.classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Index</TableCell>
                                        <TableCell>Numéro de compte</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.accounts.map((account, index) => (
                                            <TableRow key={index+1}>
                                                <TableCell component="th" scope="row">
                                                    {index}
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {account}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                                </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item md={3} xs={12}>
                        <TableContainer component={Paper}>
                            <Table className={this.state.classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Index</TableCell>
                                        <TableCell>Opérations à exclure</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.operations.map((operation, index) => (
                                        <TableRow key={index+1}>
                                            <TableCell component="th" scope="row">
                                                {index}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {operation}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TableContainer component={Paper}>
                            <Table className={this.state.classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Index</TableCell>
                                        <TableCell>Option</TableCell>
                                        <TableCell>Valeur</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                     <TableRow key={1}>
                                        <TableCell component="th" scope="row">
                                            {1}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            Taux d'intérêts débiteurs
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {this.state.options["taux_int_1"]} et {this.state.options["taux_int_2"]}
                                        </TableCell>
                                    </TableRow>

                                    <TableRow key={2}>
                                        <TableCell component="th" scope="row">
                                            {2}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            Commission & plus Fort découvert
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {this.state.options["taux_com"]} et {this.state.options["fort_dec"]}
                                        </TableCell>
                                    </TableRow>

                                    <TableRow key={3}>
                                        <TableCell component="th" scope="row">
                                            {3}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            Tva & solde initial
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {this.state.options["tva"]} & {this.state.options['solde_initial']}
                                        </TableCell>
                                    </TableRow>

                                    <TableRow key={4}>
                                        <TableCell component="th" scope="row">
                                            {4}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            Période d'arrêté
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {this.state.options["date_deb"]} au  {this.state.options["date_fin"]}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>

            default:
                return 'cliquez sur lancer l\'arrêté';
        }
    }

    componentDidMount() {
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
            case 3:
                // Computation happening
                axios.post('http://127.0.0.1:8000/api/calculs', {"accounts": this.state.accounts, "operations": this.state.operations, "options": this.state.options})
                    .then(
                    res => {

                        // console.log(res.data)
                        this.props.history.push(
                            {
                                pathname: '/Results',
                                state: res.data
                            }
                        )
                    }
                ).catch( err => {
                    console.log(err)
            })

                this.setState((prevState) => ({
                    activeStep: 0
                }))
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
        const subTitle = 'Suivez les différentes étapes pour faire vos arrêtés'

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
                            <Button disabled={activeStep === steps.length} variant="contained" color="secondary" onClick={this.handleNext}>
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
                                            <div className={classes.instructions}>{this.getStepContent(activeStep)}</div>
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
            'content': content,
            'selected': 2,
            "img": img
        }

        return (
            <Template component={component} />

        );
    }
}

const mapStateToProps = state => ({
    comptes: state.comptes.comptes,
    operations: state.operations.operations,
    calculs: state.calculs.calculs
})

export default compose(withStyles(useStyles, {withTheme: true}), connect(mapStateToProps, { getComptes, getOperations, getCalcul }))(Calcul)