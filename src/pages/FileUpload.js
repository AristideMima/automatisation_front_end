import React, { Component  } from 'react'
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import { fileUpload } from "../actions/files";

import {Grid,
    IconButton, Box
} from "@material-ui/core";
import {
    CloudUpload as CloudUploadIcon
} from "@material-ui/icons";
import { useStyles} from "../constants/constants";
import { compose } from "redux";
import {withStyles} from "@material-ui/core/styles";
import Template from "./Template";
import {DropzoneDialog} from 'material-ui-dropzone'
import { gridUploadStyle } from '../constants/constants'
import 'antd/dist/antd.css';
import { Upload, Button , message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import reqwest from 'reqwest';

class FileUpload extends Component {

    state = {
        open: false,
        files: [],
        fileList: [],
        uploading: false,
    }

    handleUpload = () => {
        const { fileList } = this.state;
        const formData = new FormData();
        fileList.forEach(file => {
            formData.append('files[]', file);
        });

        this.setState({
            uploading: true,
        });

        // You can use any AJAX library you like
        reqwest({
            url: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            method: 'post',
            processData: false,
            data: formData,
            success: () => {
                this.setState({
                    fileList: [],
                    uploading: false,
                });
                message.success('upload successfully.');
            },
            error: () => {
                this.setState({
                    uploading: false,
                });
                message.error('upload failed.');
            },
        });
    };

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

        const files = this.state.files

        const { uploading, fileList } = this.state;

        console.log(uploading, fileList)

        const props = {
            onRemove: file => {
                this.setState(state => {
                    const index = state.fileList.indexOf(file);
                    const newFileList = state.fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            beforeUpload: file => {
                this.setState(state => ({
                    fileList: [...state.fileList, file],
                }));
                return false;
            },
            fileList,
            listType:"picture",
        };


        const title = 'Upload des fichiers'
        const subTitle = 'Cliquez sur l\'icone pour pouvoir envoyers les fichiers vers le serveur'

        console.log(this.state.files)

        const content = (
            <>
                <Grid container
                      spacing={1}
                      direction="row"
                      alignItems="center"
                      justify="center">
                    <Grid item xs={8} md={8}>
                        <Upload multiple {...props} accept="text/plain,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
                            <Box pt={3}>
                                <Button icon={<UploadOutlined />}>Sélectionner les fichiers</Button>
                            </Box>
                        </Upload>
                    </Grid>
                    <Grid item xs={3} md={3}>
                        <Box pt={3}>
                            <Button
                                type="primary"
                                onClick={this.handleUpload}
                                disabled={fileList.length === 0}
                                loading={uploading}
                                style={{ marginLeft: 16, textAlign: "right" }}
                            >
                                {uploading ? 'Upload en cours...' : 'Lancer l\'upload'}
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