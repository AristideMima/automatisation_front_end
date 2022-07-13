// import React, { Component } from 'react'
// import {withStyles} from "@material-ui/core/styles";
// import {useStyles} from "../constants/constants";
// import {Grid, Box} from "@material-ui/core";
// import Template from "./Template";
// // import MUIDataTable from "mui-datatables";
// import img from "../assets/accounting_80px.png";
// import ControlledSelectionGrid from "./FullSelected";
// import ReactExport from "react-export-excel";
// import Button from '@material-ui/core/Button';
//
//
// const ExcelFile = ReactExport.ExcelFile;
// const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
// const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
//
//
//
// class Results extends Component {
//
//     state = {
//         offset: 0,
//         elementsPerPage: 4,  //change as per your need
//         pagesCount: 1,
//         allElements: [],
//         compressedElements: [],
//         totalElementsCount: 0,
//         currentPageElements: []
//     }
//
//     componentDidMount() {
//         const datas = this.props.history.location.state['all_data']
//         const comp = this.props.history.location.state['compressed_data']
//         console.log(this.props.history.location.state)
//         this.setState({
//             allElements: datas,
//             compressedElements: comp,
//             totalElementsCount: datas.length,
//             pagesCount: Math.ceil(datas.length / this.state.elementsPerPage),
//             currentPageElements : datas.slice(this.state.offset, this.state.offset + this.state.elementsPerPage)
//         })
//     }
//
//     handlePageClick = (pageNumber) => {
//         const { elementsPerPage } = this.state;
//         const currentPage = pageNumber - 1;
//         const offset = currentPage * elementsPerPage;
//         this.setState({
//             offset,
//             currentPageElements : this.state.allElements.slice(this.state.offset, this.state.offset + this.state.elementsPerPage)
//         })
//     }
//
//
//
//     render() {
//
//         // Get current date
//         let today = new Date()
//         let complete = today.toUTCString()
//         complete = complete.replaceAll(":", "-")
//         complete = complete.replaceAll(",", "")
//         complete = complete.replace("GMT", "")
//
//         // const { classes } = this.props;
//         const { totalElementsCount, allElements, elementsPerPage, currentPageElements, compressedElements } = this.state;
//
//
//         const title = 'Résultats'
//         const subTitle = 'Résultats des calculs des différents arrêtés'
//
//         const content = (
//            <>
//                <Grid container spacing={0} justify="center" alignContent="center" alignItems="center" >
//                    <Grid item md={10} xs={12}>
//                        <Box mt={5}></Box>
//                        <Grid container sapcing={1} justify="center" alignItems="center" direction="row">
//                             <Grid item md={5}>
//                                 { allElements.length !== 0 &&
//                                 <>
//                                     <ExcelFile element={<Button variant="contained" color="secondary">
//                                         Télécharger le résultat complet
//                                     </Button>}
//                                                filename={`Résultat calcul -- ${complete}`}
//                                     >
//                                         <ExcelSheet data={compressedElements} name={'Récaptitulatif'}>
//                                             <ExcelColumn label="Numéro de Compte" value="N° Compte"/>
//                                             <ExcelColumn label="Résultat Calcul" value="Calcul"/>
//                                             <ExcelColumn label="Résultat Journal" value="Journal"/>
//                                             <ExcelColumn label="Ecart" value="Ecart"/>
//                                         </ExcelSheet>
//                                         {allElements.map( (dataSheet, key) => (
//                                             <ExcelSheet data={dataSheet["first"]} name={`${dataSheet['account']}`}>
//                                                 <ExcelColumn label="DATE COMPTABLE" value="CPTABLE"/>
//                                                 <ExcelColumn label="DATE DE VALEUR" value="VALEUR"/>
//                                                 <ExcelColumn label="LIBELLES" value="LIBELLES"/>
//                                                 <ExcelColumn label="MOUVEMENTS DEBIT" value="DEBIT_MVTS"/>
//                                                 <ExcelColumn label="MOUVEMENTS CREDIT" value="CREDIT_MVTS"/>
//                                                 <ExcelColumn label="SOLDES" value="SOLDES"/>
//                                                 <ExcelColumn label="SOLDES JOUR" value="SOLDE_JOUR"/>
//                                                 <ExcelColumn label="NOMBRE DE JOURS" value="jrs"/>
//                                                 <ExcelColumn label="NOMBRES DEBIT" value="DEBITS_NBR"/>
//                                                 <ExcelColumn label="NOMBRES CREDIT" value="CREDIT_NBR"/>
//                                                 <ExcelColumn label="SOLDES" value="SOLDES_NBR"/>
//                                                 <ExcelColumn label="MOUVEMENTS 1" value="MVTS_13"/>
//                                                 <ExcelColumn label="MOUVEMENTS 2" value="MVTS_14" />
//                                             </ExcelSheet>
//                                         ))}
//                                     </ExcelFile>
//                                 </>
//                                 }
//                             </Grid>
//                        </Grid>
//                        <Box mb={5}></Box>
//                    </Grid>
//                         <Grid item md={10} xs={9}>
//                             <Box mb={2}></Box>
//                             <Grid container justify="center" alignItems="center">
//                                 <Grid item md={12}>
//                                     <ControlledSelectionGrid data={compressedElements} selected_accounts={[]} index_selected={[]}
//                                                              setAccount={() => {}} choice="results" check={false}  />
//                                 </Grid>
//                             </Grid>
//                             <Box mb={5}></Box>
//                         </Grid>
//                </Grid>
//            </>
//         )
//
//         const component = {
//             'title': title,
//             'subTitle': subTitle,
//             'content': content,
//             "img": img
//         }
//
//         return (
//             <Template component={component} />
//         );
//     }
// }
// export default withStyles(useStyles, {withTheme: true})(Results)