import {
  Button, Dialog, DialogActions, DialogContent,
  DialogTitle, TextField, Grid
} from '@material-ui/core';
import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { EditorStoreProp } from '../../stores/editorStore';

@inject('editorStore')
@observer
class CreateCanvasModal extends React.Component<EditorStoreProp> {
  constructor(props: EditorStoreProp, context: any) {
    super(props, context);
  }

  render() {
    const { name, height, width, setStatus, changeConfig, setError } = this.props.editorStore!;
    return (
      <Dialog
        open={true}
        aria-labelledby="create-canvas-title"
      >
        <DialogTitle id="create-canvas-title">Create Canvas</DialogTitle>
        <DialogContent>
          <Grid container spacing={16}>
            <Grid item xs={12}>
              <TextField
                value={name.value}
                error={name.error}
                label="Name"
                type="text"
                fullWidth
                onFocus={() => { setError('name', false); }}
                onChange={(event) => changeConfig('name', event.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                value={height.value}
                error={height.error}
                label="Height"
                type="number"
                fullWidth
                onFocus={() => { setError('height', false); }}
                onChange={(event) => changeConfig('height', event.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                value={width.value}
                error={width.error}
                label="Width"
                type="number"
                fullWidth
                onFocus={() => { setError('width', false); }}
                onChange={(event) => changeConfig('width', event.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button size="small" variant="contained" color="primary" onClick={() => setStatus(true)}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default CreateCanvasModal;