import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Icon from '@material-ui/core/Icon';

const styles = {
  root: {
    width: 800,
    margin: "auto"
  },
  // icon:{
  //     color:"pink"
  // }
};

class FriendsNavigation extends Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <BottomNavigation
        value={value}
        onChange={this.handleChange}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction classes={{selected:classes.icon}} onClick={this.props.showFriends} label="Friends" icon={<Icon classes={{selected:classes.icon}}>group</Icon>} />
        <BottomNavigationAction onClick={this.props.showRequests} label="Friend Requests" icon={<Icon>assignment_returned</Icon>} />
        <BottomNavigationAction onClick={this.props.showSentRequests} label="Sent Requests" icon={<RestoreIcon />} />
      </BottomNavigation>
    );
  }
}

FriendsNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FriendsNavigation);