import {
  Button, Dialog, DialogActions, DialogContent, DialogContentText,
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
    return (
      <Dialog
        open={true}
        aria-labelledby="create-canvas-title"
      >
        <DialogTitle id="create-canvas-title">Create Canvas</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send
            updates occasionally.
          </DialogContentText>
          <Grid container spacing={16}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                type="text"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                type="text"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                type="text"
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="primary" onClick={this.props.editorStore!.setConfig}>
            Primary
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default CreateCanvasModal;