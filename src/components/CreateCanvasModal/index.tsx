import {
  Button, Dialog, DialogActions, DialogContent, DialogContentText,
  DialogTitle, TextField, Grid
} from '@material-ui/core';
import * as React from 'react';

class CreateCanvasModal extends React.Component {
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
          <Button variant="outlined" color="primary">
            Primary
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default CreateCanvasModal;