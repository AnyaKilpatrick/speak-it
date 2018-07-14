import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';





import FolderIcon from '@material-ui/icons/Folder';

import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
  },
  listItem: {
    backgroundColor: "#0000001c",
    marginBottom: 10
  },
  listItemText:{
    color: "rgba(17, 7, 88, 0.87)",
    fontWeight: 550,
    fontFamily: "'Cabin Sketch', cursive",
    fontSize: 28
  },
  ivonBtn:{
    backgroundColor:"blue"
  }
});

class FriendList extends Component {
  state = {
    secondary: false,
  };

  render() {
    const { classes } = this.props;
    const { secondary } = this.state;

    return (
        <ListItem 
        classes ={{
            root: classes.listItem
        }}>
            <ListItemAvatar>
                <Avatar>
                <FolderIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText 
                classes = {{
                    primary: classes.listItemText
                }}
                primary= {this.props.friendName}
                secondary={secondary ? 'Secondary text' : null}
            />
            <ListItemSecondaryAction>
              <Tooltip id="tooltip-fab" title="View Profile">
                  <IconButton classname={classes.iconBtn} href={"/user/"+this.props.profileId} aria-label="view profile">
                    <Icon>chrome_reader_mode</Icon>
                  </IconButton>
              </Tooltip>
              {this.props.children}
            </ListItemSecondaryAction>
        </ListItem>
    );
  }
}

FriendList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FriendList);