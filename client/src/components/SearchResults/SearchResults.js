import React, {Component} from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Avatar from '@material-ui/core/Avatar';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import classNames from 'classnames';
import Icon from '@material-ui/core/Icon';



const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    // fontSize: theme.typography.pxToRem(15),
    fontSize:24,
    // color: theme.palette.text.secondary,
    fontFamily: "'Cabin Sketch', cursive",
    color:"#0B0B3B",
    ['@media (max-width:795px)']: { //!!!!!!!!!!!!!!!!!
      fontSize:20
    },
    ['@media (max-width:550px)']: { //!!!!!!!!!!!!!!!!!
      fontSize:16,
      // marginRight:60
    }
    // fontWeight: "bold"
  },
  myAvatar: {
    width:30,
    height:30,
    marginRight:"30%"
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  resultPTag:{
    fontSize:18,
    fontFamily: "'Cabin Sketch', cursive"
  },
  resultPTag2:{
    fontSize:18,
    fontFamily: "'Inconsolata', monospace"
  },
  resultSpan:{
      color:"#0B0B3B",
      fontWeight: "bold"
  },
  icon: {
    color: "white"
  },
  // expendBtn:{
  //   position:"relative",
  //   top: -10,
  //   left: 10
  // }
});

class SearchResults extends Component {
  state = {
    expanded: null,
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };



  render() {
    const { classes } = this.props;
    const { expanded } = this.state;

    return (
      <div className={classes.root}>
        <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon className={classes.expendBtn}/>}>
            {/* <Typography className={classes.heading}> */}
                <Avatar alt="avatar" src={this.props.resultAvatar} classes={{root:classes.myAvatar}}/>
            {/* </Typography> */}
            <Typography className={classes.secondaryHeading}>{this.props.userFullName}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.details}>
          <div className={classes.column}>
          <p  className={classes.resultPTag}><span className={classes.resultSpan}>Country:</span> {this.props.userCountry}</p>
          <p className={classes.resultPTag}><span className={classes.resultSpan}>Language:</span> {this.props.userLanguage}</p>
          </div>
          <div className={classNames(classes.column2, classes.helper)}>
          <p className={classes.resultPTag}><span className={classes.resultSpan}>About:</span> {this.props.userAbout}</p>
          </div>
          </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          <Button size="small" onClick={this.props.sendFriendRequest} id={this.props.userBtnId}>Send Friend Request</Button>
          <Icon>person_add</Icon>
        </ExpansionPanelActions>
        </ExpansionPanel>
        <br/>
      </div>
    );
  }
}

SearchResults.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchResults);
