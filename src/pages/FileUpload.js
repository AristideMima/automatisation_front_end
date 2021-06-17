import React, { Component  } from 'react'
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import { fileUpload } from "../actions/files";

import {Grid,
    IconButton, Button, Box
} from "@material-ui/core";
import {
    CloudUpload as CloudUploadIcon
} from "@material-ui/icons";
import {data, gridContainerStyle, useStyles} from "../constants/constants";
import { compose } from "redux";
import {withStyles} from "@material-ui/core/styles";
import Template from "./Template";
import {DropzoneDialog} from 'material-ui-dropzone'
import { gridUploadStyle } from '../constants/constants'


class FileUpload extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            files: []
        };
    }

    handleClose() {
        this.setState({
            open: false
        });
    }

    handleSave(files) {
        //Saving files to state for further use and closing Modal.
        this.setState({
            files: files,
            open: false
        });

    }

    submitServeur = () => {

         // Loop through each file and upload to the server

        this.state.files.map(
            file => {
                this.props.fileUpload(file)
            }
        )
    }

    handleOpen() {
        this.setState({
            open: true,
        });
    }

    static propTypes = {
        fileUpload: PropTypes.func.isRequired
    }

    render() {




        const title = 'Upload des fchiers'
        const subTitle = 'Cliquez sur l\'icone pour pouvoir envoyers les fichiers vers le serveur'

        const content = (
            <>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={ gridUploadStyle }
                >

                    <Grid item xs={8} md={12} >
                        <IconButton onClick={this.handleOpen.bind(this)}>
                            <CloudUploadIcon fontSize="large" />
                        </IconButton>
                        <DropzoneDialog
                            open={this.state.open}
                            onSave={this.handleSave.bind(this)}
                            acceptedFiles={['text/plain', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']}
                            showPreviews={true}
                            previewText="Fichiers ajoutés"
                            maxFileSize={5000000}
                            onClose={this.handleClose.bind(this)}
                            dropzoneText="Faites un cliquer glisser ou alors cliquez sur la zone"
                            submitButtonText="Sauvegarder"
                            cancelButtonText="Annuler"
                        />
                    </Grid>
                </Grid>
                <Grid container alignItems="center">
                    <Grid item md={12}>
                        <Box
                            mt={5}
                        >
                            <Button
                                onClick={this.submitServeur}
                                variant="contained"
                                color="secondary"
                                size="large"
                                disabled={this.state.files.length === 0}
                            >
                                Uploader vers le serveur
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
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
    fileUpload: state.fileUpload
})


export default compose(withStyles(useStyles, {withTheme: true}), connect(mapStateToProps, { fileUpload }))(FileUpload)