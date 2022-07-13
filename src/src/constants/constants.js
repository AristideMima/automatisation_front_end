
import { transitions, positions } from "react-alert";
import image from "../assets/back_5.jpg";

// Constants file
export  const paperLogStyle = { padding: 30}

const drawerWidth = 240;

export const formStepperStyle = {
    padding: "2%",
}

export const useStyles = theme => ({

    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        backgroundColor: "black"
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: "#4f5053",
        color: "white"
    },
    content: {
        flexGrow: 1,
        // padding: theme.spacing.unit * 3,
    },
    toolbar:{
        textAlign: "center",
        marginTop: "100px",
        marginBottom: "20px"
    },
    title: {
        textTransform: "uppercase",
        flexGrow: 2,
        textAlign: "center",
        fontFamily: "Arial",
        fontWeight: "bold",
        fontSize: "large",
        color: "white"
    },
    instructions: {
        marginTop: theme.spacing(1, 0),
        marginBottom: theme.spacing(1,0),
    },
    backButton: {
        marginRight: theme.spacing(1, 0),
    },
    rootStepper: {
        width: '100%',
    },

    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        margin : "10px"
    },
    paperStyle: {
        padding: theme.spacing(10),
        textAlign: 'center',
    },
    avatar: {
        backgroundColor: "#9e9e9e",
    },
    card: {
        maxWidth: "100%"
    }
});

export const data = [
    { year: '1950', population: 2.525 },
    { year: '1960', population: 3.018 },
    { year: '1970', population: 3.682 },
    { year: '1980', population: 4.440 },
    { year: '1990', population: 5.310 },
    { year: '2000', population: 6.127 },
    { year: '2010', population: 6.930 },
]

// Alerts options
export const alertOptions = {
    position: positions.MIDDLE,
    timeout: 2000,
    offset: '50px',
    // you can also just use 'scale'
    transition: transitions.SCALE
}

export const gridContainerStyle = {
    minHeight: '100vh',
    backgroundImage: `url(${image})`
}

export const gridUploadStyle = {
    borderRadius: '10%',
    border: '1px dashed #bdbdbd',
    padding: "5%"
}

export const specialLinkLog = {
    textDecoration: "none",
    color: "#424242",
    fontWeight: "bold",
    hover: {
        textDecoration: "underline"
    }
}

export const FormStyles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '25ch',
    },
})

export const pointer = {
    cursor: 'pointer',
    textDecoration: 'None'
};

export const NoDecoration = {
    textDecoration: 'None'
}


// export const prefixeurl = 'http://172.21.88.31:16001/'
export const prefixeurl = 'http://172.21.240.178:8002/'
// export const prefixeurl = 'http://127.0.0.   1:8000/'
export const prefixeapiurl = prefixeurl + 'api/'


// Users constants
export const urlLoadUser =  prefixeapiurl + 'auth/user'
export const urlLoginUser = prefixeapiurl + 'auth/login'
export const urlregisterUser = prefixeapiurl + 'auth/register'
export const urlLogoutUser = prefixeapiurl + 'auth/logout/'


// Other functionnalities
export const urlInfos = prefixeapiurl + 'getInfos'
export const urlUpload = prefixeapiurl + 'upload/'
export const urlUnique = prefixeapiurl + 'computeUnique'
export const urlgetStats = prefixeapiurl + 'getStats'
export const urlCalcul = prefixeapiurl + 'calculs'
export const urlActivate = prefixeapiurl + 'activateFile'
export const urlSetActivate = prefixeapiurl + 'setActiveFile'
export const urlDeleteActivate = prefixeapiurl + 'deleteFile'

export const config = {
    headers: {
        'Content-Type': 'application/json'
    }
}


export const choiceOptionLoading = ["courant", "epargne"]
export const choiceTypeLoading = ["files", "rates"]
export const textConfirmLoading = "Confirmez vous le chargement des fichiers ?"
export const textConfirmComputeUnique = "Lancer le calcul des arrêté ?"
export const emptyList = "Vider la liste ?"



// Constants



export const num_account = "num_account"
export const intitule = "Intitulé compte"
export const com_rate = "com_rate"
export const dec_rate = "dec_rate"
export const tva_rate = "tva_rate"
export const int1_rate = "int1_rate"
export const int2_rate ="int2_rate"
export const int3_rate = "int3_rate"

export const inf_rate = "inf_rate"
export const sup_rate = "sup_rate"
export const ircm_rate = "ircm_rate"



// Statistics values

export const type_account = "type"

export const code_agence = "agence"
export const simulation_count = "simulation_total_count"
export const simulation_sum = "simulation_total_sum"
export const journal_total_count = "journal_total_count"
export const journal_total_sum = "journal_total_sum"
export const ecart_count = "ecart_count"
export const ecart_sum = "ecart_sum"

export const period = "period"

export const journal_int_1_count = "journal_int_1_count"
export const journal_int_1_sum = "journal_int_1_sum"
export const journal_int_2_count = "journal_int_2_count"
export const journal_int_2_sum = "journal_int_2_sum"
export const journal_int_3_count = "journal_int_3_count"
export const journal_int_3_sum = "journal_int_3_sum"

export const journal_int_inf_count = "journal_int_inf_count"
export const journal_int_inf_sum = "journal_int_inf_sum"
export const journal_int_sup_count = "journal_int_sup_count"
export const journal_int_sup_sum = "journal_int_sup_sum"
export const journal_ircm_count = "journal_ircm_count"
export const journal_ircm_sum = "journal_ircm_sum"

export const journal_frais_count = "journal_frais_count"
export const journal_frais_sum = "journal_frais_sum"
export const journal_tva_count = "journal_tva_count"
export const journal_tva_sum = "journal_tva_sum"
export const journal_com_dec_count = "journal_com_dec_count"
export const journal_com_dec_sum = "journal_com_dec_sum"
export const journal_com_mvt_count = "journal_com_mvt_count"
export const journal_com_mvt_sum = "journal_com_mvt_sum"

export const simulation_int_count = "simulation_int_1_count"
export const simulation_int_sum = "simulation_int_1_sum"
export const simulation_int_2_count = "simulation_int_2_count"
export const simulation_int_2_sum = "simulation_int_2_sum"
export const simulation_int_3_count = "simulation_int_3_count"
export const simulation_int_3_sum = "simulation_int_3_sum"
export const simulation_frais_count = "simulation_frais_count"
export const simulation_frais_sum = "simulation_frais_sum"
export const simulation_tva_count = "simulation_tva_count"
export const simulation_tva_sum = "simulation_tva_sum"
export const simulation_com_dec_count = "simulation_com_dec_count"
export const simulation_com_dec_sum = "simulation_com_dec_sum"
export const simulation_com_mvt_count = "simulation_com_mvt_count"
export const simulation_com_mvt_sum = "journal_com_mvt_sum"


export const folderIconSize = 50


export const generalcolsagence = [
    {
        title: 'Agence',
        dataIndex: code_agence,
        key:  code_agence,
        width: 100
    },
    {
        title: 'Simulation',
        dataIndex: simulation_sum,
        key: simulation_sum,
        width: 180,
        render: amount => amount.toLocaleString()
    },
    {
        title: 'Comptabilisation',
        dataIndex: journal_total_sum,
        key: journal_total_sum,
        width: 180,
        render: amount => amount.toLocaleString()
    },
    {
        title: 'Variation',
        dataIndex: ecart_sum,
        key: ecart_sum,
        width: 100,
        render: amount => amount.toLocaleString()
    },
    {
        title: 'Type de compte',
        dataIndex: type_account,
        key: type_account,
        width: 180,
        render: amount => amount.toLocaleString()
    },
]
export const periodcolagence = [
    {
        title: 'Période',
        dataIndex: period,
        key:  period,
        width: 180
    },
    ...generalcolsagence
]

export const epargneint = [
    {
        title: 'Eléments',
        dataIndex: "element",
        key:  "element",
        width: 180
    },
    {
        title: 'Simulation',
        dataIndex: "simulation_sum",
        key:  "simulation_sum",
        width: 180,
        render: amount => amount.toLocaleString()
    },
    {
        title: 'Comptabilisation',
        dataIndex: "journal_sum",
        key:  "journal_sum",
        width: 150,
        render: amount => amount.toLocaleString()
    },
    {
        title: 'Variation',
        dataIndex: "variation_sum",
        key:  "variation_sum",
        width: 180,
        render: amount => amount.toLocaleString()
    },
    {
        title: 'Nombre',
        dataIndex: "journal_count",
        key:  "journal_count",
        width: 180,
        render: amount => amount.toLocaleString()
    },
    {
        title: 'Type de compte',
        dataIndex: type_account,
        key: type_account,
        width: 180,
        render: amount => amount.toLocaleString()
    },
]

export const epargneintperiod = [
    {
        title: 'Période',
        dataIndex: "period",
        key:  "period",
        width: 180
    },
    {
        title: "Simulation",
        children: [
            {
                title: 'Total',
                dataIndex: "simulation_total_sum",
                key:  "simulation_total_sum",
                width: 180,
                render: amount => amount.toLocaleString()
            },
            {
                title: 'Intérets Créditeurs',
                dataIndex: "int_cred_sim_sum",
                key:  "int_cred_sim_sum",
                width: 180,
                render: amount => amount.toLocaleString()
            },
            {
                title: 'Frais Fixes',
                dataIndex: "simulation_frais_sum",
                key:  "simulation_frais_sum",
                width: 180,
                render: amount => amount.toLocaleString()
            },
            {
                title: 'TVA',
                dataIndex: "simulation_tva_sum",
                key:  "simulation_tva_sum",
                width: 180,
                render: amount => amount.toLocaleString()
            },
        ]
    },
    {
        title: "Comptabilisation",
        children: [
            {
                title: 'Total',
                dataIndex: "journal_total_sum",
                key:  "journal_total_sum",
                width: 180,
                render: amount => amount.toLocaleString()
            },
            {
                title: 'Intérets Créditeurs',
                dataIndex: "int_cred_journ_sum",
                key:  "int_cred_journ_sum",
                width: 180,
                render: amount => amount.toLocaleString()
            },
            {
                title: 'Frais Fixes',
                dataIndex: "journal_frais_sum",
                key:  "journal_frais_sum",
                width: 180,
                render: amount => amount.toLocaleString()
            },
            {
                title: 'TVA',
                dataIndex: "journal_tva_sum",
                key:  "journal_tva_sum",
                width: 180,
                render: amount => amount.toLocaleString()
            },
        ]
    },
    {
        title: "Variation",
        children: [
            {
                title: 'Total',
                dataIndex: "variation_total_sum",
                key:  "variation_total_sum",
                width: 180,
                render: amount => amount.toLocaleString()
            },
            {
                title: 'Intérets Créditeurs',
                dataIndex: "variation_cred_sum",
                key:  "variation_cred_sum",
                width: 180,
                render: amount => amount.toLocaleString()
            },
            {
                title: 'Frais Fixes',
                dataIndex: "variation_frais_sum",
                key:  "variation_frais_sum",
                width: 180,
                render: amount => amount.toLocaleString()
            },
            {
                title: 'TVA',
                dataIndex: "variation_tva_sum",
                key:  "variation_tva_sum",
                width: 180,
                render: amount => amount.toLocaleString()
            },
        ]
    },
    {
        title: "Nombre",
        dataIndex: "variation_tva_count",
        key: "variation_tva_count",
        width: 180,
        render: amount => amount.toLocaleString()
    },
    {
        title: "Type de compte",
        dataIndex: type_account,
        key: type_account,
        width: 180,
    }

]

export const courantintperiod = [
    {
        title: 'Période',
        dataIndex: "period",
        key:  "period",
        width: 180
    },
    {
        title: "Simulation",
        children: [
            {
                title: 'Total',
                dataIndex: "simulation_total_sum",
                key:  "simulation_total_sum",
                width: 180,
                render: amount => amount.toLocaleString()
            },
            {
                title: 'Intérets débiteurs',
                dataIndex: "int_deb_sim_sum",
                key:  "int_deb_sim_sum",
                width: 180,
                render: amount => amount.toLocaleString()
            },
            {
                title: 'Com Mvt',
                dataIndex: "simulation_com_mvt_sum",
                key:  "simulation_com_mvt_sum",
                width: 180,
                render: amount => amount.toLocaleString()
            },
            {
                title: 'Com Déc',
                dataIndex: "simulation_com_dec_sum",
                key:  "simulation_com_dec_sum",
                width: 180,
                render: amount => amount.toLocaleString()
            },
            {
                title: 'Frais Fixes',
                dataIndex: "simulation_frais_sum",
                key:  "simulation_frais_sum",
                width: 180,
                render: amount => amount.toLocaleString()
            },
            {
                title: 'TVA',
                dataIndex: "simulation_tva_sum",
                key:  "simulation_tva_sum",
                width: 180,
                render: amount => amount.toLocaleString()
            },
        ]
    },
    {
        title: "Comptabilisation",
        children: [
            {
                title: 'Total',
                dataIndex: "journal_total_sum",
                key:  "journal_total_sum",
                width: 180,
                render: amount => amount.toLocaleString()
            },
            {
                title: 'Intérets débiteurs',
                dataIndex: "int_deb_journ_sum",
                key:  "int_deb_journ_sum",
                width: 180,
                render: amount => amount.toLocaleString()
            },
            {
                title: 'Com Mvt',
                dataIndex: "journal_com_mvt_sum",
                key:  "journal_com_mvt_sum",
                width: 180,
                render: amount => amount.toLocaleString()
            },
            {
                title: 'Com Déc',
                dataIndex: "journal_com_dec_sum",
                key:  "journal_com_dec_sum",
                width: 180,
                render: amount => amount.toLocaleString()
            },
            {
                title: 'Frais Fixes',
                dataIndex: "journal_frais_sum",
                key:  "journal_frais_sum",
                width: 180,
                render: amount => amount.toLocaleString()
            },
            {
                title: 'TVA',
                dataIndex: "journal_tva_sum",
                key:  "journal_tva_sum",
                width: 180,
                render: amount => amount.toLocaleString()
            },
        ]
    },
    {
        title: "Variation",
        children: [
            {
                title: 'Total',
                dataIndex: "variation_total_sum",
                key:  "variation_total_sum",
                width: 180,
                render: amount => amount.toLocaleString()
            },
            {
                title: 'Intérets débiteurs',
                dataIndex: "variation_int_deb_sum",
                key:  "variation_int_deb_sum",
                width: 180,
                render: amount => amount.toLocaleString()
            },
            {
                title: 'Com Mvt',
                dataIndex: "variation_com_mvt_sum",
                key:  "variation_com_mvt_sum",
                width: 180,
                render: amount => amount.toLocaleString()
            },
            {
                title: 'Com Déc',
                dataIndex: "variation_com_dec_sum",
                key:  "variation_com_dec_sum",
                width: 180,
                render: amount => amount.toLocaleString()
            },
            {
                title: 'Frais Fixes',
                dataIndex: "variation_frais_sum",
                key:  "variation_frais_sum",
                width: 180,
                render: amount => amount.toLocaleString()
            },
            {
                title: 'TVA',
                dataIndex: "variation_tva_sum",
                key:  "variation_tva_sum",
                width: 180,
                render: amount => amount.toLocaleString()
            },
        ]
    },
    {
        title: "Nombre",
        dataIndex: "variation_tva_count",
        key: "variation_tva_count",
        width: 100,
        render: amount => amount.toLocaleString()
    },
    {
        title: "Type de compte",
        dataIndex: type_account,
        key: type_account,
        width: 180,
    }

]


export const titlestatgeneral = "Statistiques des arrêtés"
export const titlestatperiod = "Statistiques des arrêtés périodique"


export const titleintgeneral = "Variation simulation - comptabilisation "
export const titleintperiod = "Variation périodique"




