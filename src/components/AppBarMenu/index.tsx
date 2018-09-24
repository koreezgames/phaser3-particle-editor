import React, { Fragment, Component } from 'react';
import { inject, observer } from 'mobx-react';
import { EditorStoreProp, EDITOR_STORE } from '../../stores';
import MenuIcon from '@material-ui/icons/Menu';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import SaveIcon from '@material-ui/icons/Save';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import { Menu, Fade, IconButton } from '@material-ui/core';
import AppBarMenuItem from '../AppBarMenuItem';

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
      setOpenBackgroundDialog,
      setInitialImportProps,
      resetBackground,
      background,
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
          <AppBarMenuItem
            onClick={() => {
              setOpenSaveDialog(true);
              this.handleMenuClose();
            }}
            icon={<SaveIcon />}
            text="Save"
          />
          <AppBarMenuItem
            onClick={() => {
              setInitialImportProps();
              setOpenImportDialog(true);
              this.handleMenuClose();
            }}
            icon={<FolderOpenIcon />}
            text="Open"
          />
          <AppBarMenuItem
            onClick={() => {
              setOpenExportDialog(true);
              this.handleMenuClose();
            }}
            icon={<SaveAltIcon />}
            text="Export"
          />
          <AppBarMenuItem
            onClick={() => {
              setOpenBackgroundDialog(true);
              this.handleMenuClose();
            }}
            icon={<InsertPhotoIcon />}
            text={`${background.data ? 'Change' : 'Set'} Background`}
          />
          {background.data ? (
            <AppBarMenuItem
              onClick={() => {
                resetBackground();
                this.handleMenuClose();
              }}
              icon={<DeleteForeverIcon />}
              text="Remove Background"
            />
          ) : null}
        </Menu>
      </Fragment>
    );
  }
}

export default AppBarMenu;
