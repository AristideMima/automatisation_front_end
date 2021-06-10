import React, { Component  } from 'react'
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import { logout } from "../actions/auth";
import {
    AppBar,
    Badge, Box,
    CssBaseline,
    Divider,
    Drawer, Grid,
    IconButton,
    Link,
    List, ListItem, ListItemIcon, Menu, Paper,
    Toolbar,
    Typography
} from "@material-ui/core";
import clsx from "clsx";
import {
    AccountTree as AccountTreeIcon,
    ChevronRight as ChevronRightIcon, Close as CloseIcon, CloudUpload as CloudUploadIcon, Edit as EditIcon,
    Mail as MailIcon, Menu as MenuItem,
    Menu as MenuIcon, More as MoreIcon,
    Notifications as NotificationsIcon,
    SettingsPower as SettingsPowerIcon
} from "@material-ui/icons";
import AccountCircle from "@material-ui/icons/AccountCircle";
import logo from "../assets/newLogo.png";
import ListItemText from "@material-ui/core/ListItemText";
import Settings from "@material-ui/icons/Settings";
import {CircularProgressbar} from "react-circular-progressbar";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import {ArgumentAxis, BarSeries, Chart, Title, Tooltip, ValueAxis} from "@devexpress/dx-react-chart-material-ui";
import {Animation, EventTracker} from "@devexpress/dx-react-chart";
import {data, useStyles} from "../constants/constants";
import {compose} from "redux";
import {withStyles} from "@material-ui/core/styles";
import Template from "./Template";


class Home extends Component {

    state = {
        data: data,
        targetItem: undefined,
    }

    changeTargetItem = targetItem => this.setState({ targetItem })

    render() {

        const value = 0.83

        const { classes } = this.props;

        const { data: chartData, targetItem } = this.state

        const theme = this.props.theme;

        const title = 'Tableau de bord -  Arrêtés des comptes'
        const subTitle = 'Bienvenue sur cette interface qui vous permet d\'effectuer vos arrêtés de comptes.'

        const content = (
            <>
                <Grid item xs={12} md={4}>
                    <Paper className={classes.paper}>
                        <Grid container spacing={3}>
                            <Grid item xs={3} >
                                <CircularProgressbar value={value} maxValue={1} text={`${value * 100}%`} />;
                            </Grid>
                            <Grid item xs={7} >
                                <p>
                                    <SupervisorAccountIcon fontSize="large" />
                                </p>
                                <p>
                                    <span className="header_count" >
                                        2 760 Comptes arrêtés
                                    </span>
                                </p>
                            </Grid>
                        </Grid>
                        <Divider />
                        <Box mt={2}>
                            <Link href="#" color="cornflowerblue"  >
                                Voir plus de détails
                            </Link>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper className={classes.paper}>
                        <Grid container spacing={3}>
                            <Grid item xs={3} >
                                <CircularProgressbar value={value} maxValue={1} text={`${value * 100}%`} />;
                            </Grid>
                            <Grid item xs={7} >
                                <p>
                                    <SupervisorAccountIcon fontSize="large" />
                                </p>
                                <p>
                                    <span className="header_count" >
                                        2 760 Comptes arrêtés
                                    </span>
                                </p>
                            </Grid>
                        </Grid>
                        <Divider />
                        <Box mt={2}>
                            <Link href="#" >
                                Voir plus de détails
                            </Link>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper className={classes.paper}>
                        <Grid container spacing={3}>
                            <Grid item xs={3} >
                                <CircularProgressbar value={value} maxValue={1} text={`${value * 100}%`} />;
                            </Grid>
                            <Grid item xs={7} >
                                <p>
                                    <SupervisorAccountIcon fontSize="large" />
                                </p>
                                <p>
                                    <span className="header_count" >
                                        2 760 Comptes arrêtés
                                    </span>
                                </p>
                            </Grid>
                        </Grid>
                        <Divider />
                        <Box mt={2}>
                            <Link href="#" >
                                Voir plus de détails
                            </Link>
                        </Box>
                    </Paper>
                </Grid>

                {/* Others statistics part */}

                <Grid item md={6} xs={12}>
                    <Paper>
                        <Chart
                            data={chartData}
                            rotated
                        >
                            <ArgumentAxis />
                            <ValueAxis max={7} />

                            <BarSeries
                                valueField="population"
                                argumentField="year"
                            />
                            <Title text="Evolution montants par agence"  />
                            <Animation />
                        </Chart>
                    </Paper>
                </Grid>
                <Grid item md={6} xs={12}>
                    <Paper>
                        <Chart
                            data={chartData}
                        >
                            <ArgumentAxis />
                            <ValueAxis />

                            <BarSeries
                                valueField="population"
                                argumentField="year"
                            />
                            <Title
                                text="Croissance par agence"
                            />
                            <EventTracker />
                            <Tooltip targetItem={targetItem} onTargetItemChange={this.changeTargetItem} />
                        </Chart>
                    </Paper>
                </Grid>
            </>
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


export default withStyles(useStyles, {withTheme: true})(Home)

