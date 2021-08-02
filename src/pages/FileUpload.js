import React, { Component  } from 'react'
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import { fileUpload } from "../actions/files";

import {Grid,
    // IconButton,
    // Box
} from "@material-ui/core";
// import {
//     CloudUpload as CloudUploadIcon
// } from "@material-ui/icons";
import { useStyles} from "../constants/constants";
import { compose } from "redux";
import {withStyles} from "@material-ui/core/styles";
import Template from "./Template";
import 'antd/dist/antd.css';
import { Upload, Button , Progress } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
// import reqwest from 'reqwest';
import axios from "axios";
// import * as dfd from "danfojs/src/index";

import img from "../assets/dropbox_48px.png";
import { notification } from 'antd';


const url = 'http://127.0.0.1:8000/api/upload/';

// const df = new dfd.DataFrame(
//     { pig: [20, 18, 489, 675, 1776], horse: [4, 25, 281, 600, 1900] },
//     { index: [1990, 1997, 2003, 2009, 2014] }
// );

class FileUpload extends Component {

    state = {
        open: false,
        files: [],
        fileList: [],
        uploading: false,
        uploaded: false
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

        const token  = this.props.auth.token

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        if(token){
            config.headers['Authorization'] = `Token  ${token}`
        }

        console.log(config)

        // You can use any AJAX library you like
        axios.put(`${url}`, formData, config).then( res => {
            
            this.setState({
                fileList: [],
                uploading: false,
                uploaded: true
            });

            notification.success({
                message: 'Upload réussi',
                description: 'Les fichiers ont bien été uploadé et inséré dans la base de données',
                placement: 'bottomRight',
                duration: 5
            })

            
        }).catch( err => {
            this.setState({
                uploading: false,
            });

            if (err.response) {
                // failed uploading
                notification.error({
                    message: 'Erreur upload',
                    description: err.response.data['message'],
                    placement: 'bottomRight',
                    duration: 10
                });
            }

            // // failed uploading
            // notification.error({
            //     message: 'Erreur upload',
            //     description: err.data['message'],
            //     placement: 'bottomRight',
            //     duration: 5
            // });
            
        })

        // reqwest({
        //     url: `${url}`,
        //     method: 'put',
        //     processData: false,
        //     data: formData,
        //     success: () => {
        //     },
        //     error: () => {
        //
        //     },
        // });
    };

    handleEmpty = () => {
        this.setState({
            fileList: [],
            uploading: false,
            uploaded: false,
        });
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
        fileUpload: PropTypes.func.isRequired,
        auth: PropTypes.object.isRequired
    }

    render() {

        // const files = this.state.files

        const { uploading, fileList } = this.state;

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
            className: "upload-list-inline"
        };

        const max_count = 100;

        const percentage = (fileList.length/max_count) * 100;


        const title = 'Upload des fichiers'
        const subTitle = 'Cliquez sur l\'icone pour pouvoir envoyers les fichiers vers le serveur'



        const content = (
            <>
                <Grid container
                      spacing={1}
                      alignItems="baseline"
                      justify="center"
                >
                    <Grid item xs={7} md={7}>
                        <Upload
                            multiple {...props}
                            accept="text/plain,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                            maxCount={max_count}
                        >
                            <Button disabled={fileList.length === max_count} icon={<UploadOutlined />}>Sélectionner les fichiers</Button>

                        </Upload>
                        {/*<Pagination defaultCurrent={1} total={fileList.length} />*/}
                    </Grid>
                    <Grid item xs={2} md={2} >
                        <Grid container justify="space-evenly" spacing={10}>
                            <Button
                                type="primary"
                                onClick={this.handleUpload}
                                disabled={fileList.length === 0}
                                loading={uploading}
                                // style={{ marginLeft: 16, textAlign: "right" }}
                            >
                                {uploading ? 'Upload en cours...' : 'Lancer l\'upload'}
                            </Button>

                            <Button
                                color="#ff4d4f"
                                type="danger"
                                onClick={this.handleEmpty}
                                disabled={fileList.length === 0}
                                // loading={uploading}
                                // style={{ marginLeft: 16, textAlign: "right" }}
                            >
                                Réinitialiser
                            </Button>
                            <Grid item xs={12} md={12}>
                                <h4>Nombre de fichiers</h4>
                                <Progress type="circle" percent={percentage} width={80} format={() => `${fileList.length}`} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

            </>
        )
        const component = {
            'title': title,
            'subTitle': subTitle,
            'content': content,
            'selected': 1,
            "img": img
        }

        // console.log(df.head().print())

        return (
            <Template component={component} />
        );
    }
}

const mapStateToProps = state => ({
    fileUpload: state.fileUpload,
    auth: state.auth
})

export default compose(withStyles(useStyles, {withTheme: true}), connect(mapStateToProps, { fileUpload }))(FileUpload)