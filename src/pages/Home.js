import React from 'react';
import clsx from 'clsx';
import {Box, InputBase, Paper, Grid, Container, Typography,
    AppBar, Drawer, Toolbar, List, CssBaseline, Divider, ListItem,
    Badge, Menu, Link, ListItemIcon, IconButton, FormGroup, FormControlLabel, Switch, Button, TextField, Checkbox,
    Avatar, Grow, Fade

} from "@material-ui/core";
import Settings  from '@material-ui/icons/Settings';
import ListItemText from '@material-ui/core/ListItemText';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {
    Close as CloseIcon, Menu as MenuItem, AccountTree as AccountTreeIcon,
    CloudUpload as CloudUploadIcon, Mail as MailIcon, More as MoreIcon,
    Edit as EditIcon, Inbox as InBoxIcon, Menu as MenuIcon, ChevronRight as ChevronRightIcon, LockOutlined as LockOutlinedIcon
} from '@material-ui/icons';
import logo from "../assets/newLogo.png";
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import "../assets/css/style.css"
import {
    Chart,
    ArgumentAxis,
    ValueAxis,
    BarSeries,
    Title,
    SplineSeries,
    LineSeries,
    Legend,
    Tooltip,
} from '@devexpress/dx-react-chart-material-ui';
import { ValueScale, Animation, EventTracker } from '@devexpress/dx-react-chart';
import { withStyles } from "@material-ui/core/styles";
import { useStyles, data } from '../constants/constants'

class HomePage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false,
            auth: true,
            mobileMoreAnchorEl: null,
            anchorEl: null,
            data: data,
            targetItem: undefined,
        };

        this.changeTargetItem = targetItem => this.setState({ targetItem });
    }

    render(){

        const { classes } = this.props;

        const theme = this.props.theme;
        console.log(this.state)
        const  {open, auth, mobileMoreAnchorEl, anchorEl, data: chartData, targetItem} = this.state;
        // const [auth, setAuth] = React.useState(true);
        // const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
        // const [anchorEl, setAnchorEl] = React.useState(null);


        const isMenuOpen = Boolean(anchorEl);
        const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

        const value = 0.83

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

        const handleChange = (event) => {
            this.setState({
                auth: event.target.checked
            })
        };

        const handleMobileMenuClose = () => {
            this.setState({
                mobileMoreAnchorEl: null
            })
        };

        const handleMenuClose = () => {
            this.setState({
                anchorEl: null
            })
            handleMobileMenuClose();
        };

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

        // End NavBar form datas



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
                        {['Charger les fichiers', 'Lancer les calculs', 'Statistiques agence', 'Statistiques comptes'].map((text, index) => (
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
                                    Tableau de bord -  Arrêtés des comptes
                                </Typography>
                            </Box>
                            <Box
                                mb={4}
                            >
                                <Typography variant="inherit"  display="block" color="textSecondary" >
                                    Bienvenue sur cette interface qui vous permet d'effectuer vos arrêtés de comptes.
                                </Typography>
                                {/*<Typography variant="p"  display="block">*/}
                                {/*    Accédez aux foncionnalités sur le pannel de gauche*/}
                                {/*</Typography>*/}
                            </Box>
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


                    </Grid>
                </main>
            </div>
        )
    }
    // NavBar and form datas
}

export default withStyles(useStyles, {withTheme: true})(HomePage)
