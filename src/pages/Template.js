import React, { Component  } from 'react'
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import { logout } from "../actions/auth";
import { compose } from "redux";
import {withStyles} from "@material-ui/core/styles";
import { useStyles} from "../constants/constants";
import {  Redirect } from "react-router-dom";
import {
    AppBar,
    Box,
    Divider,
    Drawer, Grid,
    IconButton,
     List, ListItem, ListItemIcon,
    Card, CardHeader,
    Avatar,
    Toolbar,
    Typography,
    Collapse
} from "@material-ui/core";
import {
    ExpandLess,ExpandMore,
   CloudUpload as CloudUploadIcon,
    Menu as MenuIcon,
    More as MoreIcon,
    SettingsPower as SettingsPowerIcon,
} from "@material-ui/icons";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import HistoryIcon from '@material-ui/icons/History';
import AccountCircle from "@material-ui/icons/AccountCircle";
import clsx from "clsx";
import ListItemText from "@material-ui/core/ListItemText";
import Settings from "@material-ui/icons/Settings";
import { pointer } from "../constants/constants"
import HomeIcon from '@material-ui/icons/Home';
import { Link } from 'react-router-dom'
import { BackTop } from "antd";
import { VerticalAlignTopOutlined } from '@ant-design/icons';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import AssessmentIcon from '@material-ui/icons/Assessment';

class Template extends Component {

    static propTypes = {
        logout: PropTypes.func.isRequired,
        auth: PropTypes.object.isRequired
    }

    state = {
        open: true,
        auth: true,
        mobileMoreAnchorEl: null,
        anchorEl: null,
        redirect: null,
        openNav: false,
        openNavGroup: false,
        openNavUnique: false,
        openNavStats: false
    }

     handleClick = () => {
        this.setState((prev) => ({openNav: !prev.openNav}));
    };

    handleClickGroup = () => {
        this.setState((prev) => ({openNavGroup: !prev.openNavGroup}));
    };

    handleClickUnique = () => {
        this.setState((prev) => ({openNavUnique: !prev.openNavUnique}));
    };

    render() {

        if (this.state.redirect){
            return <Redirect to={this.state.redirect} />
        }


        // datas
        const { classes } = this.props;

        // const theme = this.props.theme;
        let type = "gfc"

        if (typeof this.props.auth.user.user !== "undefined") type = this.props.auth.user.user.type
        else type = this.props.auth.user.type

        const  {open} = this.state;

        const handleMobileMenuOpen = (event) => {
            this.setState({
                mobileMoreAnchorEl: event.currentTarget
            })
        };

        const style = {
            height: 40,
            width: 40,
            lineHeight: '40px',
            borderRadius: "50%",
            backgroundColor: '#f5222d',
            color: '#fff',
            textAlign: 'center',
            fontSize: 20,
        };

        const menuId = 'primary-search-account-menu';

        const handleDrawerOpen = () => {
            this.setState({
                open: true
            })
        };


        const handleProfileMenuOpen = (event) => {
            this.setState({
                anchorEl: event.currentTarget
            })
        };

        const mobileMenuId = 'primary-search-account-menu-mobile';

        const appTitle = "Automatisation du calcul des arrêtés des comptes"

        const loadItem = type === "dcpo" ? <ListItem className="link-component" button component={Link} to="/FileUpload" style={pointer}  selected={this.props.component['selected'] === 1} >
            <ListItemIcon><CloudUploadIcon style={{ color: "white" }} /></ListItemIcon>
            <ListItemText primary="Charger les fichiers" />
        </ListItem>: <></>


        return (
            <Grid container spacing={0}>
                <Grid item md={12}>
                    <AppBar style={{ backgroundColor: "#f01818"}}  className={classes.appBar}>
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                className={clsx(classes.menuButton, {
                                    [classes.hide]: open,
                                })}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h5" className={classes.title} noWrap>
                                { appTitle }
                            </Typography>
                            <div className={classes.sectionDesktop}>
                                <IconButton
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-controls={menuId}
                                    aria-haspopup="true"
                                    onClick={handleProfileMenuOpen}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                                <IconButton
                                    onClick={this.props.logout}
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-controls={menuId}
                                    aria-haspopup="true"
                                    color="inherit"
                                >
                                    <SettingsPowerIcon />
                                </IconButton>
                            </div>
                            <div className={classes.sectionMobile}>
                                <IconButton
                                    aria-label="show more"
                                    aria-controls={mobileMenuId}
                                    aria-haspopup="true"
                                    onClick={handleMobileMenuOpen}
                                    color="inherit"
                                >
                                    <MoreIcon />
                                </IconButton>
                            </div>
                        </Toolbar>
                    </AppBar>
                    <div className={classes.toolbar} />
                </Grid>
                <Grid item md={2}>
                    <Drawer variant="permanent" className={classes.drawer} classes={{paper: classes.drawerPaper,}}>
                        <div className={classes.toolbar}>
                            {/*<img  src={logo} alt="Afriland" className="" style={{ maxWidth: "70%", }} />*/}
                            {/*<IconButton onClick={handleDrawerClose}>*/}
                            {/*    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <CloseIcon />}*/}
                            {/*</IconButton>*/}
                        </div>
                        {/*<Divider />*/}
                        <List>
                            <ListItem className="link-component" button component={Link} to="/" style={pointer} selected={this.props.component['selected'] === 0}>
                                <ListItemIcon><HomeIcon style={{ color: "white" }}/></ListItemIcon>
                                <ListItemText primary="Tableau de bord"/>
                            </ListItem>
                            {loadItem}
                            <ListItem  className="link-component" button component={Link} to="/ConformeUnique" style={pointer}  selected={this.props.component['selected'] === 13} >
                                <ListItemIcon><AssessmentIcon style={{ color: "white" }}/></ListItemIcon>
                                <ListItemText primary="Calcul unique" />
                            </ListItem>
                            <List>
                                <ListItem className="link-component" button onClick={this.handleClickGroup}>
                                    <ListItemIcon>
                                        <AcUnitIcon style={{ color: "white" }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Calcul groupés" />
                                    {this.state.openNavGroup ? <ExpandLess /> : <ExpandMore />}
                                </ListItem>
                                <Collapse in={this.state.openNavGroup} timeout="auto" unmountOnExit>
                                    <List style={{ paddingLeft: "10px", fontSize: "2px"}} component="div" disablePadding>
                                        <ListItem  className="link-component" button component={Link} to="/ConformeCourant" style={pointer}  selected={this.props.component['selected'] === 2} >
                                            <ListItemIcon><AcUnitIcon style={{ color: "white" }}/></ListItemIcon>
                                            <ListItemText primary="Comptes Courants" />
                                        </ListItem>
                                        <ListItem className="link-component"  button component={Link} to="/ConformeEpargne" style={pointer}  selected={this.props.component['selected'] === 3} >
                                            <ListItemIcon><AccountBalanceWalletIcon style={{ color: "white" }} /></ListItemIcon>
                                            <ListItemText primary="Comptes Epargne" />
                                        </ListItem>
                                    </List>
                                </Collapse>
                            </List>
                        </List>
                        <Divider />
                        <List>
                            <ListItem className="link-component" button onClick={this.handleClick}>
                                <ListItemIcon>
                                    <Settings style={{ color: "white" }} />
                                </ListItemIcon>
                                <ListItemText primary="Paramètres" />
                                {this.state.openNav ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={this.state.openNav} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItem className="link-component" button component={Link} to="/Courantconfig" style={pointer} selected={this.props.component['selected'] === 6}  >
                                        <ListItemIcon>
                                            <HistoryIcon style={{ color: "white" }} />
                                        </ListItemIcon>
                                        <ListItemText primary="Courants" />
                                    </ListItem>
                                    <ListItem className="link-component" button component={Link} to="/Epargneconfig" style={pointer} selected={this.props.component['selected'] === 7 }>
                                        <ListItemIcon>
                                            <AttachMoneyIcon style={{ color: "white" }} />
                                        </ListItemIcon>
                                        <ListItemText primary="Epargne" />
                                    </ListItem>
                                </List>
                            </Collapse>
                            <ListItem className="link-component" button component={Link} to="/Help" style={pointer} selected={this.props.component['selected'] === 12} >
                                <ListItemIcon><ContactSupportIcon style={{ color: "white" }} /></ListItemIcon>
                                <ListItemText primary="Aide" />
                            </ListItem>
                        </List>
                    </Drawer>
                </Grid>
                <Grid item md={10} >
                    <div className="content">
                        <Grid container justify="center" direction="column" alignItems="center">
                            <div  className="custom_titled_header">
                                <Grid item xs={12}>

                                <Card className="card_header_title">
                                    <CardHeader
                                        avatar={
                                            <Avatar aria-label="recipe" className={classes.avatar}>
                                                {this.props.component['title'][0]}
                                            </Avatar>
                                        }
                                        action={
                                            <IconButton aria-label="settings">
                                                <img  src={this.props.component['img']} alt="Dashboard" />
                                            </IconButton>
                                        }
                                        title={this.props.component['title']}
                                        subheader={this.props.component['subTitle']}

                                        titleTypographyProps = {{ variant: "h5"}}
                                    />
                                </Card>
                            </Grid>
                            </div>
                            <Box mb={5}>
                                <Divider  />
                            </Box>
                        </Grid>
                        {this.props.component['content']}
                    </div>
                    <BackTop>
                        <div style={style}>
                            <VerticalAlignTopOutlined />
                        </div>
                    </BackTop>
                </Grid>
            </Grid>

        );
    }
}

const mapStateToProps = state => ({
    logout: state.logout,
    auth: state.auth
})

export default compose(withStyles(useStyles, {withTheme: true}), connect(mapStateToProps, { logout }),)(Template)
