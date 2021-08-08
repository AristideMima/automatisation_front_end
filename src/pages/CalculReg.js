import React, { Component, useState  } from 'react'
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import { getComptes } from "../actions/comptes"
import { getOperations } from "../actions/operations";
import { getCalcul } from "../actions/calculs";
import axios from "axios";
import {Grid, Button, Stepper, Step, StepLabel, Box, Paper, TextField
    // Table
    ,TableRow,TableCell,TableBody,TableHead,TableContainer, Checkbox
} from "@material-ui/core";
import { formStepperStyle, useStyles, url, config} from "../constants/constants";
import { compose } from "redux";
import {withStyles} from "@material-ui/core/styles";
import Template from "./Template";
import MUIDataTable from "mui-datatables";
import img from "../assets/google_compute_engine_48px.png";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';

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

            console.log(dataProps)

            const columns = [
                {
                    key: '0',
                    title: 'Numéro',
                    dataIndex: 'num_compte',
                    editable: false,
                    fixed: 'left',
                },
                {
                    key: '1',
                    title: 'Intitulé',
                    dataIndex: 'intitule_compte',
                    editable: false,
                },
                {
                    key: '2',
                    title: 'Type',
                    dataIndex: 'type_account',
                    editable: false,
                },
                {
                    key: '3',
                    title: 'Int débit 1',
                    dataIndex: 'taxe_interet_debiteur_1',
                    editable: true,
                    render: val => { return val + "%"}
                },
                {
                    key: '4',
                    title: 'Int débit 2',
                    dataIndex: 'taxe_interet_debiteur_2',
                    editable: true,
                    render: val => { return val + "%"}
                },
                {
                    key: '5',
                    title: 'Com découvert',
                    dataIndex: 'taux_commission_dec',
                    editable: true,
                    render: val => { return val + "%"}
                },
                {
                    key: '6',
                    title: 'Com mouvement',
                    dataIndex: 'taux_commission_mvt',
                    editable: true,
                    render: val => { return val + "%"}
                },
                {
                    key: '7',
                    title: 'Tva',
                    dataIndex: 'taux_tva',
                    editable: true,
                    render: val => { return val + "%"}
                },
                {
                    key: '8',
                    title: 'Solde initial',
                    dataIndex: 'solde_initial',
                    editable: true,
                    render: val => this.currencyTransform(val),
                },
                {
                    key: '9',
                    title: 'Montant autorisé',
                    dataIndex: 'montant',
                    editable: false,
                    render: val => this.currencyTransform(val),
                },
                {
                    key: '10',
                    title: 'Début autorisation',
                    dataIndex: 'date_deb_autorisation',
                    editable: false,
                },
                {
                    key: '11',
                    title: 'Fin autorisation',
                    dataIndex: 'date_fin_autorisation',
                    editable: false,
                },
                {
                    title: 'Action',
                    dataIndex: 'operation',
                    fixed: 'right',
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
                                Modifier
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
                        auto
                        scroll={{ x: 500, y: 300 }}
                        rowSelection={rowSelection}
                        components={{
                            body: {
                                cell: EditableCell,
                            },
                        }}
                        bordered
                        dataSource={data}
                        columns={mergedColumns}
                        pagination={{
                            onChange: cancel,
                        }}
                    />
                </Form>
            );
        }

        return (
            <Grid item md={11} xs={11}>
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

class SelectOperation extends Component{


    state = {
        data: this.props.data,
        operations_selected : [],
        rows_selected: this.props.index,
        columns : [
            {
                name: "code_operation",
                label: "Code opération",
                options: {
                    filter: true,
                    sort: true
                }
            },
            {
                name: "libelle_operation",
                label: "Libellé opération",
                options: {
                    filter: true,
                    sort: true
                }
            }
        ]
    }

    onRowsSelect = (curRowSelected, allRowsSelected) => {


        const operations = allRowsSelected.map( ind => this.state.data[ind.index].code_operation)
        const indexes = allRowsSelected.map(ind => ind.dataIndex)

        this.setState({
            rows_selected: indexes
        })

        this.sendOperation({operations, indexes})
    }

    sendOperation = (operations) => {
        this.props.getOperation(operations)
    }


    render() {

        const options = {
                filterType: 'checkbox',
                rowsPerPage: 10,
                onRowSelectionChange: this.onRowsSelect,
                print: false,
                download: false,
                filter: false,
                viewColumns: false,
                rowsSelected: this.state.rows_selected,
                customToolbarSelect: () => {}
            }

        return (
            <Grid item md={12} xs={12}>
                <MUIDataTable
                    title={"Opérations à exclure"}
                    data={this.state.data}
                    columns={this.state.columns}
                    options={options}
                />
            </Grid>
        );
    }
}

// class SelectMode extends Component {
//
//     state = {
//         conforme: "conf"
//     }
//
//     handleRadioChange = (e) => this.setState({
//         conforme: e.target.value
//     })
//
//     render(){
//         const value = this.state.conforme
//         return (
//             <>
//                 <form >
//                     <FormControl component="fieldset" >
//                         <FormLabel component="legend">Choisissez le mode d'arrêté</FormLabel>
//                         <RadioGroup aria-label="quiz" name="quiz" value={value} onChange={this.handleRadioChange} >
//                             <FormControlLabel value="conf" control={<Radio />} label="Arrêté conforme au système" />
//                             <FormControlLabel value="reg" control={<Radio />} label="Arrêté en régularisation" />
//                         </RadioGroup>
//                         {/*<FormHelperText>{helperText}</FormHelperText>*/}
//                     </FormControl>
//                 </form>
//             </>
//         )
//     }
// }

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

class CalculReg extends Component {

    state = {
        data: [],
        open: false,
        classes: this.props,
        activeStep: 0,
        accounts: [],
        index: [],
        operations: [],
        options: {
            taux_int_1: 7.0,
            taux_int_2: 15.5,
            taux_com: 0.025,
            fort_dec: 0.020833,
            tva: 19.25,
            date_deb: "2021-04-30",
            date_fin: "2021-05-31",
            solde_initial: 2369317300
        }
    }

    componentDidMount() {
        // console.log(this.props.comptes)

        axios.post(`${url}`, {"conf": "reg"}, config)
            .then( res => {
                this.setState({data: res.data})
            }).catch( err => {
            console.log(err)
        })
    }

    getAccounts = (props) => {

        this.setState((prev) => ({
            accounts: props.selectedRows,
            index: props.selectedRowKeys,
            data: typeof props.newData !== 'undefined' ? props.newData:prev.data
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
            options: optionsChild
        })

        console.log(optionsChild)
    }

    static propTypes = {
        getCalcul: PropTypes.func.isRequired,
        calculs: PropTypes.array.isRequired
    }

    getSteps = () => {
        return [ 'Choix des numéros de compte', 'Opérations à exclure', 'Options suplémentaires', 'Lancement'];
    }

    getStepContent = (stepIndex) => {
        let i = 0;
        switch (stepIndex) {
            case i++:
                return <SelectAccount getAccount={this.getAccounts} data={this.state.data} index={this.state.index} />;
            case i++:
                return <></>;// <SelectOperation getOpera={this.getOperations}  data={this.props.operations} index={this.state.index_operations} />;
            case i++:
                return <></>; // <FormStepper updateProps={this.updateOptions} options={this.state.options} />;
            case i++:
                return<Grid container spacing={2}>
                    <Grid item md={3} xs={12}>
                        <TableContainer component={Paper}>
                            <Table className={this.state.classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Index</TableCell>
                                        <TableCell>Numéro de compte</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.accounts.map((account, index) => (
                                            <TableRow key={index+1}>
                                                <TableCell component="th" scope="row">
                                                    {index}
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {account}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                                </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item md={3} xs={12}>
                        <TableContainer component={Paper}>
                            <Table className={this.state.classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Index</TableCell>
                                        <TableCell>Opérations à exclure</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.operations.map((operation, index) => (
                                        <TableRow key={index+1}>
                                            <TableCell component="th" scope="row">
                                                {index}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {operation}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TableContainer component={Paper}>
                            <Table className={this.state.classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Index</TableCell>
                                        <TableCell>Option</TableCell>
                                        <TableCell>Valeur</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                     <TableRow key={1}>
                                        <TableCell component="th" scope="row">
                                            {1}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            Taux d'intérêts débiteurs
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {this.state.options["taux_int_1"]} et {this.state.options["taux_int_2"]}
                                        </TableCell>
                                    </TableRow>

                                    <TableRow key={2}>
                                        <TableCell component="th" scope="row">
                                            {2}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            Commission & plus Fort découvert
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {this.state.options["taux_com"]} et {this.state.options["fort_dec"]}
                                        </TableCell>
                                    </TableRow>

                                    <TableRow key={3}>
                                        <TableCell component="th" scope="row">
                                            {3}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            Tva & solde initial
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {this.state.options["tva"]} & {this.state.options['solde_initial']}
                                        </TableCell>
                                    </TableRow>

                                    <TableRow key={4}>
                                        <TableCell component="th" scope="row">
                                            {4}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            Période d'arrêté
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {this.state.options["date_deb"]} au  {this.state.options["date_fin"]}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>

            default:
                return 'cliquez sur lancer l\'arrêté';
        }
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
                this.next()
                return;
            case 2:
                const obj = this.state.options
                const res = Object.keys(obj).every((k) => isNaN(obj[k]))
                if (!res){
                    this.next()
                }
                return;
            case 3:
                // Computation happening
                // axios.post('http://127.0.0.1:8000/api/calculs', {"accounts": this.state.accounts, "operations": this.state.operations, "options": this.state.options})
                //     .then(
                //     res => {
                //
                //         // console.log(res.data)
                //         this.props.history.push(
                //             {
                //                 pathname: '/Results',
                //                 state: res.data
                //             }
                //         )
                //     }
                // ).catch( err => {
                //     console.log(err)
                // })

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

        const { classes } = this.props;

        const activeStep = this.state.activeStep

        const steps = this.getSteps()

        const title = 'Calcul des arrêtés - Régularisation'
        const subTitle = 'Espace de calcul des arrêtés en régularisation - Valider les étapes pour lancer le calcul'

        const content = (
            <>
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
            </>
        )

        const component = {
            'title': title,
            'subTitle': subTitle,
            'content': content,
            'selected': 3,
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

export default compose(withStyles(useStyles, {withTheme: true}), connect(mapStateToProps, { getCalcul }))(CalculReg)