import React, { Fragment, Component } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import MenuIcon from '@material-ui/icons/Menu';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import { IconButton, ListItemIcon, ListItemText } from '@material-ui/core';
import { EditorStoreProp, EDITOR_STORE } from '../../stores';
import { inject, observer } from 'mobx-react';

@inject(EDITOR_STORE)
@observer
class AppBarMenu extends Component<EditorStoreProp> {
  state = {
    anchorEl: null,
    isOpenDialog: false,
    exportHiddenEmitters: true,
  };

  handleMenuClick = (event: any) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { editorStore } = this.props;
    const { setOpenExportDialog } = editorStore!;
    const { anchorEl } = this.state;
    const menuOpen = Boolean(anchorEl);

    return (
      <Fragment>
        <IconButton onClick={this.handleMenuClick}>
          <MenuIcon />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={menuOpen}
          onClose={this.handleMenuClose}
          TransitionComponent={Fade}
        >
          <MenuItem
            onClick={() => {
              setOpenExportDialog(true);
              this.handleMenuClose();
            }}
          >
            <ListItemIcon>
              <SaveAltIcon />
            </ListItemIcon>
            <ListItemText inset primary="Export" />
          </MenuItem>
          {/* <MenuItem disabled>
            <ListItemIcon>
              <SaveAltIcon />
            </ListItemIcon>
            <ListItemText inset primary="Import" />
          </MenuItem> */}
        </Menu>
      </Fragment>
    );
  }
}

export default AppBarMenu;
