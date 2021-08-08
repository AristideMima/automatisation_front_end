import React, { Component, useState  } from 'react'
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import { getCalcul } from "../actions/calculs";
import ControlledSelectionGrid from "./FullSelected"
import axios from "axios";
import {Grid, Button, Stepper, Step, StepLabel, Box, Paper, TextField,
     Table as TableMaterial ,TableRow,TableCell,TableBody,TableHead,TableContainer,
} from "@material-ui/core";
import { formStepperStyle, useStyles, url, config} from "../constants/constants";
import { compose } from "redux";
import {withStyles} from "@material-ui/core/styles";
import Template from "./Template";
import img from "../assets/google_compute_engine_48px.png";
import { Table, Popconfirm, Form, Input, InputNumber, Typography} from 'antd';
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { notification } from 'antd';
import {withRouter} from 'react-router-dom';

class SelectAccount extends Component{

    /*
     * Select corresponding account with preferred operations
     */
    static propTypes = {
        data : PropTypes.array.isRequired,
        index: PropTypes.array.isRequired,
        accounts: PropTypes.array.isRequired,
        auth: PropTypes.object.isRequired
    }

    state = {
        accounts_selected : this.props.accounts,
        selectedRowKeys: this.props.index,
        data: [],
        defaultColDef: {
            flex: 1,
            minWidth: 100,
            resizable: true,
        },
        rowSelection: 'multiple',
        rowData: null,
        loading: true
    }

    sendAccount = (accounts) => {
        this.props.getAccount(accounts)
    }

    onChangeSelect = (selectedRowKeys, selectedRows, newData) => {

        // console.log(selectedRows)
        this.setState({
            selectedRowKeys: selectedRowKeys,
            accounts_selected: selectedRows,
        })

        // Send informations to parent component
        this.sendAccount({selectedRowKeys, selectedRows, newData})
    }

    currencyTransform = (text) => {
        return  <p> {new Intl.NumberFormat('fr-FR', {style: 'currency', currency: 'XAF' }).format(text)} </p>
    }

    render() {

        const { selectedRowKeys } = this.state;


        const dataProps = this.props.data

        const EditableCell = ({ editing, dataIndex, title, inputType, record, index, children, ...restProps
        }) => {
            const inputNode = inputType === 'number' ? <InputNumber size = "large"/> : <Input />;
            return (
                <td {...restProps}>
                    {editing ? (
                        <Form.Item
                            name={dataIndex}
                            style={{
                                margin: 0,
                            }}
                            rules={[
                                {
                                    required: true,
                                    message: `Veuillez entrer ${title}!`,
                                },
                            ]}
                        >
                            {inputNode}
                        </Form.Item>
                    ) : (
                        children
                    )}
                </td>
            );
        }


        const rowSelection = {
            selectedRowKeys,
            onChange: this.onChangeSelect
        };

        const EditableTable = () => {
            const [form] = Form.useForm();
            const [data, setData] = useState(dataProps);
            const [editingKey, setEditingKey] = useState('');

            const isEditing = (record) => record.key === editingKey;

            const edit = (record) => {

                form.setFieldsValue({
                    num_compte: '',
                    intitule_compte: '',
                    type_account: '',
                    solde_initial: '',
                    montant: '',
                    period: '',
                    ...record,
                });
                setEditingKey(record.key);
            };

            const cancel = () => {
                setEditingKey('');
            };

            const save = async (key) => {
                try {


                    const row = await form.validateFields();
                    const newData = [...data];
                    const index = newData.findIndex((item) => key === item.key);

                    if (index > -1) {

                        const item = newData[index];

                        const item_saved = { ...item, ...row }

                        newData.splice(index, 1, item_saved);

                        const account_selects = [...this.state.accounts_selected]
                        const index_selected = newData.findIndex((item) => key === item.key);

                        if(index_selected > -1){
                            const item_select = account_selects[index_selected]
                            account_selects.splice(index, 1, {...item_select, ...row});
                        }


                        this.onChangeSelect(this.state.selectedRowKeys, account_selects, newData)

                        this.setState({data: newData})
                        this.setState({EditingKey: ""})
                    } else {

                        newData.push(row);
                        setData(newData);
                        setEditingKey('');
                    }
                } catch (errInfo) {
                    console.log('Validate Failed:', errInfo);
                }
            };

            const columns = [
                {
                    title: 'Numéro de compte',
                    dataIndex: 'num_compte',
                    editable: false,
                },
                {
                    title: 'Intitulé du compte',
                    dataIndex: 'intitule',
                    editable: false,
                },
                {
                    title: 'Type de compte',
                    dataIndex: 'type_compte',
                    editable: false,
                },
                {
                    title: 'Solde initial',
                    dataIndex: 'solde_initial',
                    editable: true,
                    render: val => this.currencyTransform(val),
                },
                {
                    title: 'Montant autorisé',
                    dataIndex: 'montant',
                    width: 200,
                    editable: false,
                    render: val => this.currencyTransform(val),
                },
                {
                    title: 'Début autorisation',
                    dataIndex: 'debut_autorisation',
                    editable: false,
                },
                {
                    title: 'Fin autorisation',
                    dataIndex: 'fin_autorisation',
                    editable: false,
                },
                {
                    title: 'operation',
                    dataIndex: 'operation',
                    render: (_, record) => {
                        const editable = isEditing(record);
                        return editable ? (
                            <span>
            <a
                href="javascript:;"
                onClick={() => save(record.key)}
                style={{
                    marginRight: 8,
                }}
            >
              Enregistrer
            </a>
            <Popconfirm title="Etes vous sûr ?" onConfirm={cancel}>
              <a>Annuler</a>
            </Popconfirm>
          </span>
                        ) : (
                            <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                                Modifier le solde initial
                            </Typography.Link>
                        );
                    },
                },
            ];

            const mergedColumns = columns.map((col) => {
                if (!col.editable) {
                    return col;
                }
                return {
                    ...col,
                    onCell: (record) => ({
                        record,
                        inputType: col.dataIndex === 'solde_initial' ? 'number' : 'text',
                        dataIndex: col.dataIndex,
                        title: col.title,
                        editing: isEditing(record),
                    }),
                };
            });

            return (
                <Form form={form} component={false}>
                    <Table
                        rowSelection={rowSelection}
                        components={{
                            body: {
                                cell: EditableCell,
                            },
                        }}
                        bordered
                        dataSource={data}
                        columns={mergedColumns}
                        rowClassName="editable-row"
                        pagination={{
                            onChange: cancel,
                        }}
                    />
                </Form>
            );
        }


        return (
            <Grid item md={12}>
                {/*<MUIDataTable*/}
                {/*    title={"Liste des numéros de compte"}*/}
                {/*    data={this.props.data}*/}
                {/*    columns={this.state.columns}*/}
                {/*    options={options}*/}

                {/*/>*/}
                {/*<Table  rowSelection={{ type: 'checkbox', ...rowSelection }} columns={columns} dataSource={this.props.data} pagination={{ pageSize: 50 }} scroll={{ y: 240 }} />*/}
                {/*<DataGrid*/}
                {/*    columns={[{ field: 'num_compte' }]}*/}
                {/*    rows={[*/}
                {/*        { id: 1, name: 'React' },*/}
                {/*        { id: 2, name: 'Material-UI' },*/}
                {/*    ]}*/}
                {/*/>*/}
            </Grid>

        );
    }

}


class FormStepper extends Component {

    state = {
        date_deb: this.props.date_deb,
        date_fin: this.props.date_fin,
        openAlert: false
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) =>{
        e.preventDefault()
        this.props.updateProps(this.state)
        this.setState({ openAlert: true})
    }

    render() {

        const { date_deb, date_fin } = this.state

        return (
            <>
                <Grid container >
                    <Grid item md={12} xs={12}>
                        <Collapse in={this.state.openAlert}>
                            <Alert
                                action={
                                    <IconButton
                                        aria-label="close"
                                        color="inherit"
                                        size="small"
                                        onClick={() => {
                                            this.setState({openAlert: false });
                                        }}
                                    >
                                        <CloseIcon fontSize="inherit" />
                                    </IconButton>
                                }
                            >
                                Période d'arrêté mise à jour
                            </Alert>
                        </Collapse>
                        <Box mb={3}>

                        </Box>
                    </Grid>
                </Grid>
                <Paper elevation={10} style={formStepperStyle}>
                    <form onSubmit={this.handleSubmit}>
                        <Grid spacing={1} container justify="center">
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
        data: [],
        open: false,
        classes: this.props,
        activeStep: 0,
        accounts_selected: [],
        index: [],

        // Operations part
        operations : [],
        selectedOperations: [],
        indexOperations: [],

        key: `open${Date.now()}`,

        // Period chosen
        date_fin: "",
        date_deb: "2000-01-01",
        openAlert: false,
        alertComp: null,

        // Popup confirm
        visible: false,
        confirmationLoading: false,
        laoding: false
    }

    getAccounts = (props) => {

        this.setState((prev) => ({
            accounts_selected: props.selected_accounts,
            index: props.newSelectionModel,
            data: typeof props.updatedState !== 'undefined' ? props.updatedState:prev.data
        }))
    }

    getOperations = (props) => {
        this.setState({
            operations: props.operations,
            index_operations: props.index_operations
        })
    }

    updateOptions = (optionsChild) => {
        this.setState({
            date_deb: optionsChild.date_deb,
            date_fin: optionsChild.date_fin
        })

    }

    static propTypes = {

        getCalcul: PropTypes.func.isRequired,
        calculs: PropTypes.array.isRequired,
        auth: PropTypes.object.isRequired,
        typeArrete: PropTypes.string.isRequired,
        typeCalcul: PropTypes.string.isRequired
    }

    getSteps = () => {
        return [ 'Choix des numéros de compte', 'Sélectionner la période', 'Lancer le calcul'];
    }

    getStepContent = (stepIndex) => {

        switch (stepIndex) {
            case 0:
                return   <ControlledSelectionGrid data={this.state.data} selected_accounts={this.state.accounts_selected} index_selected={this.state.index}
                                                  setAccount={this.getAccounts}  choice="calcul" check={true} loading={this.state.loading} />;
            case 1:
                return <FormStepper updateProps={this.updateOptions} date_deb={this.state.date_deb} date_fin={this.state.date_fin} />;
            case 2:
                return <Grid container spacing={2}>
                      <Grid item md={12} xs={12} >
                          <Collapse in={true}>
                              <Alert>
                                  Période de l'arrêté: du {this.state.date_deb} au {this.state.date_fin}
                              </Alert>
                          </Collapse>
                      </Grid>
                    <Grid item md={12} xs={12}>
                        <TableContainer component={Paper}>
                            <TableMaterial className={this.state.classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>#</TableCell>
                                        <TableCell>Numéro de compte</TableCell>
                                        <TableCell>Intitulé du compte</TableCell>
                                        <TableCell>Solde initial</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.accounts_selected.map((account, key) => (
                                            <TableRow key={key}>
                                                <TableCell component="th" scope="row">
                                                    {key+1}
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {account.num_compte}
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {account.intitule}
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {account.solde_initial}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                                </TableMaterial>
                        </TableContainer>
                    </Grid>
                </Grid> ;
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

        axios.post(`${url}`, {"conf": this.props.typeArrete, "type_account": this.props.typeCalcul }, config)
            .then( res => {
                this.setState({data: res.data, loading: false})
            }).catch( err => {
            this.setState({loading: false})
        })

        // Set date_fin
        let today = new Date()
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();
        today = yyyy + "-" + mm + '-' + dd;
        this.setState({date_fin: today})
    }

    next = () => {

        this.setState((prevState) => ({
            activeStep: prevState.activeStep + 1
        }) )
    }
    handleNext = () => {
        switch (this.state.activeStep) {
            case 0:
                if(this.state.accounts_selected.length !== 0){
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
            case 1:
                if ((this.state.date_deb) && (this.state.date_fin) && (this.state.date_deb !== this.state.date_fin)) {
                    this.next()
                }else{
                    notification.error({
                        message: 'Erreur choix de la période',
                        description: 'Les dates ne doivent pas être identiques',
                        placement: 'bottomRight',
                        duration: 5
                    });
                }
                return;
            case 2:

                this.setState({
                    visible: true
                })
                return;
            default:
                return;
        }

    };

    handleOk = () => {
        this.setState({
            confirmationLoading: true
        })

        setTimeout(() => {
            this.setState({
                visible: false,
                confirmationLoading: false
            });
        }, 2000);

        const token  = this.props.auth.token

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        if(token){
            config.headers['Authorization'] = `Token  ${token}`
        }

        // Computation happening
        axios.post('http://127.0.0.1:8000/api/calculs', {"accounts": this.state.accounts_selected,
            "period": [this.state.date_deb, this.state.date_fin], "type_account": this.props.typeCalcul, "conf": this.props.typeArrete}, config)
            .then(
                res => {
                    console.log()
                    this.props.history.push(
                        {
                            pathname: '/Results',
                            state: res.data
                        }
                    )
                    notification.success({
                        message: 'Calcul éffectué',
                        description: `Calcul terminé pour les comptes }`,
                        placement: 'bottomRight',
                        duration: 5
                    });
                }
            ).catch( err => {
            console.log(err)
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

        // console.log(this.state.accounts_selected, this.state.index )

        // {this.state.data.length > 0 && console.log(this.state.data)}

        const { classes } = this.props;

        const activeStep = this.state.activeStep

        const steps = this.getSteps()

        const title = this.props.title.title
        const subTitle = this.props.title.subTitle

        const content = (
                <div className={classes.rootStepper}>
                    {this.state.alertComp}
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
                            <Popconfirm
                                title="Confirmation"
                                visible={this.state.visible}
                                onConfirm={this.handleOk}
                                okButtonProps={{ loading: this.state.confirmLoading }}
                                onCancel={this.handleCancel}
                            >
                            <Button disabled={activeStep === steps.length} variant="contained" color="secondary" onClick={this.handleNext}>
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
                        <Grid container justify="center" spacing={0}>
                            <Box mt={4}>
                                <Grid container >
                                    <Grid item xs={12} md={12}>
                                        <div className={classes.instructions}>{this.getStepContent(activeStep)}</div>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    )}
                </div>
        )

        const component = {
            'title': title,
            'subTitle': subTitle,
            'content': content,
            'selected': this.props.id,
            "img": img
        }

        return (
            <Template component={component} />

        );
    }
}

const mapStateToProps = state => ({
    calculs: state.calculs.calculs,
    auth: state.auth
})

export default compose(withStyles(useStyles, {withTheme: true}), connect(mapStateToProps, { getCalcul }))(withRouter(Calcul))