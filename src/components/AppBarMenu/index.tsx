import React, { Fragment, Component } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import MenuIcon from '@material-ui/icons/Menu';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';
import { EditorStoreProp, EDITOR_STORE, EMITTER_STORE } from '../../stores';
import { inject, observer } from 'mobx-react';
import { EmitterStoreProp } from '../../stores/emitterStore';

@inject(EDITOR_STORE, EMITTER_STORE)
@observer
class AppBarMenu extends Component<EditorStoreProp & EmitterStoreProp> {
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

  handleDialogClose = () => {
    this.setState({ isOpenDialog: false });
  };

  handleExportClick = () => {
    this.setState({ isOpenDialog: true, anchorEl: null });
  };

  handlExportClick = () => {
    const { editorStore, emitterStore } = this.props;
    const { name } = editorStore!;
    const { downloadAll } = emitterStore!;
    downloadAll(name.value, this.state.exportHiddenEmitters);
  };

  handleChangeExportHiddenEmitters = (value: boolean) => {
    this.setState({ exportHiddenEmitters: value });
  };

  render() {
    const { editorStore, emitterStore } = this.props;
    const { name } = editorStore!;
    const { emitters } = emitterStore!;
    const { anchorEl, isOpenDialog, exportHiddenEmitters } = this.state;
    const menuOpen = Boolean(anchorEl);
    const issetHidden = emitters.some(emitter => !emitter.config.visible);

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
          <MenuItem onClick={this.handleExportClick}>
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

        <Dialog open={isOpenDialog} onClose={this.handleDialogClose}>
          <DialogTitle>Export</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Export project {name.value}
              .zip ?
            </DialogContentText>
            {issetHidden ? (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={exportHiddenEmitters}
                    onChange={event =>
                      this.handleChangeExportHiddenEmitters(
                        event.target.checked,
                      )
                    }
                    color="primary"
                  />
                }
                label="export hidden emitters"
              />
            ) : null}
          </DialogContent>
          <DialogActions>
            <Button
              size="small"
              variant="contained"
              onClick={this.handleDialogClose}
              color="secondary"
            >
              Cancel
            </Button>
            <Button
              size="small"
              variant="contained"
              onClick={() => {
                this.handlExportClick();
                this.handleDialogClose();
              }}
              color="primary"
            >
              Export
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

export default AppBarMenu;
