import * as React from 'react';
import { DataGrid, GridOverlay } from '@material-ui/data-grid';
import Avatar from '@material-ui/core/Avatar';
import { indigo } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from "@material-ui/core";
import { notification } from 'antd';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { createMuiTheme } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';

// Dialog librairies
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


// Loading data
function CustomLoadingOverlay() {
    return (
        <GridOverlay>
            <div style={{ position: 'absolute', top: 0, width: '100%' }}>
                <LinearProgress />
            </div>
        </GridOverlay>
    );
}


// Regex
function escapeRegExp(value) {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

const defaultTheme = createMuiTheme();
const useStyles = makeStyles(
    (theme) => ({
        root: {
            padding: theme.spacing(0.5, 0.5, 0),
            justifyContent: 'space-between',
            display: 'flex',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
        },
        textField: {
            [theme.breakpoints.down('xs')]: {
                width: '100%',
            },
            margin: theme.spacing(1, 0.5, 1.5),
            '& .MuiSvgIcon-root': {
                marginRight: theme.spacing(0.5),
            },
            '& .MuiInput-underline:before': {
                borderBottom: `1px solid ${theme.palette.divider}`,
            },
        },
    }),
    { defaultTheme },
);

// Quick search
function QuickSearchToolbar(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <TextField
                variant="standard"
                value={props.value}
                onChange={props.onChange}
                placeholder="Rechercher…"
                className={classes.textField}
                InputProps={{
                    startAdornment: <SearchIcon fontSize="small" />,
                    endAdornment: (
                        <IconButton
                            title="Clear"
                            aria-label="Clear"
                            size="small"
                            style={{ visibility: props.value ? 'visible' : 'hidden' }}
                            onClick={props.clearSearch}
                        >
                            <ClearIcon fontSize="small" />
                        </IconButton>
                    ),
                }}
            />
        </div>
    );
}

QuickSearchToolbar.propTypes = {
    clearSearch: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
};

export default function ControlledSelectionGrid(parentProps) {

    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        purple: {
            color: theme.palette.getContrastText(indigo[500]),
            backgroundColor: indigo[500],
        },
    }))
    const classes = useStyles();


    // Variables definition
    const realData = parentProps.data
    const checkBox = parentProps.check
    const choice = parentProps.choice
    const selected = parentProps.index_selected
    const load = parentProps.loading

    const [selectionModel, setSelectionModel] = React.useState([]);
    const [editRowsModel, setEditRowsModel] = React.useState({});
    const [searchText, setSearchText] = React.useState('');
    const [trueData, setTrueData] = React.useState([]);
    const [loading, setLoading] = React.useState(true)
    const [checKboxSelection, setChecKboxSelection] = React.useState(true)
    const [deleteButton, setDeleteButton] = React.useState(false)
    const [column_choice, setColumn_choice] = React.useState("calcul")
    const [openDialog, setOpenDialog] = React.useState(false)

    // Set default
    React.useEffect(
        () => {
            setTrueData(realData)
            setChecKboxSelection(checkBox)
            setColumn_choice(choice)
            setLoading(load)
            setSelectionModel(selected)
            setDeleteButton(parentProps.delete)
        }, [realData, checkBox, choice, load, selected, parentProps.delete]
    )

    const customStyle = (text) => {

        if(text) return <Grid container direction="columns" justify="center" alignContent="center"> <Avatar className={classes.purple}>{text.charAt(0)}</Avatar> </Grid>
        else return ""
    }

    // const transFormPercentage = (value) => {
    //     let finalValue
    //
    //     if (value !== ""){
    //
    //          finalValue  = (value *1000)/10  + "%"
    //     }
    //     return finalValue
    // }

    // Change status of switch button
    const handleChange  = (params) => {

        if (params.value === false){
            const type = "edit"
            const id = params.id
            parentProps.setSelection({id, type})
        }else{
            notification.error({
                message: 'Erreur activation',
                description: 'Vous ne pouvez pas désactiver',
                placement: 'bottomRight',
                duration: 5
            })
        }
    }

    // Delete file
    const deleteFile = (params) => {
        console.log("file deleted")
        setOpenDialog(false)
        const type = "delete"
        const id = params.id
        parentProps.setSelection({id, type})
    }

    // Dialog delete function
    const handleClose = () => {
        setOpenDialog(false)
    }

    const handleOpen = () => {
        setOpenDialog(true)
    }



    // Declaring all columns
    const columns = [
        {
            id: 0,
            headerName: 'Numéro de compte',
            headerAlign: 'center',
            field: 'num_compte',
            width: 200,
            editable: false,
        },
        {
            id: 2,
            width: 110,
            headerName: 'Type',
            headerAlign: 'center',
            field: 'type_compte',
            editable: false,
            renderCell: (params) => {
                const newValue =  customStyle(params.value)
                return newValue
            }
        },
        {
            id: 3,
            width: 170,
            headerName: 'Solde initial',
            headerAlign: 'center',
            field: 'solde_initial',
            type: 'number',
            editable: true,
            valueFormatter: (params) => {
                const valueFormatted = currencyTransform(params.value);
                return valueFormatted;
            },
        },
        {
            id: 4,
            width: 200,
            headerAlign: 'center',
            headerName: 'Montant autorisé',
            field: 'montant',
            type: 'number',
            editable: true,
            valueFormatter: (params) => {
                const valueFormatted = currencyTransform(params.value);
                return `${valueFormatted}`;
            },
        },
        {
            id: 5,
            width: 200,
            headerAlign: 'center',
            headerName: 'Début autorisation',
            field: 'debut_autorisation',
            editable: true,
            type: 'date'
        },
        {
            id: 6,
            headerAlign: 'center',
            width: 200,
            headerName: 'Fin autorisation',
            field: 'fin_autorisation',
            editable: true,
            type: 'date'
        },
    ];
    const columns_recap = [
        {
            id: 0,
            headerName: 'Numéro de compte',
            headerAlign: 'center',
            field: 'num_compte',
            width: 200,
            editable: false,
        },
        {
            id: 1,
            width: 170,
            headerName: 'Solde initial',
            headerAlign: 'center',
            field: 'solde_initial',
            type: 'number',
            editable: false,
            valueFormatter: (params) => {
                const valueFormatted = currencyTransform(params.value);
                return valueFormatted;
            },
        },
        {
            id: 2,
            width: 200,
            headerAlign: 'center',
            headerName: 'Montant autorisé',
            field: 'montant',
            type: 'number',
            editable: false,
            valueFormatter: (params) => {
                const valueFormatted = currencyTransform(params.value);
                return `${valueFormatted}`;
            },
        },
        {
            id: 3,
            width: 200,
            headerAlign: 'center',
            headerName: 'Début autorisation',
            field: 'debut_autorisation',
            editable: false,
            type: 'date'
        },
        {
            id: 4,
            headerAlign: 'center',
            width: 200,
            headerName: 'Fin autorisation',
            field: 'fin_autorisation',
            editable: false,
            type: 'date'
        },
    ];
    const column_operations_recap = [
        {
            id: 0,
            headerAlign: 'center',
            width: 200,
            headerName: 'Code opération',
            field: 'code_operation',
            editable: false,
            type: 'number'
        },
        {
            id: 1,
            headerAlign: 'center',
            width: 250,
            headerName: 'Libellé opération',
            field: 'libelle_operation',
            editable: false,
            type: 'number'
        },
        {
            id: 2,
            width: 186,
            headerAlign: 'center',
            headerName: 'Com mouvement',
            field: 'com_mvt',
            editable: false,
            renderCell: (params) => {
                return <FormControlLabel
                    control={<Switch checked={params.value}  name="checkedA" />}
                />
            }
        },
        {
            id: 3,
            width: 180,
            headerAlign: 'center',
            headerName: 'Com découvert',
            field: 'com_dec',
            editable: false,
            renderCell: (params) => {
                return <FormControlLabel
                    control={<Switch checked={params.value}  name="checkedA" />}
                />
            }
        }
    ]
    const column_operations = [
        {
            id: 0,
            headerAlign: 'center',
            width: 200,
            headerName: 'Code opération',
            field: 'code_operation',
            editable: false,
            type: 'number'
        },
        {
            id: 1,
            headerAlign: 'center',
            width: 250,
            headerName: 'Libellé opération',
            field: 'libelle_operation',
            editable: false,
            type: 'number'
        },
        {
            id: 2,
            width: 186,
            headerAlign: 'center',
            headerName: 'Com mouvement',
            field: 'com_mvt',
            editable: false,
            renderCell: (params) => {
                return <FormControlLabel
                    control={<Switch checked={params.value}  name="checkedA" onChange={() => handleChange(params)} />}
                />
            }
        },
        {
            id: 3,
            width: 180,
            headerAlign: 'center',
            headerName: 'Com découvert',
            field: 'com_dec',
            editable: false,
            renderCell: (params) => {
                return <FormControlLabel
                    control={<Switch checked={params.value}  name="checkedA" onChange={() => handleChange(params)} />}
                />
            }
        }
    ]
    const column_results = [
        {
            id: 0,
            headerName: 'N° de Compte',
            headerAlign: 'center',
            field: 'N° Compte',
            width: 200,
            editable: false,
        },
        {
            id: 1,
            headerName: 'Résultat calcul',
            headerAlign: 'center',
            field: 'Calcul',
            width: 200,
            editable: false,
        },
        {
            id: 2,
            headerName: 'Résultat journal',
            headerAlign: 'center',
            field: 'Journal',
            width: 200,
            editable: false,
        },
        {
            id: 2,
            headerName: 'Ecart',
            headerAlign: 'center',
            field: 'Ecart',
            width: 200,
            editable: false,
        },
        {
            id: 3,
            headerName: 'Date début arrêté',
            headerAlign: 'center',
            field: 'date_deb',
            width: 200,
            editable: false,
        },
        {
            id: 3,
            headerName: 'Date fin arrêté',
            headerAlign: 'center',
                field: 'date_fin',
            width: 200,
            editable: false,
        },
    ]

    const all_columns = {

        "calcul": columns,
        "results": column_results,
        "operations": column_operations,
        "accounts_recap": columns_recap,
        "operations_recap": column_operations_recap,
        "columns_files": [
            {
                id: 0,
                headerName: '#',
                headerAlign: 'center',
                field: 'index',
                width: 90,
                editable: false,
            },
            {
                id: 1,
                headerName: 'Type',
                headerAlign: 'center',
                field: 'type',
                width: 150,
                editable: false,
            },
            {
                id: 2,
                headerName: 'Longueur',
                headerAlign: 'center',
                field: 'longueur',
                width: 150,
                editable: false,
            },
            {
                id: 5,
                headerName: 'Date Valeur min',
                headerAlign: 'center',
                field: 'date_inf',
                width: 180,
                editable: false,
            },
            {
                id: 4,
                headerName: 'Date Valeur max',
                headerAlign: 'center',
                field: 'date_sup',
                width: 190,
                editable: false,
            },
            {
                id: 3,
                headerName: 'Ajouté le',
                headerAlign: 'center',
                field: 'created_at',
                width: 150,
                editable: false,
                type: 'date'
            },
            {
                id: 6,
                headerName: 'Action',
                headerAlign: 'center',
                field: 'active_file',
                width: 200,
                editable: false,
                renderCell: (params) => {

                    // Add options parameters
                    const addDelete = deleteButton === true ?
                        <>
                            <IconButton aria-label="delete" onClick={handleOpen}>
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                            <Dialog
                                open={openDialog}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">{"Suppression du fichier"}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        Voulez-vous vraiment supprimer ce fichier ? Cette action sera irreversible
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose} color="primary">
                                        Annuler
                                    </Button>
                                    <Button onClick={() => deleteFile(params)} color="primary" autoFocus>
                                        Confirmer
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </>
                        : <></>

                    const result =
                    <div>
                        <FormControlLabel control={<Switch checked={params.value}  name="checkedA" onChange={() => handleChange(params)} />}/>
                        {addDelete}
                    </div>

                    return result
                }
            },


        ],
    }

    // helpers functions
    const currencyTransform = (amount) => {

        if (amount === "") return amount

        const formatter = new Intl.NumberFormat('fr-FR', {style: 'currency', currency: 'XAF' })
        return  formatter.format(amount)
    }

    const requestSearch = (searchValue) => {
        setSearchText(searchValue);
        const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
        const filteredRows = realData.filter((row) => {
            return Object.keys(row).some((field) => {
                return searchRegex.test(row[field].toString());
            });
        });
        setTrueData(filteredRows);
    };

    const handleEditCellChange = React.useCallback(
        ({ id, field, props }) => {

                const data = props;

                if( data.value){
                    const value = data.value
                    const newState = {};
                    newState[id] = {
                        ...editRowsModel[id],
                    };
                    newState[id][field] = {...props, error: value === "" }

                    const updatedState = { ...editRowsModel, ...newState }

                    setEditRowsModel(updatedState);
            }
        },
        [editRowsModel],
    );

    const handleEditCellChangeCommitted = React.useCallback(
        ({ id, field, props }) => {

                const data = props;

                if  (data.value){

                    const value = data.value

                    if(value !== ""){

                        // update datas
                        const updateData = trueData.map( (row) => {
                            if( row.id === id){
                                row[field] = value
                                return row
                            }
                            return row
                        })

                        notification.success({
                            message: `${field} mis à jour`,
                            description: ` Nouvelle valeur: ${value}`,
                            placement: 'bottomRight',
                            duration: 5
                        });
                        const newSelectionModel  = {...selectionModel}
                        const selected_rows = selectionModel.map( (ind, val) => updateData[ind])

                        parentProps.setSelection({newSelectionModel, selected_rows, updateData})
                    }

                }


        },
        [parentProps, trueData, selectionModel]
    );


    let width = "80em"


    if(column_choice === "results"){
        width = "80em"
    }else if(column_choice === "operations"){
        width = "63em"
    }else if(column_choice === "accounts_recap"){
        width = "40em"
    }else if(column_choice === "operations_recap"){
        width = "40em"
    }

    let autoHeight = true
    if (trueData.length > 20) autoHeight = null
    return (
        <div style={{ height: 500, width: width }}>
            <DataGrid
                autoHeight={autoHeight}
                loading = {loading}
                checkboxSelection = {checKboxSelection}
                components={{ Toolbar: QuickSearchToolbar, LoadingOverlay: CustomLoadingOverlay }}
                componentsProps={{
                    toolbar: {
                        value: searchText,
                        onChange: (event) => requestSearch(event.target.value),
                        clearSearch: () => requestSearch(''),
                    },
                }}
                // onSelectionModelChange = {(newSelectionModel, data) => {
                //
                //
                //     setSelectionModel(newSelectionModel);
                //
                //     const selected_rows = newSelectionModel.map( (ind, val) => trueData[ind])
                //     const updateData = trueData
                //
                //     parentProps.setSelection({newSelectionModel, selected_rows, updateData})
                // }}
                columns={all_columns[column_choice]}
                // selectionModel={selectionModel}
                rows = {trueData}
                editRowsModel={editRowsModel}
                onEditCellChange={handleEditCellChange}
                onEditCellChangeCommitted={handleEditCellChangeCommitted}
                disableSelectionOnClick
            />
        </div>
    );
}