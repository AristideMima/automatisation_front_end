import React, { Component  } from 'react'
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import {
    Grid,
    IconButton
} from "@material-ui/core";
import {
    CloudUpload as CloudUploadIcon,
} from "@material-ui/icons";

import { useStyles} from "../constants/constants";
import {withStyles} from "@material-ui/core/styles";
import Template from "./Template";
import {DropzoneDialog} from 'material-ui-dropzone'
import { gridUploadStyle } from '../constants/constants'
import Upload from "./upload/upload";


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

    handleOpen() {
        this.setState({
            open: true,
        });
    }

    render() {




        const title = 'Upload des fichiers'
        const subTitle = 'Cliquez sur l\'icone pour pouvoir envoyer les fichiers vers le serveur'

        const content = (
           <>
               <Grid container justify="center">
                   <Grid item md="10">
                       <Upload />
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


export default withStyles(useStyles, {withTheme: true})(FileUpload)