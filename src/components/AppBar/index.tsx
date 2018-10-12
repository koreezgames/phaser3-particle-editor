import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import AppBarMenu from '../AppBarMenu';
import { EDITOR_STORE, EditorStoreProp } from '../../stores';
import packageJSON from '../../../package.json';
import GitHubButton from 'github-buttons/dist/react';
import {
  AppBar as MaterialAppBar,
  Toolbar,
  Typography,
  withStyles,
  WithStyles,
} from '@material-ui/core';

const styles = {
  flex: {
    flexGrow: 1,
  },
  version: { marginRight: 10 },
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
          <Typography variant="h6" color="inherit" className={classes.flex}>
            {name.value}
          </Typography>
          <Typography color="inherit" className={classes.version}>
            v {packageJSON.version}
          </Typography>
          <GitHubButton
            href="https://github.com/koreezgames/phaser3-particle-editor"
            data-icon="octicon-star"
            data-text="Star"
            data-show-count={true}
          />
        </Toolbar>
      </MaterialAppBar>
    );
  }
}

// < !--Place this tag where you want the button to render. -- >
//   <a class="github-button" href="https://github.com/ntkme/github-buttons" data-icon="octicon-star"
// aria-label="Star ntkme/github-buttons on GitHub">Star</a>

export default withStyles(styles)(AppBar);
