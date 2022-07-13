import React, { Component  } from 'react'
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import moment from 'moment';
import {Grid,
    Box
} from "@material-ui/core";
import {urlUpload, useStyles, choiceOptionLoading, choiceTypeLoading, textConfirmLoading, config} from "../constants/constants";
import { compose } from "redux";
import {withStyles} from "@material-ui/core/styles";
import Template from "./Template";
import 'antd/dist/antd.css';
import {Upload, Button, DatePicker, Select, Space, Divider, Popconfirm} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from "axios";
import img from "../assets/dropbox_48px.png";
import { notification } from 'antd';

const dateFormat = 'YYYY-MM-DD';
const { Option } = Select;


class FileUpload extends Component {

    state = {
        open: false,
        historique: [],
        solde: [],
        journal: [],
        autorisation: [],
        rate: [],
        uploading: false,
        uploaded: false,
        choice: "courant",
        period: "2021-01-01",
        selected: "files"
    }

    handleChangeSelect = (value) => {

        if(choiceTypeLoading.includes(value)){
            this.setState({selected: value})
            notification.success({
                message: 'Changement du type de chargement',
                description: `Nouveau type: ${value}`,
                placement: 'bottomRight',
                duration: 5
            })
        }else{
            this.setState({ choice: value, autorisation: []})
            notification.success({
                message: "Changement du d'option de chargement",
                description: `Nouvel option: ${value}`,
                placement: 'bottomRight',
                duration: 5
            })

        }
    }

    parseJwt (token) {
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    };

    handleUpload = () => {

        const { historique, solde, journal, autorisation, rate, selected, choice, period } = this.state;
        const formData = new FormData();
        let fileList = []

        if(selected === choiceTypeLoading[0]) fileList = [...historique, ...solde, ...journal, ...autorisation]
        else fileList = [...rate]

        formData.append('choice', choice)
        formData.append('period', period)
        formData.append('type', selected)
        fileList.forEach(file => {
            formData.append('files[]', file)
        })

        // Add selected choice
        this.setState({
            uploading: true,
        });
        const token  = this.props.auth.token
        // const config = {
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // }
        if(token){
            config.headers['Authorization'] = `Token  ${token}`
        }

        axios.put(urlUpload, formData, config).then( res => {

            this.setState({
                historique: [],
                solde: [],
                journal: [],
                autorisation: [],
                rate: [],
                uploading: false,
                uploaded: true
            });
            notification.success({
                message: 'Upload réussi',
                description: "Succès de l'opération",
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

        })

    };

    handleChangeDate = (date, dateString) => {

        if(dateString !== ""){
            this.setState({
                period: dateString,
            });
        }
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

    static propTypes = {
        auth: PropTypes.object.isRequired
    }


    disableButton = () =>{

        let value = false
        const choice = this.state.choice
        const selected = this.state.selected

        if (selected === choiceTypeLoading[0]){
            const lenhisto = this.state.historique.length
            const lensolde = this.state.solde.length
            const lenjournal = this.state.journal.length
            const lenautorisation = this.state.autorisation.length

            if (lenhisto !== 0  & lensolde !== 0 & lenjournal !== 0 ) value = true
            else if ((choice === "courant") && (lenautorisation !== 0))value = true
        }else {

            value = this.state.rate.length !== 0 ? true: false
        }

        return !value
    }


    render() {

        // const files = this.state.files

        const { historique, solde, journal, autorisation, uploading, period, selected, choice, rate} = this.state;
        const valueDisable = this.disableButton()

        const propsHistorique = {

            onRemove: file => {
                this.setState(state => {
                    const index = state.historique.indexOf(file);
                    const newFileList = state.historique.slice();
                    newFileList.splice(index, 1);
                    return {
                        historique: newFileList,
                    };
                });
            },

            beforeUpload: file => {

                this.setState(state => ({
                    historique: [...state.historique, file],
                }));
                return false;
            },
            historique,
            listType:"picture",
            className: "upload-list-inline"
        };
        const propsRate = {

            onRemove: file => {
                this.setState(state => {
                    const index = state.rate.indexOf(file);
                    const newFileList = state.rate.slice();
                    newFileList.splice(index, 1);
                    return {
                        rate: newFileList,
                    };
                });
            },

            beforeUpload: file => {

                this.setState(state => ({
                    rate: [...state.rate, file],
                }));
                return false;
            },
            rate,
            listType:"picture",
            className: "upload-list-inline"
        };

        const propsSolde = {

            onRemove: file => {
                this.setState(state => {
                    const index = state.solde.indexOf(file);
                    const newFileList = state.solde.slice();
                    newFileList.splice(index, 1);
                    return {
                        solde: newFileList,
                    };
                });
            },

            beforeUpload: file => {

                this.setState(state => ({
                    solde: [...state.solde, file],
                }));
                return false;
            },
            solde,
            listType:"picture",
            className: "upload-list-inline"
        };

        const propsJournal = {

            onRemove: file => {
                this.setState(state => {
                    const index = state.journal.indexOf(file);
                    const newFileList = state.journal.slice();
                    newFileList.splice(index, 1);
                    return {
                        journal: newFileList,
                    };
                });
            },

            beforeUpload: file => {

                this.setState(state => ({
                    journal: [...state.journal, file],
                }));
                return false;
            },
            journal,
            listType:"picture",
            className: "upload-list-inline"
        };

        const propsAutorisation = {

            onRemove: file => {
                this.setState(state => {
                    const index = state.autorisation.indexOf(file);
                    const newFileList = state.autorisation.slice();
                    newFileList.splice(index, 1);
                    return {
                        autorisation: newFileList,
                    };
                });
            },

            beforeUpload: file => {

                this.setState(state => ({
                    autorisation: [...state.autorisation, file],
                }));
                return false;
            },
            autorisation,
            listType:"picture",
            className: "upload-list-inline"
        };

        const max_count = 1;

        // const percentage = (fileList.length/max_count) * 100;


        const title = 'Upload des fichiers'
        const subTitle = 'Cliquez sur l\'icone pour pouvoir envoyers les fichiers vers le serveur'

        const content = (
            <>
                <Grid container spacing={1} alignItems="baseline" justify="center">
                    <Grid align="center" item md={12}>
                        <Box mt={5} mb={5}>
                            <p className="type-loading"> Choix du type de Chargement :</p>
                          <Space>
                              <Select defaultValue={choiceTypeLoading[0]} style={{ width: 200, fontsize: 10, fontFamily: "Arial" }} onChange={this.handleChangeSelect}>
                                  <Option value={choiceTypeLoading[0]}> Fichiers de calcul</Option>
                                  <Option value={choiceTypeLoading[1] }>Fichiers de Taux</Option>
                              </Select>
                              <Select defaultValue={choiceOptionLoading[0]} style={{ width: 200, fontsize: 10, fontFamily: "Arial" }} onChange={this.handleChangeSelect}>
                                  <Option value={choiceOptionLoading[0]}>Fichiers courants</Option>
                                  <Option value={choiceOptionLoading[1]}>Fichiers Epargne</Option>
                              </Select>
                          </Space>
                        </Box>
                    </Grid>
                    <Divider />
                    { selected === choiceTypeLoading[0] ?
                        <>
                        <Grid  item md={3}>
                            <Upload
                                multiple {...propsHistorique}
                                accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                maxCount={max_count}
                                showUploadList={historique.length !== 0}
                            >
                                <Button disabled={historique.length === max_count} icon={<UploadOutlined />}>Historique</Button>
                            </Upload>
                        </Grid>
                        <Grid align="center" item md={3}>
                            <Upload
                                multiple {...propsSolde}
                                accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                maxCount={max_count}
                                showUploadList={solde.length !== 0}
                            >
                                <Button disabled={solde.length === max_count} icon={<UploadOutlined />}>Solde inititial</Button>
                            </Upload>
                        </Grid>
                        <Grid align="center" item md={3}>
                            <Upload
                                multiple {...propsJournal}
                                accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                maxCount={max_count}
                                showUploadList={journal.length !== 0}
                            >
                                <Button disabled={journal.length === max_count} icon={<UploadOutlined />}>Journal d'arrêté</Button>
                            </Upload>
                        </Grid>
                        {
                            choice === choiceOptionLoading[0] ?
                                <Grid align="center" item md={3}>
                                    <Upload
                                        multiple {...propsAutorisation}
                                        accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                        maxCount={max_count}
                                        showUploadList={autorisation.length !== 0}
                                    >
                                        <Button disabled={autorisation.length === max_count} icon={<UploadOutlined />}>Autorisation de découvert</Button>
                                    </Upload>
                                </Grid>
                                : <></>
                        }
                    </> :
                        <>
                            <Grid align="center"  item md={3}>
                                <Upload
                                    multiple {...propsRate}
                                    accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                    maxCount={max_count}
                                    showUploadList={rate.length !== 0}
                                >
                                    <Button disabled={rate.length === max_count} icon={<UploadOutlined />}>Taux des clients</Button>
                                </Upload>
                            </Grid>
                        </> }
                    <Grid align="center" item md={12}>
                        <div style={{ marginTop: "130px" }}>
                            {
                                selected === choiceTypeLoading[0] ?
                                    <Box mb={2}>
                                        <Space>
                                            Période:
                                            <DatePicker value={moment(period, dateFormat)} format={dateFormat} onChange={this.handleChangeDate}  />
                                        </Space>
                                    </Box> : <></>
                            }
                            <Popconfirm  placement="top" title={textConfirmLoading} onConfirm={this.handleUpload} okText="Oui" >
                                <Button loading={uploading} type="primary" danger disabled={valueDisable} icon={<UploadOutlined />}>
                                    {uploading ? 'Upload en cours...' : 'Uploader les fichiers'}
                                </Button>
                            </Popconfirm>
                        </div>
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

        return (
            <Template component={component} />
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default compose(withStyles(useStyles, {withTheme: true}), connect(mapStateToProps))(FileUpload)
