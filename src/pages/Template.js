import React, { Component  } from 'react'
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import { logout } from "../actions/auth";
import { compose } from "redux";
import {withStyles} from "@material-ui/core/styles";
import { useStyles} from "../constants/constants";
import {
    AppBar,
    Badge, Box,
    CssBaseline,
    Divider,
    Drawer, Grid,
    IconButton,
     List, ListItem, ListItemIcon,
    Menu,
    Toolbar,
    Typography
} from "@material-ui/core";
import {
    AccountTree as AccountTreeIcon,
    ChevronRight as ChevronRightIcon, Close as CloseIcon, CloudUpload as CloudUploadIcon, Edit as EditIcon,
    Mail as MailIcon,
    Menu as MenuIcon,
    Menu as MenuItem, More as MoreIcon,
    Notifications as NotificationsIcon, SettingsPower as SettingsPowerIcon
} from "@material-ui/icons";
import AccountCircle from "@material-ui/icons/AccountCircle";
import clsx from "clsx";
import logo from "../assets/newLogo.png";
import ListItemText from "@material-ui/core/ListItemText";
import Settings from "@material-ui/icons/Settings";
import { Link } from 'react-router-dom'

class Template extends Component {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        logout: PropTypes.func.isRequired
    }

    state = {
        open: false,
        auth: true,
        mobileMoreAnchorEl: null,
        anchorEl: null,
    }


    render() {

        // datas

        const { classes } = this.props;

        const theme = this.props.theme;
        const  {open, auth, mobileMoreAnchorEl, anchorEl, data: chartData, targetItem} = this.state;
        // const [auth, setAuth] = React.useState(true);
        // const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
        // const [anchorEl, setAnchorEl] = React.useState(null);


        const isMenuOpen = Boolean(anchorEl);
        const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

        const handleMobileMenuOpen = (event) => {
            this.setState({
                mobileMoreAnchorEl: event.currentTarget
            })
        };

        const menuId = 'primary-search-account-menu';

        const handleDrawerOpen = () => {
            this.setState({
                open: true
            })
        };

        const handleDrawerClose = () => {
            this.setState({
                open: false
            })
        };

        // const handleChange = (event) => {
        //     this.setState({
        //         auth: event.target.checked
        //     })
        // };
        //
        const handleMobileMenuClose = () => {
            this.setState({
                mobileMoreAnchorEl: null
            })
        };
        //
        // const handleMenuClose = () => {
        //     this.setState({
        //         anchorEl: null
        //     })
        //     handleMobileMenuClose();
        // };

        const handleProfileMenuOpen = (event) => {
            this.setState({
                anchorEl: event.currentTarget
            })
        };

        const mobileMenuId = 'primary-search-account-menu-mobile';
        const renderMobileMenu = (
            <Menu
                anchorEl={mobileMoreAnchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                id={mobileMenuId}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMobileMenuOpen}
                onClose={handleMobileMenuClose}
            >
                <MenuItem>
                    <IconButton aria-label="show 4 new mails" color="inherit">
                        <Badge badgeContent={4} color="#F23937">
                            <MailIcon />
                        </Badge>
                    </IconButton>
                    <p>Messages</p>
                </MenuItem>
                <MenuItem>
                    <IconButton aria-label="show 11 new notifications" color="inherit">
                        <Badge badgeContent={11} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <p>Notifications</p>
                </MenuItem>
                <MenuItem onClick={handleProfileMenuOpen}>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="primary-search-account-menu"
                        aria-haspopup="true"
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <p>Profile</p>
                </MenuItem>
            </Menu>
        );

        // End datas

        const appTitle = "Automatisation Arrêtés des comptes"


        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    color="secondary"
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >

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
                            <IconButton aria-label="show 4 new mails" color="inherit">
                                <Badge badgeContent={4} color="secondary">
                                    <MailIcon />
                                </Badge>
                            </IconButton>
                            <IconButton aria-label="show 17 new notifications" color="inherit">
                                <Badge badgeContent={17} color="secondary">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
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
                <Drawer
                    variant="permanent"
                    className={clsx(classes.drawer, {
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    })}
                    classes={{
                        paper: clsx({
                            [classes.drawerOpen]: open,
                            [classes.drawerClose]: !open,
                        }),
                    }}
                >
                    <div className={classes.toolbar}>
                        <img  src={logo} alt="Afriland" className="" style={{ maxWidth: "80%"}} />
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <CloseIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        {[<Link to ="/FileUpload">Charger les fichiers</Link>, 'Lancer les calculs', 'Statistiques agence', 'Statistiques comptes'].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>{index % 2 === 0 ? <CloudUploadIcon /> : <AccountTreeIcon />}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <List>
                        {['Edit my profile', 'Settings',].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>{index % 2 === 0 ? <EditIcon /> : <Settings />}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Box
                                mt={5}
                                mb={1}
                            >
                                <Typography variant="h4" color="textSecondary" className="header_title">
                                    {this.props.component['title']}
                                </Typography>
                            </Box>
                            <Box
                                mb={4}
                            >
                                <Typography variant="inherit"  display="block" color="textSecondary" >
                                    {this.props.component['subTitle']}
                                </Typography>
                                {/*<Typography variant="p"  display="block">*/}
                                {/*    Accédez aux foncionnalités sur le pannel de gauche*/}
                                {/*</Typography>*/}
                            </Box>
                        </Grid>

                        {this.props.component['content']}


                    </Grid>
                </main>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    logout: state.logout
})

export default compose(withStyles(useStyles, {withTheme: true}), connect(mapStateToProps, { logout }),)(Template)
