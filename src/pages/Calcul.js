import React, { Component  } from 'react'
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import ControlledSelectionGrid from "./FullSelected"
import axios from "axios";
import {Grid, Button, Stepper, Step, StepLabel, Box, Paper, TextField,
} from "@material-ui/core";
import {useStyles, urlCalcul, urlInfos} from "../constants/constants";
import { compose } from "redux";
import {withStyles} from "@material-ui/core/styles";
import Template from "./Template";
import img from "../assets/google_compute_engine_48px.png";
import { Popconfirm, Typography, Select, Space} from 'antd';
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import { notification } from 'antd';
import {withRouter} from 'react-router-dom';
import { formStepperStyle } from "../constants/constants";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import ReactExport from "react-export-excel";
import imgResult from "../assets/accounting_80px.png";
import DataTable from "./FullSelected_Antd";
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import ReplayIcon from '@material-ui/icons/Replay';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const { Option } = Select;


// Form stepper to for Epargne and Courant
class FormCourant extends Component {

    state = {
        options: this.props.options,
        openAlert: false,
        choice: this.props.choice,
        file_path: " "
    }

    handleChange = (e) => {
        const options = this.state.options;
        const newValue = e.target.value

        console.log(e.target.value, e.target.name)

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
            notification.success({
                message: 'Mise à jour effectuée',
                placement: 'bottomRight',
                duration: 5
            })
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

        const {frais_fixe,  taux_interet_debiteur_1, taux_interet_debiteur_2, taux_interet_debiteur_3, taux_commision_mouvement, taux_commision_decouvert, taux_tva, date_deb, date_fin } = this.state.options

        return (
            <>
                <Grid container >
                    <Grid item md={12} xs={12}>
                        <Box mb={3}></Box>
                    </Grid>
                </Grid>
                <Paper elevation={10} style={formStepperStyle}>
                    <form onSubmit={this.handleSubmit}>
                        <Grid spacing={2} container justify="center">

                            <Grid item md={12} >
                                <Space size="large">
                                    <h3 style={{ width: 200}}>Taux d'intérêts:</h3>
                                    <TextField
                                        name="taux_interet_debiteur_1"
                                        label='Intérêt débiteur 1'
                                        placeholder="Intérêt débiteur 1"
                                        value={taux_interet_debiteur_1}
                                        onChange={this.handleChange}
                                        type="number"
                                        onChange={this.handleChange}
                                        required  />

                                    <TextField
                                        name="taux_interet_debiteur_2"
                                        label='Intérêt débiteur 2'
                                        placeholder="Intérêt débiteur 2"
                                        value={taux_interet_debiteur_2}
                                        onChange={this.handleChange}
                                        type="number"
                                        InputProps={{ inputProps: { min: 0, step: "any" } }}
                                        required
                                    />

                                    <TextField
                                        name="taux_interet_debiteur_3"
                                        label='Intérêt débiteur 3'
                                        placeholder="Intérêt débiteur 3"
                                        value={taux_interet_debiteur_3}
                                        onChange={this.handleChange}
                                        type="number"
                                        InputProps={{ inputProps: { min: 0, step: "any" } }}
                                        required
                                    />
                                </Space>
                            </Grid>
                            <Grid item md={12} style={{ marginTop: 20}} >
                                <Space size="large">
                                    <h3 style={{ width: 200}}> Commission/ Frais fixes</h3>
                                    <TextField
                                        name="taux_commision_mouvement"
                                        label='Mouvement'
                                        placeholder="Mouvement"
                                        onChange={this.handleChange}
                                        type="number"
                                        InputProps={{ inputProps: { min: 0, step: "any" } }}
                                        value={taux_commision_mouvement}
                                        required  />

                                    <TextField
                                        name="taux_dec"
                                        label='Découvert'
                                        placeholder="Découvert"
                                        onChange={this.handleChange}
                                        type="number"
                                        InputProps={{ inputProps: { min: 0, step: "any" } }}
                                        value={taux_commision_decouvert}
                                        required
                                    />

                                    <TextField
                                        name="frais_fixe"
                                        label='Frais Fixe'
                                        placeholder="Frais Fixe"
                                        onChange={this.handleChange}
                                        type="number"
                                        InputProps={{ inputProps: { min: 0, step: "any" } }}
                                        value={frais_fixe}
                                        required />
                                </Space>
                            </Grid>
                            <Grid item md={12}  style={{ marginTop: 20}} >
                                <Space size="large">
                                    <h3 style={{ width: 200}}>Période / Tva</h3>
                                    <TextField
                                        name="taux_tva"
                                        label='Taux tva'
                                        placeholder="Taux tva"
                                        onChange={this.handleChange}
                                        type="number"
                                        InputProps={{ inputProps: { min: 0, step: "any" } }}
                                        value={taux_tva}
                                        required  />

                                    <TextField
                                        id="date"
                                        type="date"
                                        name="date_deb"
                                        label="Date de début"
                                        value={date_deb}
                                        onChange={this.handleChange}
                                        required
                                    />

                                    <TextField
                                        id="date"
                                        type="date"
                                        name="date_fin"
                                        label="Date de fin"
                                        value={date_fin}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </Space>
                            </Grid>
                            <Grid item md={12} align="center">
                                <Button type="submit" variant="contained" color="primary">
                                    Valider
                                </Button>
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

        console.log(e.target.value, e.target.name)
        options[e.target.name] = newValue

        this.setState({options: options})
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const options = this.state.options
        const choice = this.state.choice

        const isEmpty = Object.values(options).every(x => x === null || x === '');

        if (!isEmpty) {
            this.props.updateProps({options, choice})
            notification.success({
                message: 'Mise à jour effectuée',
                placement: 'bottomRight',
                duration: 5
            })
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
        const {taux_interet_inferieur, taux_interet_superieur, taux_ircm, taux_tva, date_deb, date_fin, frais_fixe } = this.state.options

        return (
            <>

                <Paper elevation={10} style={formStepperStyle}>
                    <form onSubmit={this.handleSubmit}>
                        <Grid spacing={0} container align="left">
                            <Grid item md={12}>
                                <Space size="large">
                                    <h3 style={{ width: 200}}>Taux d'intérêts :</h3>
                                    <TextField
                                        name="taux_interet_inferieur"
                                        label='Taux Inférieur'
                                        placeholder="Taux Inférieur"
                                        value={taux_interet_inferieur}
                                        onChange={this.handleChange}
                                        type="number"
                                        InputProps={{ inputProps: { min: 0, step: "any" } }}
                                        required />

                                    <TextField
                                        name="taux_interet_superieur"
                                        label='Taux Supérieur'
                                        placeholder="Taux Supérieur"
                                        value={taux_interet_superieur}
                                        onChange={this.handleChange}
                                        type="number"
                                        InputProps={{ inputProps: { min: 0, step: "any" } }}
                                        required/>

                                    <TextField
                                        name="taux_interet_superieur"
                                        label='Taux Supérieur'
                                        placeholder="Taux Supérieur"
                                        value={taux_interet_superieur}
                                        onChange={this.handleChange}
                                        type="number"
                                        InputProps={{ inputProps: { min: 0, step: "any" } }}
                                        required/>
                                </Space>
                            </Grid>
                            <Grid item md={12} style={{ marginTop: 20}}>
                                <Space size="large">
                                    <h3 style={{ width: 200}}>Ircm / Tva / Frais fixes:</h3>
                                    <TextField
                                        name="taux_tva"
                                        label='Taux tva'
                                        type="number"
                                        InputProps={{ inputProps: { min: 0, step: "any" } }}
                                        placeholder="Taux tva"
                                        value={taux_tva}
                                        onChange={this.handleChange}
                                        required  />

                                    <TextField
                                        name="taux_ircm"
                                        label='Taux Ircm'
                                        placeholder="Taux Ircm"
                                        value={taux_ircm}
                                        type="number"
                                        InputProps={{ inputProps: { min: 0, step: "any" } }}
                                        onChange={this.handleChange}
                                        required
                                    />

                                    <TextField
                                        name="frais_fixe"
                                        label='Frais Fixe'
                                        placeholder="Découvert"
                                        onChange={this.handleChange}
                                        type="number"
                                        InputProps={{ inputProps: { min: 0, step: "any" } }}
                                        value={frais_fixe}
                                        required/>
                                </Space>
                            </Grid>
                            <Grid item md={12} style={{ marginTop: 20}}>
                                <Space size="large">
                                    <h3 style={{ width: 200}}> Période de l'arrêté :</h3>
                                    <TextField
                                        id="date"
                                        type="date"
                                        name="date_deb"
                                        label="Date de début"
                                        value={date_deb}
                                        onChange={this.handleChange}
                                        required />

                                    <TextField
                                        id="date"
                                        type="date"
                                        name="date_fin"
                                        label="Date de fin"
                                        value={date_fin}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </Space>
                            </Grid>
                            <Grid item md={12} align="center">
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
        index: [],
        accountSelected: [],

        // Operations part
        data_operations : [],
        indexOperations: [],
        operationSelected: [],

        key: `open${Date.now()}`,

        // Period chosen
        openAlert: false,
        alertComp: null,
        options_courant: {},
        options_epargne: {},
        // Popup confirm
        visible: false,
        confirmationLoading: false,
        loading: true,
        choice: "unique",
        choice_fusion: false,
        choice_valeur: true,
        commision_mouvement: false,
        commission_decouvert: false,
        regularisation: false,

        data_history: {},
        // Persistent State in local storage
        _loading: false,
        _saveStatus: 'READY',
        calcul_epargne_int_default: 50_000_000,
        progress: false,
    }

    number_format = (value) => {
        return (value).replace(/\d(?=(\d{3})+\.)/g, '$&,')
    }

    getAccounts = (props) => {

        const newData = typeof props.updateData !== "undefined" ? props.updateData:this.state.data
        const indexes = props.selectedRowKeys
        const newAccounts = indexes.map( (ind, val) => newData[ind])
        this.setState((prev) => ({
            index: props.selectedRowKeys,
            data: newData,
            accountSelected: newAccounts
        }))

    }

    getOperations = (props) => {
        this.setState((prev) => ({
            indexOperations: typeof props.selectedRowKeys !== 'undefined' ? props.selectedRowKeys:prev.indexOperations,
            data_operations: typeof props.updateData !== 'undefined' ? props.updateData:prev.data_operations
        }))

    }

    updateOptions = (optionsChild) => {

        const options = optionsChild.options
        const choice = optionsChild.choice

        if (choice === "epargne") {
            this.setState({
                options_courant: options
            })
        }else {
            this.setState({
                options_epargne: options
            })
        }
    }

    handleChoice = (val, e) => {

        console.log(val, e.name)
        this.setState({
            [e.name]: val
        })
    }

    static propTypes = {

        auth: PropTypes.object.isRequired,
        typeArrete: PropTypes.string.isRequired,
        typeCalcul: PropTypes.string.isRequired
    }

    getSteps = () => {
        return [ 'Choix des numéros de compte', 'Options supplémentaires', 'Mode d\'arrêté', 'Lancer le calcul'];
    }

    getStepContent = (stepIndex) => {
        switch (stepIndex) {
            case 0:
                const datas = this.state.data
                const index = this.state.index
                const loading = this.state.loading
                const choice = this.props.typeCalcul === "courant" ? "calcul": "calcul_epargne"
                return <DataTable key={0} title="Numéros de comptes disponibles dans l'historique actif" data={datas}  index_selected={index} setSelection={this.getAccounts} select={true}  choice={choice} check={true} loading={loading} typeArrete={this.props.typeCalcul} />;

            // case 1:
            //     const dataOperations = this.state.data_operations
            //     const indexOperations = this.state.indexOperations
            //     const loadingOperations = this.state.loading
            //     return <Grid container spacing={2} justify="center" alignItems="center">
            //         <Grid item md={10}>
            //             <DataTable key={1} title="Choisissez les opérations à exclure" select={true} data={dataOperations} typeArrete={this.props.typeCalcul}  index_selected={indexOperations} setSelection={this.getOperations}  choice="operations" check={true} loading={loadingOperations} />
            //         </Grid>
            //     </Grid>;

            case 1:
                const type_computation = this.props.typeCalcul
                let component = <></>

                if (type_computation === "courant") component = <FormCourant key={5} updateProps={this.updateOptions} options={this.state.options_courant} choice={type_computation} />;
                else component = <FormEpargne key={4} updateProps={this.updateOptions} options={this.state.options_epargne} choice={type_computation} />;

                return <Grid item md={10}>
                    {component}
                </Grid>
                ;
            case 2:
                let box_sup = <>
                    {/*<FormControlLabel*/}
                    {/*    control={<Checkbox checked={this.state.commision_mouvement} onChange={this.handleChoice} name="commision_mouvement" />}*/}
                    {/*    label="Exclure commission mouvement"*/}
                    {/*/>*/}
                    {/*<FormControlLabel*/}
                    {/*    control={<Checkbox checked={this.state.commission_decouvert} onChange={this.handleChoice} name="commission_decouvert" />}*/}
                    {/*    label="Exclure commission découvert"*/}
                    {/*/>*/}
                </>

                if (this.props.typeCalcul === "epargne")
                    box_sup =  <>

                        <FormControlLabel
                            labelPlacement="start"
                            label="Valeur Intérêt   :  "
                            control={
                                <Select defaultValue={this.state.calcul_epargne_int_default} style={{ width: 150, fontsize: 10, fontFamily: "Arial" }} onChange={this.handleChoice}>
                                    <Option name="calcul_epargne_int_default" value={50_000_000}>50 000 000</Option>
                                    <Option name="calcul_epargne_int_default" value={10_000_000}>10 000 000</Option>
                                </Select>
                            }
                        />

                        {/*<FormControlLabel*/}
                        {/*    control={<Checkbox checked={this.state.calcul_epargne_int_default} onChange={this.handleChoice} name="calcul_epargne_int_default" />}*/}
                        {/*    label="Intérêts à 10 000 000"*/}
                        {/*/>*/}
                    </>

                return <Grid item md={12} xs={12} >
                    <Box mt={5} mb={5}>
                        <FormGroup row>
                            <Space size="large">
                                {box_sup}
                                <FormControlLabel
                                    labelPlacement="start"
                                    label="Classement par ordre de valeur  :  "
                                    control={
                                        <Select defaultValue={this.state.choice_valeur} style={{ width: 150, fontsize: 10, fontFamily: "Arial" }} onChange={this.handleChoice}>
                                            <Option name="choice_valeur" value={true}>Oui</Option>
                                            <Option name="choice_valeur" value={false}>Non</Option>
                                        </Select>
                                    }
                                />
                                <FormControlLabel
                                    labelPlacement="start"
                                    control={
                                        <Select defaultValue={this.state.regularisation} style={{ width: 150, fontsize: 10, fontFamily: "Arial" }} onChange={this.handleChoice}>
                                            <Option name="regularisation" value={true}>Oui</Option>
                                            <Option name="regularisation" value={false}>Non</Option>
                                        </Select>
                                    }
                                    label="Arrêté en régularisation  :  "
                                />
                            </Space>
                        </FormGroup>
                    </Box>
                </Grid>
            case 3:

                const newAccounts = this.state.accountSelected
                // const newOperations = this.getFinalSelected()
                const choiceRecap = this.props.typeCalcul === "courant" ? "accounts_recap": "accounts_recap_epargne"
                const val_epargne = this.state.calcul_epargne_int_default
                let options = this.state.options_courant
                let recap_options =
                    <>
                        <Alert>
                             <span style={{ marginRight: 25}} >
                                Taux Intérêt 1: {options.taux_interet_debiteur_1} %
                             </span>
                            <span style={{ marginRight: 25}} >
                                Taux Intérêt 2:{options.taux_interet_debiteur_2} %,
                            </span>
                            <span style={{ marginRight: 25}} >
                                Taux Intérêt 3: {options.taux_interet_debiteur_3} %,
                            </span>
                        </Alert>
                        <Alert>
                            <span style={{ marginRight: 25}} >
                                Taux Com Mvt: {options.taux_commision_mouvement},
                            </span>
                            <span style={{ marginRight: 25}} >
                                Taux Com Déc: {options.taux_commision_decouvert},
                            </span>
                            <span style={{ marginRight: 25}} >
                                Tva: {options.taux_tva}
                            </span>
                            <span>
                                Frais fixes: {options.frais_fixe}
                            </span>
                        </Alert>
                    </>
                if (this.props.typeCalcul === "epargne"){
                    options = this.state.options_epargne
                    recap_options =
                        <Alert>
                            <span style={{ marginRight: 25}} >
                                Valeur intérêt: {val_epargne.toLocaleString()}
                            </span>
                            <span style={{ marginRight: 25}}>
                                Taux Intérêt {"<="} {val_epargne.toLocaleString()}: {options.taux_interet_superieur} %
                            </span>
                            <span style={{ marginRight: 25}}>
                                Taux Intérêt {">"} {val_epargne.toLocaleString()}: {options.taux_interet_superieur} %
                            </span>
                            <span >
                                Frais fixes: {options.frais_fixe}
                            </span>
                            {/*<Alert>*/}
                            {/*    Intérêt {">"} {val_epargne.toLocaleString()}: {options.taux_interet_superieur} %, Ircm: {options.taux_ircm} %,*/}
                            {/*    Tva: {options.taux_tva}*/}
                            {/*</Alert>*/}
                        </Alert>
                }


                const recap =<>
                    <Grid align="center" item md={10} xs={10} >
                        <Collapse in={true}>
                            <Alert>
                                 <span style={{ marginRight: 25}}>
                                    Période de l'arrêté: du {options.date_deb} au {options.date_fin}
                                </span>
                                <span style={{ marginRight: 25}}>
                                    Arrêté en régularisation:  {this.state.regularisation === true ? "Oui": "Non"}
                                </span>
                                <span style={{ marginRight: 25}}>
                                    Classement par ordre de valeur:  {this.state.choice_valeur === true ? "Oui": "Non"}
                                </span>
                            </Alert>
                            {recap_options}
                        </Collapse>
                        <Box mt={2}></Box>
                        <DataTable key={2} title="Numéros de compte choisis" data={newAccounts}  index_selected={[]} select={false} setSelection={this.getAccounts}  choice={choiceRecap} check={false} loading={false} />
                    </Grid>
                    </>
                    {/*<Grid item md={12}>*/}
                    {/*    <DataTable key={3} title="Opérations choisies" data={newOperations}  index_selected={[]} select={false} setSelection={this.getAccounts}  choice="operations_recap" check={false} loading={false} />*/}
                    {/*</Grid>*/}

                return recap;
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

        axios.post(urlInfos, {"type_account": this.props.typeCalcul }, config)
            .then( res => {

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
                    frais_fixe: 5_000,
                    date_fin: '2021-07-31',
                    date_deb: "2021-07-01"
                }
                const options_epargne =  {
                    taux_interet_inferieur: 2.45,
                    frais_fixe: 2_000,
                    taux_interet_superieur: 2.45,
                    taux_ircm: 16.5,
                    taux_tva: 19.25,
                    date_fin: '2021-06-30',
                    date_deb: "2021-01-01",
                }

                this.setState({
                    data: res.data['accounts'],
                    // data_operations: res.data['operations'],
                    file_path: res.data['file_path'],
                    loading: false,
                    options_courant: options_courant,
                    options_epargne: options_epargne
                    })
            }).catch( err => {

            this.setState({loading: false})
        })
    }

    next = () => {
        this.setState((prevState) => ({
            activeStep: prevState.activeStep + 1
        }) )
    }
    handleNext = () => {
        switch (this.state.activeStep) {
            case 0:
                if(this.state.index.length !== 0){
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
            // case 1:
            //     this.next()
            //     return
            case 1:
                let options = this.state.options_courant
                if (this.props.typeCalcul === "epargne") options = this.state.options_epargne

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
            case 2:
                this.next()
                return;
            case 3:
                this.setState({
                    visible: true
                })
                return;
            default:
                return;
        }

    };

    getFinalSelected(){
        const indexesOperations = this.state.indexOperations
        const operations = this.state.data_operations

        const newOperations = operations.filter( obj  => !indexesOperations.includes(obj.key))

        return newOperations
    }

    handleOk = () => {
        this.setState({
            confirmationLoading: true
        })

        this.setState({
            visible: false,
            confirmationLoading: false,
            progress: true
        });
        // Get local token
        const token  = this.props.auth.token
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        if(token){
            config.headers['Authorization'] = `Token  ${token}`
        }


        // Get all necessaries options
        let options = this.state.options_courant
        const choice_valeur = this.state.choice_valeur
        const file_path = this.state.file_path
        const typeCalcul = this.props.typeCalcul
        const regularisation = this.state.regularisation
        const int_epargne = this.state.calcul_epargne_int_default

        // Select Operations and options
        const newAccounts = this.state.accountSelected
        // const newOperations = this.getFinalSelected()

        if(this.props.typeCalcul === "epargne") options = this.state.options_epargne

        // Computation happening
        axios.post(urlCalcul, {
            "accounts": newAccounts,
            "options": options,
            "type_arrete": regularisation,
            "ordre": choice_valeur,
            "file_path": file_path,
            "type_account": typeCalcul,
            "int_epargne": int_epargne
        }, config)
            .then(
                res => {
                    console.log("done !!")
                    this.setState({
                        data_history: res.data,
                        progress: false
                    })
                    // history.push(
                    //     {
                    //         pathname: '/Results',
                    //         state: res.data
                    //     }
                    // )
                    notification.success({
                        message: 'Calcul Terminé',
                        placement: 'bottomRight',
                        duration: 5
                    });
                }
            ).catch( err => {
            this.setState({progress: false})
            notification.error({
                message: 'Erreur',
                description: err.response.data['message'],
                placement: 'bottomRight',
                duration: 5
            });
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

        // Get current date
        let today = new Date()
        let complete = today.toUTCString()
        complete = complete.replaceAll(":", "-")
        complete = complete.replaceAll(",", "")
        complete = complete.replace("GMT", "")



        const { classes } = this.props;

        const activeStep = this.state.activeStep

        const steps = this.getSteps()

        const title = this.props.title.title
        const subTitle = this.props.title.subTitle

        const renderTime = ({ remainingTime }) => {
            return <div >Durée probable: <span className="timer">{remainingTime}</span></div>;
        }

        const UrgeWithPleasureComponent = this.state.progress === true ?
            <Grid container justify="center" >
                <CountdownCircleTimer
                    isPlaying
                    duration={this.state.accountSelected.length/15 + 5}
                    colors={[
                        ['#004777', 0.33],
                        ['#F7B801', 0.33],
                        ['#A30000', 0.33],
                    ]}
                >
                    {renderTime}
                </CountdownCircleTimer>
            </Grid>
            : <></>

        const content = (
            <>
                {UrgeWithPleasureComponent}
                <div className={classes.rootStepper}>
                    {this.state.alertComp}
                    <Grid align="center" >
                        <Box
                            mt={5}
                            mb={3}
                        >
                            <Button
                                disabled={activeStep === 0 || this.state.progress}
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
                                <Button disabled={activeStep === steps.length || this.state.progress} variant="contained" color="secondary" onClick={this.handleNext}>
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
                        <Grid  align="center" >
                            <Box mt={4} mb={5}>
                                <Grid container >
                                    <Grid align="center" item xs={12} md={12}>
                                        <div className={classes.instructions}>{this.getStepContent(activeStep)}</div>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    )}
                </div>
            </>
        )

        const component = {
            'title': title,
            'subTitle': subTitle,
            'content': content,
            'selected': this.props.id,
            "img": img
        }

        //
        let trueComponent = component

        if( Object.keys(this.state.data_history).length !== 0){

            const component_results = {
                'title': 'Résultats',
                'subTitle' : 'Résultats des calculs des différents arrêtés',
                'content' : <>
                    <Grid container spacing={0} justify="center" alignContent="center" alignItems="center" >
                        <Grid item md={10} xs={12}>
                            <Box mt={5}></Box>
                            <Grid container sapcing={1} justify="center" alignItems="center" direction="row">
                                <Grid item md={6}>
                                    <Button
                                        onClick={() => this.setState({data_history: {}, progress: false, activeStep: 0})}
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        startIcon={<ReplayIcon />}
                                    >
                                        Lancer un autre calcul
                                    </Button>
                                </Grid>
                                <Grid item md={6}>
                                    { this.state.data_history['all_data'].length !== 0 &&
                                    <>
                                        <ExcelFile element={<Button variant="contained" color="secondary">
                                            Télécharger le résultat complet
                                        </Button>}
                                                   filename={`Résultat calcul -- ${complete}`}
                                        >
                                            <ExcelSheet data={ this.state.data_history['compressed_data']} name={'Récaptitulatif'}>
                                                <ExcelColumn label="Numéro de Compte" value="N° Compte"  width={80}/>
                                                <ExcelColumn label="Résultat Calcul" value="Calcul"/>
                                                <ExcelColumn label="Résultat Journal" value="Journal"/>
                                                <ExcelColumn label="Ecart" value="Ecart"/>
                                                <ExcelColumn label="Date début arrêté" value="date_deb"/>
                                                <ExcelColumn label="Date fin arrêté" value="date_fin"/>
                                            </ExcelSheet>
                                            {this.state.data_history['all_data'].map( (dataSheet, key) => (
                                                <ExcelSheet data={dataSheet["first"]} name={`${dataSheet['account']}`}>
                                                    <ExcelColumn label="DATE COMPTABLE" value="CPTABLE"/>
                                                    <ExcelColumn label="DATE DE VALEUR" value="VALEUR"/>
                                                    <ExcelColumn label="LIBELLES" value="LIBELLES"/>
                                                    <ExcelColumn label="MOUVEMENTS DEBIT" value="DEBIT_MVTS"/>
                                                    <ExcelColumn label="MOUVEMENTS CREDIT" value="CREDIT_MVTS"/>
                                                    <ExcelColumn label="SOLDES" value="SOLDES"/>
                                                    <ExcelColumn label="SOLDES JOUR" value="SOLDE_JOUR"/>
                                                    <ExcelColumn label="NOMBRE DE JOURS" value="jrs"/>
                                                    <ExcelColumn label="NOMBRES DEBIT" value="DEBITS_NBR"/>
                                                    <ExcelColumn label="NOMBRES CREDIT" value="CREDIT_NBR"/>
                                                    <ExcelColumn label="SOLDES" value="SOLDES_NBR"/>
                                                    <ExcelColumn label="MOUVEMENTS 1" value="MVTS_13"/>
                                                    <ExcelColumn label="MOUVEMENTS 2" value="MVTS_14" />
                                                </ExcelSheet>
                                            ))}
                                        </ExcelFile>
                                    </>
                                    }
                                </Grid>
                            </Grid>
                            <Box mb={5}></Box>
                        </Grid>
                        <Grid item md={10} xs={9}>
                            <Box mb={2}></Box>
                            <Grid container justify="center" alignItems="center">
                                <Grid item md={12}>
                                    <ControlledSelectionGrid data={this.state.data_history['compressed_data']} choice="results" check={false}  />
                                </Grid>
                            </Grid>
                            <Box mb={5}></Box>
                        </Grid>
                    </Grid>
                </>,
                'selected': this.props.id,
                "img": imgResult

            }

            trueComponent = component_results
        }


        return (
            <Template component={trueComponent} />
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default compose(withStyles(useStyles, {withTheme: true}), connect(mapStateToProps))(withRouter(Calcul))