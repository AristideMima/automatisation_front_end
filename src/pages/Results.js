import React, { Component } from 'react'
import {withStyles} from "@material-ui/core/styles";
import {useStyles} from "../constants/constants";
import {Grid} from "@material-ui/core";
import Template from "./Template";
import MUIDataTable from "mui-datatables";

class Results extends Component {

    constructor(props) {
        super(props);

        // console.log(this.props.history.location.state)
    }

    render() {
        const { classes } = this.props;

        const options = {
            print: true,
            download: true,
            filter: true,
            rowsPerPage: 100,
        }

        const columns  = [
            {
                name: "CPTABLE",
                label: "DATE COMPTABLE",
                options: {
                    filter: true,
                    sort: true,

                }
            },
            {
                name: "VALEUR",
                label: "DATE VALEUR",
                options: {
                    filter: true,
                    sort: true
                }
            },

            {
                name: "LIBELLES",
                label: "LIBELLES",
                options: {
                    filter: true,
                    sort: true
                }
            },
			{
                name: "DEBIT_MVTS",
                label: "MOUVEMENT DEBITS",
                options: {
                    filter: true,
                    sort: true
                }
            },
            {
                name: "CREDIT_MVTS",
                label: "MOUVEMENT CREDITS",
                options: {
                    filter: true,
                    sort: true
                }
            },
            {
                name: "SOLDES",
                label: "SOLDES",
                options: {
                    filter: true,
                    sort: true
                }
            },
            {
                name: "SOLDE_JOUR",
                label: "SOLDE JOURS",
                options: {
                    filter: true,
                    sort: true
                }
            },
            {
                name: "jrs",
                label: "NOMBRE DE JOURS",
                options: {
                    filter: true,
                    sort: true
                }
            },
            {
                name: "CREDIT_NBR",
                label: "NOMBRE CREDITS",
                options: {
                    filter: true,
                    sort: true
                }
            },
            {
                name: "DEBITS_NBR",
                label: "NOMBRE DEBIT",
                options: {
                    filter: true,
                    sort: true
                }
            },
            {
                name: "SOLDES_NBR",
                label: "SOLDE",
                options: {
                    filter: true,
                    sort: true
                }
            },
            {
                name: "MVTS_13",
                label: "MOUVEMENT 13.5%",
                options: {
                    filter: true,
                    sort: true
                }
            },
            {
                name: "MVTS_14",
                label: "MOUVEMENT 14.5%",
                options: {
                    filter: true,
                    sort: true
                }
            }
        ]

        // const columns = [
        //     {
        //         name: "code_operation",
        //         label: "Code opération",
        //         options: {
        //             filter: true,
        //             sort: true
        //         }
        //     }
        // ]


        const title = 'Résultats'
        const subTitle = 'Résultats des calculs des différents arrêtés'

        console.log(this.props.history.location.state.data[0])

        const content = (
            <div className={classes.root}>
                <Grid container justify="left" >
                   <Grid item md={10}>
                       <MUIDataTable
                           title={"Résultats arrêté - " + this.props.history.location.state.data[0].account}
                           data={this.props.history.location.state.data[0].first}
                           columns={columns}
                           options={options}
                       />
                   </Grid>
                </Grid>
            </div>
        )

        const component = {
            'title': title,
            'subTitle': subTitle,
            'content': content
        }

        return (
            <Template component={component} />
        );
    }
}
export default withStyles(useStyles, {withTheme: true})(Results)
