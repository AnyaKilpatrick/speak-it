import React from 'react';
import "./HomeNavbar.css";
import API from "./../../utils/API";
import { Redirect } from "react-router-dom";

//styling
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

//material-ui components
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
// import Avatar from '@material-ui/core/Avatar';


const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: "100vh",
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex'
  },
  appBar: {
    backgroundColor: "rgba(255, 255, 255, 0)",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 0.808)",
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    color:"white",
    backgroundColor: "rgba(0, 0, 0, 0.900)",
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  navbarText:{
    color: "white"
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
  icon: {
    color: "white"
  },
  menuItem: {
      "&:hover":{
        background: "rgba(190, 190, 190, 0.288)"
      }
  },
  logo: {
      color: "black",
      position: "absolute",
      right: "45%",
      fontSize:50,
      fontFamily: "'Cabin Sketch', cursive"
  }
});

class HomeNavbar extends React.Component {
  state = {
    user:{},
    openNav: false,
    openDrawer: true,
    redirectTo: null
  };

  handleClick = () => {
    this.setState(state => ({ openDrawer: !state.openDrawer }));
  };
  handleDrawerOpen = () => {
    this.setState({ openNav: true });
  };

  handleDrawerClose = () => {
    this.setState({ openNav: false });
  };

//   componentDidMount = () => {
//     API.checkLoggedInUser()
//         .then(res=>{
//             console.log("is logged in? "+JSON.stringify(res))
//             if(res.data === "") {
//                 console.log("user is not logged in"); //in this case we redirect back to log in page
//                 this.setState({redirectTo: "/"});
//             }else{
//                 console.log("user is logged in.yay!")
//                 this.setState({user: res.data.local});
//                 console.log("updated user state "+res.data.local);
//             }
//         })
//         .catch(err=> console.log(err));

//   };

  render() {
    const { classes, theme } = this.props;
    
    if (this.state.redirectTo) {
        return <Redirect to={{ pathname: this.state.redirectTo }} />
    }
    return (
      <div className={classes.root}>
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, this.state.openNav && classes.appBarShift)}
        >
          <Toolbar disableGutters={!this.state.openNav}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, this.state.openNav && classes.hide)}
            >
            <MenuIcon/>
            </IconButton>
            <Typography variant="title" color="inherit" noWrap className={classes.logo}>
              SpeakIT
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
            id="sideNavbar"
            variant="permanent"
            classes={{
                paper: classNames(classes.drawerPaper, !this.state.openNav && classes.drawerPaperClose),
            }}
            open={this.state.openNav}
            >
            <div className={classes.toolbar}>
                <IconButton onClick={this.handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
            </div>
            <Divider/>
            <ListItem button onClick={this.handleClick} className={classes.menuItem}>
                <ListItemIcon>
                    <Icon className={classes.icon}>
                        mood
                    </Icon>
                    {/* <Avatar alt="Remy Sharp" src="/images/1.jpg"/> */}
                </ListItemIcon>
                <ListItemText inset primary="Anya Kilpatrick" 
                classes={{primary: classes.navbarText}}
                />
                {this.state.openDrawer ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={this.state.openDrawer} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem button className={classes.menuItem}>
                        <ListItemIcon>
                            <Icon className={classes.icon}>
                                build
                            </Icon>
                        </ListItemIcon>
                        <ListItemText inset primary="Settings" classes={{primary: classes.navbarText}}/>
                    </ListItem>
                    <ListItem button className={classes.menuItem} onClick={this.props.logOut}>
                        <ListItemIcon>
                            <Icon className={classes.icon}>
                                settings_power
                            </Icon>
                        </ListItemIcon>
                        <ListItemText inset primary="Log Out" classes={{primary: classes.navbarText}}/>
                    </ListItem>
                </List>
            </Collapse>
            <Divider />
            <List component="nav">
                <ListItem button className={classes.menuItem}>
                    <ListItemIcon>
                        <Icon className={classes.icon}>
                            group
                        </Icon>
                    </ListItemIcon>
                    <ListItemText primary="Friends" classes={{primary: classes.navbarText}}/>
                </ListItem>
                <ListItem button className={classes.menuItem}>
                    <ListItemIcon>
                        <Icon className={classes.icon}>
                            email
                        </Icon>
                    </ListItemIcon>
                    <ListItemText primary="Messages" classes={{primary: classes.navbarText}}/>
                </ListItem>
                <ListItem button className={classes.menuItem}>
                    <ListItemIcon>
                        <Icon className={classes.icon}>
                            public
                        </Icon>
                    </ListItemIcon>
                    <ListItemText primary="My Map" classes={{primary: classes.navbarText}}/>
                </ListItem>
            </List>
        </Drawer>
        <main id="mainContainer" className={classes.content}>
          <div className={classes.toolbar} />
          {/* <Typography noWrap>{'You think water moves fast? You should see ice.'}</Typography> */}
          {this.props.children}
        </main>
      </div>
    );
  }
}

HomeNavbar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(HomeNavbar);