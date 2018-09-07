import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { EditorStoreProp } from '../../stores/editorStore';
import { Grid, WithStyles, withStyles, createStyles } from '@material-ui/core';
import initCanvas from '../../canvas';
import EmitterConfig from '../EmitterConfig';
import { EDITOR_STORE } from '../../stores';
import AppBar from '../AppBar';
import EmitterList from '../EmitterList';

const styles = () =>
  createStyles({
    darkGrid: {
      backgroundColor: '#424242',
    },
    parentPhaser: {
      position: 'relative',
    },
  });

@inject(EDITOR_STORE)
@observer
class Editor extends React.Component<
  WithStyles<typeof styles> & EditorStoreProp
> {
  componentDidMount() {
    const { editorStore } = this.props;
    const { height, width } = editorStore!;
    initCanvas(height.value, width.value);
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <AppBar />
        </Grid>
        <Grid item xs={2} className={classes.darkGrid}>
          <EmitterList />
        </Grid>
        <Grid id="phaser-canvas" item xs={7} className={classes.parentPhaser} />
        <Grid item xs={3} className={classes.darkGrid}>
          <EmitterConfig />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Editor);
