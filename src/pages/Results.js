import React, { Component } from 'react'
import {withStyles} from "@material-ui/core/styles";
import {useStyles} from "../constants/constants";
import {Grid, Box} from "@material-ui/core";
import Template from "./Template";
// import MUIDataTable from "mui-datatables";
import img from "../assets/accounting_80px.png";
import ControlledSelectionGrid from "./FullSelected";
import { Alert } from 'antd';
import { Pagination } from 'antd';
import ReactExport from "react-export-excel";
import GetAppIcon from '@material-ui/icons/GetApp';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';


const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;



class Results extends Component {

    state = {
        offset: 0,
        elementsPerPage: 12,  //change as per your need
        pagesCount: 1,
        allElements: [],
        totalElementsCount: 0,
        currentPageElements: []
    }

    componentDidMount() {
        const datas = this.props.history.location.state.data
        this.setState({
            allElements: datas,
            totalElementsCount: datas.length,
            pagesCount: Math.ceil(datas.length / this.state.elementsPerPage),
            currentPageElements : datas.slice(this.state.offset, this.state.offset + this.state.elementsPerPage)
        })
    }

    handlePageClick = (pageNumber) => {
        const { elementsPerPage } = this.state;
        const currentPage = pageNumber - 1;
        const offset = currentPage * elementsPerPage;
        this.setState({
            offset,
            currentPageElements : this.state.allElements.slice(this.state.offset, this.state.offset + this.state.elementsPerPage)
        })
    }



    render() {

        // Get current date
        let today = new Date()
        let complete = today.toUTCString()
        complete = complete.replaceAll(":", "-")
        complete = complete.replaceAll(",", "")
        complete = complete.replace("GMT", "")

        // const { classes } = this.props;
        const { totalElementsCount, allElements, elementsPerPage, currentPageElements } = this.state;

        // const options = {
        //     print: true,
        //     download: true,
        //     filter: true,
        //     rowsPerPage: 100,
        // }


        const title = 'Résultats'
        const subTitle = 'Résultats des calculs des différents arrêtés'

        const dataResults = this.props.history.location.state.data

        console.log(dataResults)
        const content = (
           <>
               <Grid container justify="center" alignContent="center" direction>
                   <Grid item md={12} xs={12}>
                       { allElements.length !== 0 &&
                           <>
                           <ExcelFile element={<Button variant="contained" color="secondary">
                               Télécharger le résultat
                           </Button>}
                                      filename={`Résultat calcul -- ${complete}`}
                           >
                               {allElements.map( (dataSheet, key) => (
                                        <ExcelSheet data={dataSheet["first"]} name={`${dataSheet["account"]['code_agence']}-${dataSheet["account"]['num_compte']}`}>
                                           <ExcelColumn label="DATE COMPTABLE" value="CPTABLE"/>
                                           <ExcelColumn label="DATE DE VALEUR" value="VALEUR"/>
                                           <ExcelColumn label="LIBELLES" value="LIBELLES"/>
                                           <ExcelColumn label="MOUVEMENTS DEBIT" value="DEBIT_MVTS"/>
                                           <ExcelColumn label="MOUVEMENTS CREDIT" value="CREDIT_MVTS"/>
                                           <ExcelColumn label="SOLDES" value="SOLDES"/>
                                           <ExcelColumn label="SOLDES JOUR" value="SOLDE_JOUR"/>
                                           <ExcelColumn label="NOMBRE DE JOURS" value="jrs"/>
                                           <ExcelColumn label="NOMBRES DEBIT" value="DEBITS_NBR"/>
                                           <ExcelColumn label="NOMBRES CREDIT" value="CREDIT_NBR"/>
                                           <ExcelColumn label="SOLDES" value="SOLDES_NBR"/>
                                           <ExcelColumn label="MOUVEMENTS 1" value="MVTS_13"/>
                                           <ExcelColumn label="MOUVEMENTS 2" value="MVTS_14" />
                                       </ExcelSheet>
                                       ))}
                           </ExcelFile>
                           </>
                       }
                   </Grid>
                   <Grid item md={8} xs={8}>
                       <Box mt={5} mb={5}>
                           <Pagination defaultCurrent={1}  pageSize={elementsPerPage} showSizeChanger={false} onChange={this.handlePageClick}  total={totalElementsCount} />
                       </Box>
                   </Grid>
                   {currentPageElements.map( (dataSec, key) => (
                        <Grid item md={10} xs={9}>
                            <Grid container spacing={1}>
                                <Grid item md={11}>
                                    <Alert message={`Numéro de compte: ${dataSec["account"]['num_compte']}`} type="info" showIcon />
                                </Grid>
                                <Grid md={1}>
                                    <ExcelFile element={
                                        <IconButton variant="outlined" color="primary" aria-label="Download">
                                            <GetAppIcon />
                                        </IconButton>
                                    }
                                    filename={`${dataSec["account"]['code_agence']}-${dataSec["account"]['num_compte']}`}
                                    >
                                        <ExcelSheet data={dataSec["first"]} name={`${dataSec["account"]['code_agence']}-${dataSec["account"]['num_compte']}`}>
                                            <ExcelColumn label="DATE COMPTABLE" value="CPTABLE"/>
                                            <ExcelColumn label="DATE DE VALEUR" value="VALEUR"/>
                                            <ExcelColumn label="LIBELLES" value="LIBELLES"/>
                                            <ExcelColumn label="MOUVEMENTS DEBIT" value="DEBIT_MVTS"/>
                                            <ExcelColumn label="MOUVEMENTS CREDIT" value="CREDIT_MVTS"/>
                                            <ExcelColumn label="SOLDES" value="SOLDES"/>
                                            <ExcelColumn label="SOLDES JOUR" value="SOLDE_JOUR"/>
                                            <ExcelColumn label="NOMBRE DE JOURS" value="jrs"/>
                                            <ExcelColumn label="NOMBRES DEBIT" value="DEBITS_NBR"/>
                                            <ExcelColumn label="NOMBRES CREDIT" value="CREDIT_NBR"/>
                                            <ExcelColumn label="SOLDES" value="SOLDES_NBR"/>
                                            <ExcelColumn label="MOUVEMENTS 1" value="MVTS_13"/>
                                            <ExcelColumn label="MOUVEMENTS 2" value="MVTS_14" />
                                        </ExcelSheet>
                                    </ExcelFile>
                                </Grid>
                            </Grid>
                            <Box mb={2}></Box>
                            <Grid item md={12}>
                                <ControlledSelectionGrid data={dataSec["second"]} selected_accounts={[]} index_selected={[]}
                                                         setAccount={() => {}} choice="results" check={false}  />
                            </Grid>
                            </Grid>
                   )) }
               </Grid>
           </>
        )

        const component = {
            'title': title,
            'subTitle': subTitle,
            'content': content,
            "img": img
        }

        return (
            <Template component={component} />
        );
    }
}
export default withStyles(useStyles, {withTheme: true})(Results)