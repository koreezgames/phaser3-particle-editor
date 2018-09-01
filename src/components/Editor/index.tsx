import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { EditorStoreProp } from '../../stores/editorStore';
import { Grid, WithStyles, withStyles } from '@material-ui/core';
import initCanvas from '../../canvas';
import EmitterConfig from '../EmitterConfig';
import { EDITOR_STORE } from '../../stores';

const styles = {
  darkGrid: {
    backgroundColor: '#212121',
  },
};

@inject(EDITOR_STORE)
@observer
class Editor extends React.Component<
  WithStyles<typeof styles> & EditorStoreProp
> {
  componentDidMount() {
    const { height, width } = this.props.editorStore!;
    initCanvas(height.value, width.value);
  }

  render() {
    const { editorStore, classes } = this.props;
    const { name } = editorStore!;
    return (
      <Grid container spacing={16}>
        <Grid item xs={12}>
          {name.value}
        </Grid>
        <Grid item xs={2} className={classes.darkGrid}>
          left
        </Grid>
        <Grid id="phaser-canvas" item xs={7} />
        <Grid item xs={3} className={classes.darkGrid}>
          <EmitterConfig />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Editor);
