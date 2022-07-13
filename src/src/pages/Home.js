import React, { Component  } from 'react'
import {Box, Grid, Paper} from "@material-ui/core";
import {
    courantintperiod,
    data, epargneint, epargneintperiod,
    folderIconSize,
    generalcolsagence, journal_total_sum, period, periodcolagence, simulation_sum, titleintgeneral, titleintperiod,
    titlestatgeneral, titlestatperiod, type_account,
    urlgetStats,
    useStyles
} from "../constants/constants";
import {withStyles} from "@material-ui/core/styles";
import Template from "./Template";
import img from "../assets/WebMoney_48px.png";
import FolderIcon from '@material-ui/icons/Folder';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {Tooltip, Progress, Table, Divider, Button, Tabs} from 'antd';
import {compose} from "redux";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";
import '../assets/css/style.css'
// import ReactExport from "react-export-excel";
import { DownloadOutlined } from '@ant-design/icons';

// const ExcelFile = ReactExport.ExcelFile;
// const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
// const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


const { TabPane } = Tabs;

class Home extends Component {

    state = {
        data: data,
        targetItem: undefined,
        total  : 0,
        totalUnique  : 0,
        total_auto  : 0,
        size_total  : 1,
        total_files_courant: 0,
        total_files_epargne: 0,
        used  : 0,
        total_sim: 0,
        epargne: {},
        courant: {},
        global: 0,


    }

    changeTargetItem = targetItem => this.setState({ targetItem })

    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    componentDidMount() {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const token  = this.props.auth.token


        if(token){
            config.headers['Authorization'] = `Token  ${token}`
        }

        axios.get(urlgetStats, config).then( res => {

            this.setState({
                total  : res.data['total'],
                totalUnique  : res.data['totalUnique'],
                total_auto  : res.data['total_auto'],
                total_files_epargne  : res.data['total_epargne'],
                total_files_courant  : res.data['total_courant'],
                size_total  : res.data['size_total'],
                used  : res.data['used'],
                total_sim: res.data['total_sim'],
                courant: res.data['courant'],
                epargne: res.data['epargne'],
                global: res.data['epargne']['global']
            })
        }).catch( err => {
            console.log(err)
        })
    }

    displayTitle = (title, data, level, col) => {

        let today = new Date()
        let complete = today.toUTCString()
        complete = complete.replaceAll(":", "-")
        complete = complete.replaceAll(",", "")
        complete = complete.replace("GMT", "")

        // const dicoColumns = {
        //     "general": {
        //         "agence":  <ExcelSheet data={data} name={'Statistiques'}>
        //             <ExcelColumn label="Code Agence" value="agence"  width={80}/>
        //             <ExcelColumn label="Simulation" value={simulation_sum}  width={80}/>
        //             <ExcelColumn label="Comptabilisation" value={journal_total_sum}  width={80}/>
        //             <ExcelColumn label="Type de compte" value={type_account}  width={80}/>
        //         </ExcelSheet>,
        //         "agenceper":  <ExcelSheet data={data} name={'Statistiques'}>
        //             <ExcelColumn label="Période" value={period}  width={80}/>
        //             <ExcelColumn label="Code Agence" value="agence"  width={80}/>
        //             <ExcelColumn label="Simulation" value={simulation_sum}  width={80}/>
        //             <ExcelColumn label="Comptabilisation" value={journal_total_sum}  width={80}/>
        //             <ExcelColumn label="Type de compte" value={type_account}  width={80}/>
        //         </ExcelSheet>,
        //         "int":  <ExcelSheet data={data} name={'Statistiques'}>
        //             <ExcelColumn label="Eléments" value="element"  width={80}/>
        //             <ExcelColumn label="Simulation" value="simulation_sum"  width={80}/>
        //             <ExcelColumn label="Comptabilisation" value="journal_sum"  width={80}/>
        //             <ExcelColumn label="Variation" value="variation_sum"  width={80}/>
        //             <ExcelColumn label="Nombre" value="journal_count"  width={80}/>
        //             <ExcelColumn label="Type de compte" value={type_account}  width={80}/>
        //         </ExcelSheet>,
        //     },
        //     "epargne": {
        //         "intperiod":  <ExcelSheet data={data} name={'Statistiques'}>
        //             <ExcelColumn label="Période" value={period}  width={80}/>
        //             <ExcelColumn label="Simulation Total" value={"simulation_total_sum"}  width={80}/>
        //             <ExcelColumn label="Simulation Intérets Créditeurs" value={"int_cred_sim_sum"}  width={80}/>
        //             <ExcelColumn label="Simulation Frais Fixes" value={"simulation_frais_sum"}  width={80}/>
        //             <ExcelColumn label="Simulation TVA" value={"simulation_tva_sum"}  width={80}/>
        //             <ExcelColumn label="Comptabilisation Total" value={"journal_total_sum"}  width={80}/>
        //             <ExcelColumn label="Comptabilisation Intérets Créditeurs" value={"int_cred_journ_sum"}  width={80}/>
        //             <ExcelColumn label="Comptabilisation Frais Fixes" value={"journal_frais_sum"}  width={80}/>
        //             <ExcelColumn label="Comptabilisation TVA" value={"journal_tva_sum"}  width={80}/>
        //             <ExcelColumn label="Variation Total" value={"variation_total_sum"}  width={80}/>
        //             <ExcelColumn label="Variation Intérets Créditeurs" value={"variation_cred_sum"}  width={80}/>
        //             <ExcelColumn label="Variation Frais Fixes" value={"variation_frais_sum"}  width={80}/>
        //             <ExcelColumn label="Variation TVA" value={"variation_tva_sum"}  width={80}/>
        //             <ExcelColumn label="Nombre" value={"variation_total_sum"}  width={80}/>
        //             <ExcelColumn label="Type de compte" value={type_account}  width={80}/>
        //         </ExcelSheet>,
        //     },
        //     "courant":{
        //         "intperiod":  <ExcelSheet data={data} name={'Statistiques'}>
        //             <ExcelColumn label="Période" value={period}  width={80}/>
        //             <ExcelColumn label="Simulation Total" value={"simulation_total_sum"}  width={80}/>
        //             <ExcelColumn label="Simulation Intérets débiteurs" value={"int_deb_sim_sum"}  width={80}/>
        //             <ExcelColumn label="Simulation Com Mvt" value={"simulation_com_mvt_sum"}  width={80}/>
        //             <ExcelColumn label="Simulation Com Déc" value={"simulation_com_dec_sum"}  width={80}/>
        //             <ExcelColumn label="Simulation Frais Fixes" value={"simulation_frais_sum"}  width={80}/>
        //             <ExcelColumn label="Simulation TVA" value={"simulation_tva_sum"}  width={80}/>
        //             <ExcelColumn label="Comptabilisation Total" value={"journal_total_sum"}  width={80}/>
        //             <ExcelColumn label="Comptabilisation Intérets Débiteurs" value={"int_deb_journ_sum"}  width={80}/>
        //             <ExcelColumn label="Comptabilisation Com Mvt" value={"journal_com_mvt_sum"}  width={80}/>
        //             <ExcelColumn label="Comptabilisation Com Déc" value={"journal_com_dec_sum"}  width={80}/>
        //             <ExcelColumn label="Comptabilisation Frais Fixes" value={"journal_frais_sum"}  width={80}/>
        //             <ExcelColumn label="Comptabilisation TVA" value={"journal_tva_sum"}  width={80}/>
        //             <ExcelColumn label="Variation Total" value={"variation_total_sum"}  width={80}/>
        //             <ExcelColumn label="Variation Intérets Débiteurs" value={"variation_int_deb_sum"}  width={80}/>
        //             <ExcelColumn label="Comptabilisation Com Mvt" value={"variation_com_mvt_sum"}  width={80}/>
        //             <ExcelColumn label="Comptabilisation Com Déc" value={"variation_com_dec_sum"}  width={80}/>
        //             <ExcelColumn label="Variation Frais Fixes" value={"variation_frais_sum"}  width={80}/>
        //             <ExcelColumn label="Variation TVA" value={"variation_tva_sum"}  width={80}/>
        //             <ExcelColumn label="Nombre" value={"variation_total_sum"}  width={80}/>
        //             <ExcelColumn label="Type de compte" value={type_account}  width={80}/>
        //         </ExcelSheet>,
        //     }
        // }

        const content = <>
            <span className="title-statistique"> {title} </span>
            <span className="download-statistique">
                {/*<ExcelFile element={<Button shape="circle" icon={<DownloadOutlined />} size={50}  style ={{  backgroundColor: "white", color: "#ef5350" }} />} filename={`${title} -- ${complete}`}>*/}
                {/*        {dicoColumns[level][col]}*/}
                {/*</ExcelFile>*/}
            </span>
        </>

        return content
    }

    render() {

        const { classes } = this.props;
        const { total, total_sim, size_total, used, total_files_courant, total_files_epargne, epargne, courant, global  } = this.state
        const res = Math.floor((used/size_total) * 100)
        const title = 'Tableau de bord -  Arrêtés des comptes'
        const subTitle = 'Bienvenue sur cette interface qui vous permet d\'effectuer vos arrêtés de comptes.'

        const content = (
            <>
               <Grid container spacing={0}>
                   <Grid item md={6} >
                       <Grid container>
                           <Grid item align="left" md={12} >
                               <span className="header-title-stockage">
                                   Fichiers Stockés  -  Simulations effectuées
                               </span>
                           </Grid>
                           <Grid item xs={9} md={4}>
                               <Paper className={classes.paper}>
                                   <Grid container >
                                       <Grid item xs={12} md={12}>
                                           <FolderIcon color="primary" className="icon-file" style= {{ fontSize: folderIconSize}} />
                                           <MoreVertIcon className="icon-file_more" fontSize="default" />
                                       </Grid>
                                       <Grid item xs={12} md={12}>
                                           <span className="text-file">Total</span>
                                       </Grid>
                                       <Box mt={5}></Box>
                                       <Grid item xs={12} md={12}>
                                           <span className="number"> {total.toLocaleString()} fichier (s)</span>
                                       </Grid>
                                   </Grid>
                               </Paper>
                           </Grid>
                           <Grid item xs={9} md={4}>
                               <Paper className={classes.paper}>
                                   <Grid container >
                                       <Grid item  xs={12} md={12}>
                                           <FolderIcon color="secondary" className="icon-file" style= {{ fontSize: folderIconSize}} />
                                           <MoreVertIcon className="icon-file_more" fontSize="default" />
                                       </Grid>
                                       <Grid item xs={12} md={12}>
                            <span className="text-file">
                                <span className="histo">
                                    Fichiers courants
                                </span>
                            </span>
                                       </Grid>
                                       <Box mt={5}></Box>
                                       <Grid item xs={12} md={12}>
                                           <span className="number"> {total_files_courant.toLocaleString()} fichier (s)</span>
                                       </Grid>
                                   </Grid>
                               </Paper>
                           </Grid>
                           <Grid item xs={10} md={4}>
                               <Paper className={classes.paper}>
                                   <Grid container >
                                       <Grid item xs={12} md={12}>
                                           <FolderIcon className="icon-file" style= {{ fontSize: folderIconSize, color: "#00695c"}} />
                                           <MoreVertIcon className="icon-file_more" fontSize="default" />
                                       </Grid>
                                       <Grid item xs={12} md={12}>
                                <span className="text-file">
                                     <span className="solde">
                                        Fichiers épargnes
                                     </span>
                                </span>
                                       </Grid>
                                       <Box mt={5}></Box>
                                       <Grid item xs={12} md={12}>
                                           <span className="number"> {total_files_epargne.toLocaleString()} fichier (s)</span>
                                       </Grid>
                                   </Grid>
                               </Paper>
                           </Grid>
                           <Grid item md={8}>
                               <Paper className={classes.paper}>
                                   <Grid container  spacing={1}>
                                       <Grid item md={5}>
                                           <Tooltip title="Pourcentage d'occupation disque">
                                               <Progress percent={res}  type="circle" />
                                           </Tooltip>
                                       </Grid>
                                       <Grid item md={6}>
                                           <Grid container >
                                               <Grid item md={12}>
                                           <span className="title-disk">
                                                Espace disque
                                           </span>
                                               </Grid>
                                               <Grid item md={12}>
                                                   <Box mt={2}></Box>
                                                   <span className="number-space">{used} <span>Gb</span> / {size_total.toLocaleString()} <span>Gb</span> </span>
                                               </Grid>
                                           </Grid>
                                       </Grid>
                                   </Grid>
                               </Paper>
                           </Grid>
                           <Grid item xs={10} md={4}>
                               <Paper className={classes.paper}>
                                   <Grid container >
                                       <Grid item xs={12} md={12}>
                                           <ConfirmationNumberIcon color="secondary" className="icon-file" style= {{ fontSize: folderIconSize, color: "#616161" }} />
                                           <MoreVertIcon className="icon-file_more" fontSize="default" />
                                       </Grid>
                                       <Grid item xs={12} md={12}>
                                <span className="text-file">
                                     <span className="autorisation">
                                        Total simulations
                                     </span>
                                </span>
                                       </Grid>
                                       <Box mt={5}></Box>
                                       <Grid item xs={12} md={12}>
                                           <span className="number"> {total_sim.toLocaleString()} </span>
                                       </Grid>
                                   </Grid>
                               </Paper>
                           </Grid>
                       </Grid>
                   </Grid>
                   <Grid align="center" item md={5}>
                       <div className="chart-display">
                            <span className="title-ecarts">
                                {global.toFixed(2).toLocaleString()} %
                            </span>
                           <span className="header-title-legend"> Pourcentage global d'écarts enregistrés </span>
                       </div>
                   </Grid>
                   <Tabs tabPosition="top" defaultActiveKey="1" style={{ marginTop: "50px" }} size={"small"}>
                       <TabPane tab=" Comptes épargnes" key="1">
                           <Grid item md={12} align="center">
                               <Box mt={1} mb={5}>
                                   <span className="header-title-stockage"> Statistiques  par agence</span>
                                   <Divider />
                               </Box>
                           </Grid>
                           <Grid item md={12}>
                               <Grid container justify="center">
                                   <Grid item md={10} >
                                       <Table title={() => this.displayTitle(titlestatgeneral, epargne['agence'], "general", "agence")}  loading={false}  rowClassName={() => 'editable-row'} bordered columns={generalcolsagence} dataSource={epargne['agence']} pagination={{ pageSize: 25}} scroll={{y: 300, x: 500 }}  />
                                   </Grid>
                                   <Box mt={3}></Box>
                                   <Grid item md={10}>
                                       <Table title={() => this.displayTitle(titlestatperiod, epargne['agenceper'], "general", "agenceper")}  loading={false}  rowClassName={() => 'editable-row'} bordered columns={periodcolagence} dataSource={epargne['agenceper']} pagination={{ pageSize: 25}} scroll={{y: 300, x: 800 }}  />
                                   </Grid>
                               </Grid>
                           </Grid>
                           <Grid item md={12} align="center">
                               <Box mt={5} mb={5}>
                                   <Divider />
                                   <span className="header-title-stockage"> Statistiques par Intérêts</span>
                                   <Divider />
                               </Box>
                           </Grid>
                           <Grid item md={12}>
                               <Grid container justify="center">
                                   <Grid item md={10}>
                                       <Table title={() => this.displayTitle(titleintgeneral, epargne['int'], "general", "int")}  loading={false}  rowClassName={() => 'editable-row'} bordered columns={epargneint} dataSource={epargne['int']} pagination={{ pageSize: 25}} scroll={{y: 300, x: 500 }}  />
                                   </Grid>
                                   <Grid item md={10}>
                                       <Table title={() => this.displayTitle(titleintperiod, epargne['intperiod'], "epargne", "intperiod")}  loading={false}  rowClassName={() => 'editable-row'} bordered columns={epargneintperiod} dataSource={epargne['intperiod']} pagination={{ pageSize: 25}} scroll={{y: 300, x: 800 }}  />
                                   </Grid>
                               </Grid>
                           </Grid>
                       </TabPane>

                       {/*/* Comptes courants*/}
                       <TabPane tab="Comptes courants" key="2">
                           <Grid item md={12} align="center">
                               <Box mt={1} mb={5}>
                                   <span className="header-title-stockage"> Statistiques  par agence</span>
                                   <Divider />
                               </Box>
                           </Grid>
                           <Grid item md={12}>
                               <Grid container justify="center">
                                   <Grid item md={10}>
                                       <Table title={() => this.displayTitle(titlestatgeneral, courant['agence'], "general", "agence")}  loading={false}  rowClassName={() => 'editable-row'} bordered columns={generalcolsagence} dataSource={courant['agence']} pagination={{ pageSize: 25}} scroll={{y: 300, x: 500 }}  />
                                   </Grid>
                                   <Box mt={3}></Box>
                                   <Grid item md={10}>
                                       <Table title={() => this.displayTitle(titlestatperiod, courant['agenceper'], "general", "agenceper")}  loading={false}  rowClassName={() => 'editable-row'} bordered columns={periodcolagence} dataSource={courant['agenceper']} pagination={{ pageSize: 25}} scroll={{y: 300, x: 800 }}  />
                                   </Grid>
                               </Grid>
                           </Grid>
                           <Grid item md={12} align="center">
                               <Box mt={5} mb={5}>
                                   <Divider />
                                   <span className="header-title-stockage"> Statistiques par Intérêts</span>
                                   <Divider />
                               </Box>
                           </Grid>
                           <Grid item md={12}>
                               <Grid container justify="center">
                                   <Grid item md={10}>
                                       <Table title={() => this.displayTitle(titleintgeneral, courant['int'], "general", "int")}  loading={false}  rowClassName={() => 'editable-row'} bordered columns={epargneint} dataSource={courant['int']} pagination={{ pageSize: 25}} scroll={{y: 300, x: 500 }}  />
                                   </Grid>
                                   <Box mt={3}></Box>
                                   <Grid item md={10}>
                                       <Table title={() => this.displayTitle(titleintperiod, courant['intperiod'], "courant", "intperiod")}  loading={false}  rowClassName={() => 'editable-row'} bordered columns={courantintperiod} dataSource={courant['intperiod']} pagination={{ pageSize: 25}} scroll={{y: 300, x: 800 }}  />
                                   </Grid>
                               </Grid>
                           </Grid>
                       </TabPane>
                   </Tabs>
               </Grid>
            </>
        )

        const component = {
            'title': title,
            'subTitle': subTitle,
            'content': content,
            'selected': 0,
            'img': img,
        }


        return (
            <Template component={component} />
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})


export default compose(withStyles(useStyles, {withTheme: true}), connect(mapStateToProps))(Home)
