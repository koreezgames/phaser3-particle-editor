import React, { Component, Fragment } from 'react';
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Menu,
  MenuItem,
  Switch,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import SaveAltIcon from '@material-ui/icons/SaveAlt';

const actions = [
  <DeleteIcon key={0} />,
  <FileCopyIcon key={1} />,
  <SaveAltIcon key={2} />,
];

const ITEM_HEIGHT = 48;

class EmitterItem extends Component {
  state = {
    anchorEl: null,
  };

  handleClick = (event: any) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = (event: any) => {
    console.log(event.currentTarget);
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <Fragment>
        <ListItem button>
          <ListItemText primary="Emitter" />
          <ListItemSecondaryAction>
            <Switch color="primary" />
            <IconButton
              aria-label="More"
              aria-haspopup="true"
              onClick={this.handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={this.handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: 55,
                },
              }}
            >
              {actions.map((option, index) => (
                <MenuItem key={index} onClick={this.handleClose}>
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </ListItemSecondaryAction>
        </ListItem>
      </Fragment>
    );
  }
}

export default EmitterItem;
