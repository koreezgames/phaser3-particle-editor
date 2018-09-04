import React, { Fragment } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import MenuIcon from '@material-ui/icons/Menu';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import { IconButton, ListItemIcon, ListItemText } from '@material-ui/core';

class AppBarMenu extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = (event: any) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <Fragment>
        <IconButton
          color="inherit"
          aria-label="Menu"
          onClick={this.handleClick}
        >
          <MenuIcon />
        </IconButton>

        <Menu
          id="fade-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose}
          TransitionComponent={Fade}
        >
          <MenuItem>
            <ListItemIcon>
              <SaveAltIcon />
            </ListItemIcon>
            <ListItemText inset primary="Export" />
          </MenuItem>
          <MenuItem disabled>
            <ListItemIcon>
              <SaveAltIcon />
            </ListItemIcon>
            <ListItemText inset primary="Import" />
          </MenuItem>
        </Menu>
      </Fragment>
    );
  }
}

export default AppBarMenu;
