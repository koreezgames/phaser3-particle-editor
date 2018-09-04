import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import DeleteIcon from '@material-ui/icons/Delete';

class FadeMenu extends React.Component {
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
      <div>
        <div onClick={this.handleClick}>
          <DeleteIcon />
          File
        </div>

        <Menu
          id="fade-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose}
          TransitionComponent={Fade}
        >
          <MenuItem onClick={this.handleClose}>Export</MenuItem>
          <MenuItem onClick={this.handleClose} disabled>
            Import
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

export default FadeMenu;
