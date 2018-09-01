import React, { Component } from 'react';
import { EDITOR_STORE, EditorStoreProp } from '../../stores';
import { observer, inject } from 'mobx-react';
import {
  AppBar as MaterialAppBar,
  Toolbar,
  Typography,
} from '@material-ui/core';

@inject(EDITOR_STORE)
@observer
class AppBar extends Component<EditorStoreProp> {
  render() {
    const { name } = this.props.editorStore!;
    return (
      <MaterialAppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="title" color="inherit">
            {name.value}
          </Typography>
        </Toolbar>
      </MaterialAppBar>
    );
  }
}

export default AppBar;
