import * as React from 'react';
import { DataGrid, GridOverlay, useGridSlotComponentProps, GridToolbarDensitySelector, GridToolbarFilterButton } from '@material-ui/data-grid';
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
// import Pagination from '@material-ui/lab/Pagination';


// const useStyles2 = makeStyles({
//     root: {
//         display: 'flex',
//     },
// });
//
// // pagination
// function CustomPagination() {
//     const { state, apiRef } = useGridSlotComponentProps();
//     const classes = useStyles2();
//     return (
//         <Pagination
//             className={classes.root}
//             color="primary"
//             count={state.pagination.pageCount}
//             page={state.pagination.page + 1}
//             onChange={(event, value) => apiRef.current.setPage(value - 1)}
//         />
//     );
// }

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

    const realData = parentProps.data
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
    const [selectionModel, setSelectionModel] = React.useState([]);
    const [editRowsModel, setEditRowsModel] = React.useState({});
    const [searchText, setSearchText] = React.useState('');
    const [trueData, setTrueData] = React.useState([]);
    const [loading, setLoading] = React.useState(true)

    // Set default
    React.useEffect(
        () => {
            setTrueData(realData)
            setLoading(parentProps.loading)
        }, [realData, loading]
    )
    React.useEffect(
        () => {
            setSelectionModel(parentProps.index_selected)
        }, [selectionModel]
    )

    const customStyle = (text) => {
        return <Grid container direction="columns" justify="center" alignContent="center"> <Avatar className={classes.purple}>{text.charAt(0)}</Avatar> </Grid>
    }

    const transFormPercentage = (value) => {
        let finalValue

        if (value !== ""){

             finalValue  = (value *1000)/10  + "%"
        }
        return finalValue
    }

    // Declaring all columns

    const checKboxSelection = parentProps.check
    const column_choice = parentProps.choice
    const columns = [
        {
            id: 0,
            headerName: 'Numéro de compte',
            headerAlign: 'center',
            field: 'num_compte',
            width: 200,
            editable: false,
        },
        // {
        //     id: 1,
        //     width: 200,
        //     headerName: 'Intitulé du compte',
        //     headerAlign: 'center',
        //     field: 'intitule',
        //     editable: false,
        // },
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
    const column_results = [
        {
            id: 0,
            headerName: 'DESIGNATION',
            headerAlign: 'center',
            field: 'col_0',
            width: 200,
            editable: false,
        },
        {
            id: 1,
            headerName: 'TAUX',
            headerAlign: 'center',
            field: 'col_1',
            width: 200,
            editable: false,
            renderCell: (params) => {
                const newValue =  transFormPercentage(params.value)
                return newValue
            }
        },
        {
            id: 2,
            headerName: 'AGIOS',
            headerAlign: 'center',
            field: 'col_2',
            width: 200,
            editable: false,
        },
        {
            id: 2,
            headerName: 'AMPLITUDE',
            headerAlign: 'center',
            field: 'col_3',
            width: 200,
            editable: false,
        },
        {
            id: 4,
            headerName: 'ECART',
            headerAlign: 'center',
            field: 'col_4',
            width: 200,
            editable: false,
        },
    ]
    const all_columns = {

        "calcul": columns,
        "results": column_results
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
                        const selected_accounts = selectionModel.map( (ind, val) => updateData[val])
                        const newSelectionModel = selectionModel

                        parentProps.setAccount({newSelectionModel, selected_accounts, updateData})
                    }

                }
                // const newState = {};
                // newState[id] = {
                //     ...editRowsModel[id],
                //     solde_initial: {...props, error: value === "" },
                // };
                //
                // const updatedState = { ...editRowsModel, ...newState }
                //
                // const selected_accounts = selectionModel.map( (ind, val) => trueData[val])
                // const newSelectionModel = selectionModel
                //
                // setEditRowsModel(updatedState);
                //
                //


        },
        [editRowsModel]
    );


    let width = "80em"

    if(column_choice === "results"){
        width = "100%"
    }

    // const trueData = parentProps.data

    return (
        <div style={{ height: 500, width: width }}>
            <DataGrid
                components={{
                    LoadingOverlay: CustomLoadingOverlay,
                }}
                loading = {loading}
                checkboxSelection = {checKboxSelection}
                components={{ Toolbar: QuickSearchToolbar }}
                componentsProps={{
                    toolbar: {
                        value: searchText,
                        onChange: (event) => requestSearch(event.target.value),
                        clearSearch: () => requestSearch(''),
                    },
                }}
                onSelectionModelChange = {(newSelectionModel, data) => {

                    setSelectionModel(newSelectionModel);

                    const selected_accounts = newSelectionModel.map( (ind, val) => trueData[val])

                    parentProps.setAccount({newSelectionModel, selected_accounts})
                }}
                columns={all_columns[column_choice]}
                selectionModel={selectionModel}
                rows = {trueData}
                editRowsModel={editRowsModel}
                onEditCellChange={handleEditCellChange}
                onEditCellChangeCommitted={handleEditCellChangeCommitted}
            />
        </div>
    );
}