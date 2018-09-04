import React, { Component } from 'react';
import { EDITOR_STORE, EditorStoreProp } from '../../stores';
import { observer, inject } from 'mobx-react';
import {
  AppBar as MaterialAppBar,
  Toolbar,
  Typography,
  withStyles,
  WithStyles,
} from '@material-ui/core';
import packageJSON from '../../../package.json';
import AppBarMenu from '../AppBarMenu';

const styles = {
  flex: {
    flexGrow: 1,
  },
};

@inject(EDITOR_STORE)
@observer
class AppBar extends Component<EditorStoreProp & WithStyles<typeof styles>> {
  render() {
    const { classes, editorStore } = this.props;
    const { name } = editorStore!;
    return (
      <MaterialAppBar position="sticky">
        <Toolbar variant="dense">
          <AppBarMenu />
          <Typography variant="title" color="inherit" className={classes.flex}>
            {name.value}
          </Typography>
          <Typography color="inherit">v {packageJSON.version}</Typography>
        </Toolbar>
      </MaterialAppBar>
    );
  }
}

export default withStyles(styles)(AppBar);
