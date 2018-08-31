import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { EditorStoreProp } from '../../stores/editorStore';
import { Grid } from '@material-ui/core';
import initCanvas from '../../canvas';

@inject('editorStore')
@observer
class App extends React.Component<EditorStoreProp> {
  constructor(props: EditorStoreProp, context: any) {
    super(props, context);
  }

  componentDidMount() {
    const { height, width } = this.props.editorStore!;
    initCanvas({
      height: height.value,
      width: width.value
    });
  }

  render() {
    const { name } = this.props.editorStore!;
    return (
      <Grid container spacing={16}>
        <Grid item xs={12}>
          {name.value}
        </Grid>
        <Grid item xs={2}>
          left
        </Grid>
        <Grid id="phaser-canvas" item xs={7} />
        <Grid item xs={3}>
          right
        </Grid>
      </Grid>
    );
  }
}

export default App;