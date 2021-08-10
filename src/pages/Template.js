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
    Badge, Box,
    CssBaseline,
    Divider,
    Drawer, Grid,
    IconButton,
     List, ListItem, ListItemIcon,
    Card, CardHeader,
    Avatar,
    Toolbar,
    Typography
} from "@material-ui/core";
import {
    ChevronRight as ChevronRightIcon, Close as CloseIcon, CloudUpload as CloudUploadIcon, Edit as EditIcon,
    Mail as MailIcon,
    Menu as MenuIcon,
    More as MoreIcon,
    Notifications as NotificationsIcon, SettingsPower as SettingsPowerIcon,
} from "@material-ui/icons";

import AccountCircle from "@material-ui/icons/AccountCircle";
import clsx from "clsx";
import logo from "../assets/newLogo.png";
import ListItemText from "@material-ui/core/ListItemText";
import Settings from "@material-ui/icons/Settings";
import { pointer } from "../constants/constants"
import HomeIcon from '@material-ui/icons/Home';
import { Link } from 'react-router-dom'
import { BackTop } from "antd";
import { VerticalAlignTopOutlined } from '@ant-design/icons';
import ViewQuiltIcon from '@material-ui/icons/ViewQuilt';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';


class Template extends Component {

    static propTypes = {
        logout: PropTypes.func.isRequired
    }

    state = {
        open: false,
        auth: true,
        mobileMoreAnchorEl: null,
        anchorEl: null,
        redirect: null
    }

    render() {

        if (this.state.redirect){
            return <Redirect to={this.state.redirect} />
        }

        // datas
        const { classes } = this.props;

        const theme = this.props.theme;
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
        // const handleMobileMenuClose = () => {
        //     this.setState({
        //         mobileMoreAnchorEl: null
        //     })
        // };
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
        // const renderMobileMenu = (
        //     <Menu
        //         anchorEl={mobileMoreAnchorEl}
        //         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        //         id={mobileMenuId}
        //         keepMounted
        //         transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        //         open={isMobileMenuOpen}
        //         onClose={handleMobileMenuClose}
        //     >
        //         <MenuItem>
        //             <IconButton aria-label="show 4 new mails" color="inherit">
        //                 <Badge badgeContent={4} color="#F23937">
        //                     <MailIcon />
        //                 </Badge>
        //             </IconButton>
        //             <p>Messages</p>
        //         </MenuItem>
        //         <MenuItem>
        //             <IconButton aria-label="show 11 new notifications" color="inherit">
        //                 <Badge badgeContent={11} color="secondary">
        //                     <NotificationsIcon />
        //                 </Badge>
        //             </IconButton>
        //             <p>Notifications</p>
        //         </MenuItem>
        //         <MenuItem onClick={handleProfileMenuOpen}>
        //             <IconButton
        //                 aria-label="account of current user"
        //                 aria-controls="primary-search-account-menu"
        //                 aria-haspopup="true"
        //                 color="inherit"
        //             >
        //                 <AccountCircle />
        //             </IconButton>
        //             <p>Profile</p>
        //         </MenuItem>
        //     </Menu>
        // );

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
                        <ListItem button component={Link} to="/" style={pointer} selected={this.props.component['selected'] === 0}>
                            <ListItemIcon><HomeIcon/></ListItemIcon>
                            <ListItemText primary="Accueil"/>
                        </ListItem>
                        <ListItem button component={Link} to="/FileUpload" style={pointer}  selected={this.props.component['selected'] === 1} >
                            <ListItemIcon><CloudUploadIcon/></ListItemIcon>
                            <ListItemText primary="Charger les fichiers" />
                        </ListItem>
                        {/*<ListItem  button component={Link} to="/ConformeCourant" style={pointer}  selected={this.props.component['selected'] === 2} >*/}
                        {/*<TreeItem nodeId="1" label="Applications">*/}
                        {/*    <TreeItem nodeId="2" label="Calendar" />*/}
                        {/*    <TreeItem nodeId="3" label="Chrome" />*/}
                        {/*    <TreeItem nodeId="4" label="Webstorm" />*/}
                        {/*</TreeItem>*/}
                        {/*</ListItem>*/}
                        <ListItem  button component={Link} to="/ConformeCourant" style={pointer}  selected={this.props.component['selected'] === 2} >
                            <ListItemIcon><ConfirmationNumberIcon/></ListItemIcon>
                            <ListItemText primary="Conforme courant" />
                        </ListItem>
                        <ListItem  button component={Link} to="/ConformeEpargne" style={pointer}  selected={this.props.component['selected'] === 3} >
                            <ListItemIcon><ConfirmationNumberIcon/></ListItemIcon>
                            <ListItemText primary="Conforme Epargne" />
                        </ListItem>
                        {/*<ListItem  button component={Link} to="/CalculRegularisation" style={pointer}  selected={this.props.component['selected'] === 4} >*/}
                        {/*    <ListItemIcon><ViewComfyIcon/></ListItemIcon>*/}
                        {/*    <ListItemText primary="Arrêté régularisation" />*/}
                        {/*</ListItem>*/}
                        <ListItem  button component={Link} to="#" style={pointer} selected={this.props.component['selected'] === 5}>
                            <ListItemIcon><ViewQuiltIcon /></ListItemIcon>
                            <ListItemText primary="Statistiques" />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        {['Changer mot de passe', 'Paramètres',].map((text, index) => (
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
                        <Box mb={2}></Box>

                        <Grid item xs={12} >
                            <div  className="custom_titled_header">

                                <Grid container spacing={2} justify="center" direction="column" alignItems="center">
                                    {/*<Grid item xs={3}>*/}
                                    {/*    /!*<img  src={icon_svg} alt="Dashboard" className="" style={{ maxWidth: "30%"}} />*!/*/}
                                    {/*</Grid>*/}
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

                                        {/*<Box mt={5} mb={1} >*/}
                                        {/*    <Typography variant="h4" color="textSecondary"  className="header_title">*/}
                                        {/*        {this.props.component['title']}*/}
                                        {/*    </Typography>*/}


                                        {/*    <Typography variant="paragraph"  color="white" >*/}
                                        {/*        {this.props.component['subTitle']}*/}
                                        {/*    </Typography>*/}
                                        {/*</Box>*/}
                                        {/*<Box mb={4}>*/}

                                        {/*    /!*<Typography variant="p"  display="block">*!/*/}
                                        {/*    /!*    Accédez aux foncionnalités sur le pannel de gauche*!/*/}
                                        {/*    /!*</Typography>*!/*/}
                                        {/*</Box>*/}
                                    </Grid>
                                </Grid>
                                {/*<Box mb={2}>*/}
                                {/*    <Divider  />*/}
                                {/*</Box>*/}
                            </div>
                        </Grid>
                            {this.props.component['content']}
                        <BackTop>
                            <div style={style}>
                                <VerticalAlignTopOutlined />
                            </div>
                        </BackTop>
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