import React, { Fragment, Component } from 'react';
import { inject, observer } from 'mobx-react';
import { EditorStoreProp, EDITOR_STORE } from '../../stores';
import MenuIcon from '@material-ui/icons/Menu';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import SaveIcon from '@material-ui/icons/Save';
import {
  Menu,
  MenuItem,
  Fade,
  IconButton,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';

@inject(EDITOR_STORE)
@observer
class AppBarMenu extends Component<EditorStoreProp> {
  state = {
    anchorEl: null,
  };

  handleMenuClick = (event: any) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { editorStore } = this.props;
    const {
      setOpenExportDialog,
      setOpenImportDialog,
      setOpenSaveDialog,
      setInitialImportProps,
    } = editorStore!;
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
              setOpenSaveDialog(true);
              this.handleMenuClose();
            }}
          >
            <ListItemIcon>
              <SaveIcon />
            </ListItemIcon>
            <ListItemText inset primary="Save" />
          </MenuItem>
          <MenuItem
            onClick={() => {
              setInitialImportProps();
              setOpenImportDialog(true);
              this.handleMenuClose();
            }}
          >
            <ListItemIcon>
              <FolderOpenIcon />
            </ListItemIcon>
            <ListItemText inset primary="Open" />
          </MenuItem>
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
        </Menu>
      </Fragment>
    );
  }
}

export default AppBarMenu;
