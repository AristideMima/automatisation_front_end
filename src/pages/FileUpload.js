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
import {data, gridContainerStyle, useStyles} from "../constants/constants";
import {compose} from "redux";
import {withStyles} from "@material-ui/core/styles";
import Template from "./Template";
import {DropzoneDialog} from 'material-ui-dropzone'
import Button from '@material-ui/core/Button';
import { gridUploadStyle } from '../constants/constants'


class FileUpload extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            files: []
        };
    }

    handleClose() {
        this.setState({
            open: false
        });
    }

    handleSave(files) {
        //Saving files to state for further use and closing Modal.
        this.setState({
            files: files,
            open: false
        });
    }

    handleOpen() {
        this.setState({
            open: true,
        });
    }

    render() {




        const title = 'Upload des fchiers'
        const subTitle = 'Cliquez sur l\'icone pour pouvoir envoyers les fichiers vers le serveur'

        const content = (
                <Grid
                    ontainer
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={ gridUploadStyle }
                >

                    <Grid item xs={8} md={12} >
                        <IconButton onClick={this.handleOpen.bind(this)}>
                            <CloudUploadIcon fontSize="large" />
                        </IconButton>
                        <DropzoneDialog
                            open={this.state.open}
                            onSave={this.handleSave.bind(this)}
                            acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                            showPreviews={true}
                            maxFileSize={5000000}
                            onClose={this.handleClose.bind(this)}
                        />
                    </Grid>
                </Grid>
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


export default withStyles(useStyles, {withTheme: true})(FileUpload)

