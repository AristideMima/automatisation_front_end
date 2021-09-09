import React, { Component  } from 'react'
import {
     Box,
    Grid,
     Paper,
} from "@material-ui/core";
import {data, useStyles} from "../constants/constants";
import {withStyles} from "@material-ui/core/styles";
import Template from "./Template";
import img from "../assets/WebMoney_48px.png";
import FolderIcon from '@material-ui/icons/Folder';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import "./style.css"
import {Tooltip,  Progress } from 'antd';
import FormatLineSpacingIcon from '@material-ui/icons/FormatLineSpacing';



class Home extends Component {

    state = {
        data: data,
        targetItem: undefined,
    }

    changeTargetItem = targetItem => this.setState({ targetItem })

    render() {


        const { classes } = this.props;

        const title = 'Tableau de bord -  Arrêtés des comptes'
        const subTitle = 'Bienvenue sur cette interface qui vous permet d\'effectuer vos arrêtés de comptes.'

        const content = (
            <>
               <Grid container justify="center"  alignItems="center" spacing={3}>
                   <Grid item xs={12} md={2}>
                       <Paper className={classes.paper}>
                           <Grid container >
                               <Grid item xs={12} md={12}>
                                   <FolderIcon color="primary" className="icon-file" style= {{ fontSize: 70}} />
                                   <MoreVertIcon className="icon-file_more" fontSize="medium" />
                               </Grid>
                               <Grid item xs={12} md={12}>
                                   <span className="text-file">Total</span>
                               </Grid>
                               <Box mt={5}></Box>
                               <Grid item xs={12} md={12}>
                                   <span className="number"> 500 fichiers</span>
                               </Grid>
                           </Grid>
                       </Paper>
                   </Grid>
                   <Grid item xs={12} md={2}>
                       <Paper className={classes.paper}>
                           <Grid container >
                               <Grid item  xs={12} md={12}>
                                   <FolderIcon color="secondary" className="icon-file" style= {{ fontSize: 70}} />
                                   <MoreVertIcon className="icon-file_more" fontSize="medium" />
                               </Grid>
                               <Grid item xs={12} md={12}>
                            <span className="text-file">
                                <span className="histo">
                                    Historiques
                                </span>
                            </span>
                               </Grid>
                               <Box mt={5}></Box>
                               <Grid item xs={12} md={12}>
                                   <span className="number"> 500 fichiers</span>
                               </Grid>
                           </Grid>
                       </Paper>
                   </Grid>
                   <Grid item xs={12} md={2}>
                       <Paper className={classes.paper}>
                           <Grid container >
                               <Grid item xs={12} md={12}>
                                   <FolderIcon className="icon-file" style= {{ fontSize: 70, color: "#00695c"}} />
                                   <MoreVertIcon className="icon-file_more" fontSize="medium" />
                               </Grid>
                               <Grid item xs={12} md={12}>
                                <span className="text-file">
                                     <span className="solde">
                                        Soldes
                                     </span>
                                </span>
                               </Grid>
                               <Box mt={5}></Box>
                               <Grid item xs={12} md={12}>
                                   <span className="number"> 500 fichiers</span>
                               </Grid>
                           </Grid>
                       </Paper>
                   </Grid>
                   <Grid item xs={12} md={2}>
                       <Paper className={classes.paper}>
                           <Grid container >
                               <Grid item xs={12} md={12}>
                                   <FolderIcon className="icon-file" style= {{ fontSize: 70, color: "#ab47bc"}} />
                                   <MoreVertIcon className="icon-file_more" fontSize="medium" />
                               </Grid>
                               <Grid item xs={12} md={12}>
                                <span className="text-file">
                                     <span className="journal">
                                        Journaux
                                     </span>
                                </span>
                               </Grid>
                               <Box mt={5}></Box>
                               <Grid item xs={12} md={12}>
                                   <span className="number"> 500 fichiers</span>
                               </Grid>
                           </Grid>
                       </Paper>
                   </Grid>
                   <Grid item xs={12} md={2}>
                       <Paper className={classes.paper}>
                           <Grid container >
                               <Grid item xs={12} md={12}>
                                   <FolderIcon className="icon-file" style= {{ fontSize: 70, color: "#616161"}} />
                                   <MoreVertIcon className="icon-file_more" fontSize="medium" />
                               </Grid>
                               <Grid item xs={12} md={12}>
                                <span className="text-file">
                                     <span className="autorisation">
                                        Autorisations
                                     </span>
                                </span>
                               </Grid>
                               <Box mt={5}></Box>
                               <Grid item xs={12} md={12}>
                                   <span className="number"> 500 fichiers</span>
                               </Grid>
                           </Grid>
                       </Paper>
                   </Grid>

                   <Grid item md={4}>
                       <Paper className={classes.paper}>
                           <Grid container  spacing={1}>
                               <Grid item md={5}>
                                   <Tooltip title="Pourcentage d'occupation disque">
                                       <Progress percent={60}  type="circle" />
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
                                           <span className="number-space">65 <span>Gb</span>/ 100 <span>Gb</span> </span>
                                       </Grid>
                                   </Grid>
                               </Grid>
                           </Grid>
                       </Paper>
                   </Grid>
                   <Grid item md={4}>
                       <Paper className={classes.paper}>
                           <Grid container  spacing={1}>
                               <Grid item md={5}>
                                    <div className="box-simulation">
                                        <FormatLineSpacingIcon style={{ color: "white", fontSize: "40px" }} />
                                    </div>
                               </Grid>
                               <Grid item md={6}>
                                   <Grid container >
                                       <Grid item md={12}>
                                           <span className="title-sumlation">
                                                Simulations éffectuées
                                           </span>
                                       </Grid>
                                       <Grid item md={12}>
                                           <Box mt={2}></Box>
                                           <span className="number-space-simulation"> 10 555 </span>
                                       </Grid>
                                   </Grid>
                               </Grid>
                           </Grid>
                       </Paper>
                   </Grid>
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


export default withStyles(useStyles, {withTheme: true})(Home)

