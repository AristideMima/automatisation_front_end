import React, { Component, useState  } from 'react'
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import { getComptes } from "../actions/comptes"
import { getOperations } from "../actions/operations";
import { getCalcul } from "../actions/calculs";
import axios from "axios";
import {Grid, Button, Stepper, Step, StepLabel, Box, Paper, TextField,
     Table as TableMaterial ,TableRow,TableCell,TableBody,TableHead,TableContainer,
} from "@material-ui/core";
import { formStepperStyle, useStyles, url, config} from "../constants/constants";
import { compose } from "redux";
import {withStyles} from "@material-ui/core/styles";
import Template from "./Template";
import MUIDataTable from "mui-datatables";
import img from "../assets/google_compute_engine_48px.png";
import { Table, Popconfirm, Form, Input, InputNumber, Typography} from 'antd';


class SelectAccount extends Component{

    /*
     * Select corresponding account with preferred operations
     */
    static propTypes = {
        data : PropTypes.array.isRequired,
        index: PropTypes.array.isRequired
    }

    state = {
        accounts_selected : [],
        selectedRowKeys: this.props.index,
        data: [],
    }

    sendAccount = (accounts) => {
        this.props.getAccount(accounts)
    }


    onChangeSelect = (selectedRowKeys, selectedRows, newData) => {
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
                    dataIndex: 'intitule_compte',
                    editable: false,
                },
                {
                    title: 'Type de compte',
                    dataIndex: 'type_account',
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
                    dataIndex: 'date_deb_autorisation',
                    editable: false,
                },
                {
                    title: 'Fin autorisation',
                    dataIndex: 'date_fin_autorisation',
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
                <EditableTable />
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
        data: [],
        open: false,
        classes: this.props,
        activeStep: 0,
        accounts: [],
        index: []
    }

    getAccounts = (props) => {

        this.setState((prev) => ({
            accounts: props.selectedRows,
            index: props.selectedRowKeys,
            data: typeof props.newData !== 'undefined' ? props.newData:prev.data
        }))
        console.log(props)
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

    }

    static propTypes = {

        getCalcul: PropTypes.func.isRequired,
        calculs: PropTypes.array.isRequired
    }

    getSteps = () => {
        return [ 'Choix des numéros de compte', 'Lancement'];
    }

    getStepContent = (stepIndex) => {
        switch (stepIndex) {
            case 0:
                return   <SelectAccount getAccount={this.getAccounts} data={this.state.data} index={this.state.index} />;
            case 1:
                return <Grid container spacing={2}>
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
                                    {this.state.accounts.map((account) => (
                                            <TableRow key={account.key}>
                                                <TableCell component="th" scope="row">
                                                    {account.key}
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {account.num_compte}
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {account.intitule_compte}
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
        // console.log(this.props.comptes)
        axios.post(`${url}`, {"conf": "conf"}, config, )
            .then( res => {
                this.setState({data: res.data})
            }).catch( err => {
                console.log(err)
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
                if(this.state.accounts.length !== 0){
                    this.next()
                }
                return;
            case 1:

                // Computation happening
                axios.post('http://127.0.0.1:8000/api/calculs', {"accounts": this.state.accounts})
                    .then(
                    res => {

                        console.log("Good computation")

                        // console.log(res.data)
                        // this.props.history.push(
                        //     {
                        //         pathname: '/Results',
                        //         state: res.data
                        //     }
                        // )
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


        // {this.state.data.length > 0 && console.log(this.state.data)}

        const { classes } = this.props;

        const activeStep = this.state.activeStep

        const steps = this.getSteps()

        const title = 'Calcul des arrêtés - Conforme'
        const subTitle = 'Espace de vérification des arrêtés conformes - Valider les étapes pour lancer le calcul'

        const content = (
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
                    {activeStep === steps.length ? (
                        <div>
                            <Typography className={classes.instructions}>Terminer</Typography>
                            <Button onClick={this.handleReset}>Recommencer</Button>
                        </div>
                    ) : (
                        <Grid container justify="center" spacing={0}>
                            <Box mt={4}>
                                <div className={classes.instructions}>{this.getStepContent(activeStep)}</div>
                            </Box>
                        </Grid>
                    )}
                </div>
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
    calculs: state.calculs.calculs
})

export default compose(withStyles(useStyles, {withTheme: true}), connect(mapStateToProps, { getCalcul }))(Calcul)