import React, { Component  } from 'react'
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import { getHistoriques } from "../actions/historiques";
import {Grid,
    IconButton, Button, Stepper, Step, StepLabel, Typography
} from "@material-ui/core";
import {data, gridContainerStyle, useStyles} from "../constants/constants";
import { compose } from "redux";
import {withStyles} from "@material-ui/core/styles";
import Template from "./Template";
import {DropzoneDialog} from 'material-ui-dropzone'
import { gridUploadStyle } from '../constants/constants'


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
        return ['Choix des numéros de compte', 'Opérations à exclure', 'Options suplémentaires'];
    }

     getStepContent = (stepIndex) => {
        switch (stepIndex) {
            case 0:
                return 'Choisir le ou les numérors de comptes à fusionner';
            case 1:
                return 'Choisir les opérations à exclure';
            case 2:
                return 'Entrez les paramètres suplémentaires';
            default:
                return 'Unknown stepIndex';
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

        console.log(histss.length)

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
                                <Typography className={classes.instructions}>All steps completed</Typography>
                                <Button onClick={this.handleReset}>Recommencer</Button>
                            </div>
                        ) : (
                            <div>
                                <Typography className={classes.instructions}>{this.getStepContent(activeStep)}</Typography>
                                <div>
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
                                </div>
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