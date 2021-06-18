import React, { Component  } from 'react'
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import { getHistoriques } from "../actions/historiques";
import {
    Grid,
    IconButton, Button, Stepper, Step, StepLabel, Typography, Box, Paper, TextField, FormControlLabel, Checkbox, Grow
} from "@material-ui/core";
import {data, formStepperStyle, paperLogStyle, specialLinkLog, useStyles} from "../constants/constants";
import { compose } from "redux";
import {withStyles} from "@material-ui/core/styles";
import Template from "./Template";
import {DropzoneDialog} from 'material-ui-dropzone'
import { gridUploadStyle } from '../constants/constants'
import MUIDataTable from "mui-datatables";
import logo from "../assets/newLogo.png";
import loginImage from "../assets/external2.svg";
import {Link} from "react-router-dom";

function SelectAccount(props){

    const columns = [
        {
            name: "num_account",
            label: "Numéro de compte",
            options: {
                filter: true,
                sort: true
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
    ];


    const options = {
        filterType: 'checkbox',
        rowsPerPage: 5
    };
    return (
        <>
            <MUIDataTable
                title={"Liste des numéros de compte"}
                data={props.data}
                columns={columns}
                options={options}

            />
        </>
    );

}

function SelectOperation(props){
    const columns = [
        {
            name: "Operation",
            label: "Opération",
            options: {
                filter: true,
                sort: true
            }
        },
    ];


    const options = {
        filterType: 'checkbox',
        rowsPerPage: 5,
    };
    return (
        <>
            <MUIDataTable
                title={"Opérations à exclure"}
                data={props.data}
                columns={columns}
                options={options}

            />
        </>
    );
}

function FormStepper (){
     return (
         <>
             <Paper elevation={10} style={formStepperStyle}>
                 <form>
                     <Grid container justify="center">
                         <Grid item md={6}>
                             <Box m={2}>
                                 <TextField
                                     name="taux_interet"
                                     label='Taux d’intérêts'
                                     placeholder="Taux d’intérêts"
                                     defaultValue={19.5}
                                     type="number"
                                     required/>
                             </Box>
                             <Box m={2}>
                                 <TextField
                                     name="taux_comission"
                                     label='Taux de commissions,'
                                     placeholder="Taux de commissions,"
                                     defaultValue={19.5}
                                     type="number"
                                     fullWidth
                                     required/>
                             </Box>
                         </Grid>
                         <Grid item md={6}>
                             <Box m={2}>
                                 <TextField
                                     name="fort_decouvert"
                                     label='Taux du plus fort découvert'
                                     placeholder="Taux du plus fort découvert"
                                     defaultValue={19.5}
                                     type="number"
                                     fullWidth
                                     required/>
                             </Box>
                             <Box m={2}>
                                 <TextField
                                     name="tva"
                                     label='TVA'
                                     placeholder="TVA"
                                     defaultValue={19.5}
                                     type="number"
                                     fullWidth
                                     required/>
                             </Box>
                         </Grid>
                     </Grid>
                 </form>
             </Paper>
         </>
     )
}


class Calcul extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        open: false,
        files: [],
        activeStep: 0
    }

    static propTypes = {
        getHistoriques: PropTypes.func.isRequired,
        historiques: PropTypes.array.isRequired
    }

    getSteps = () => {
        return ['Choix des numéros de compte', 'Opérations à exclure', 'Options suplémentaires', 'Lancement'];
    }

     getStepContent = (stepIndex) => {
        switch (stepIndex) {
            case 0:
                return '<SelectAccount />';
            case 1:
                return 'Sélection 2';
            case 2:
                return <FormStepper />;
            case 3:
                return 'Entrez les paramètres suplémentaires';
            default:
                return 'Etape incorrecte';
        }
    }

    componentDidMount() {
        this.props.getHistoriques()
    }

     handleNext = () => {

        this.setState((prevState) => ({
            activeStep: prevState.activeStep + 1
        }) )

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

        const histss = this.props.historiques

        const { classes } = this.props;

        const activeStep = this.state.activeStep

        const steps = this.getSteps()

        const result = [...new Set(histss.map( obj => obj.num_compte))]
        const operations = [...[...(new Set(histss.map( obj => obj.code_operation)))].map( obj => ({ 'code_operation': obj}))]

        console.log(operations)

        let BreakException = {}

        let final_dict_account = []
        result.forEach( num => {
            try{
                histss.forEach( obj => {
                    if (obj.num_compte == num){
                        final_dict_account.push({
                            "num_account": num,
                            "intitule_compte": obj.intitule_compte
                        })
                        throw BreakException;
                    }
                });
            }catch (e) {
                
            }
        })
        // console.log(final_dict_account)

        // console.log(result_2)

        const title = 'Calcul des arrêtés'
        const subTitle = 'Suivant les différentes étapes pour faire vos arrêtés'

        const content = (
            <>
                <div className={classes.rootStepper}>
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
                                        <SelectAccount data={final_dict_account}/>;
                                    </Box>
                                </Grid>
                                <Grid container justify="center" mt={5}>
                                    <Box
                                    mt={5}>
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
})


export default compose(withStyles(useStyles, {withTheme: true}), connect(mapStateToProps, { getHistoriques }))(Calcul)