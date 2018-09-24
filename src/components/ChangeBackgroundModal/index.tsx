import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import React from 'react';
import { inject, observer } from 'mobx-react';
import { EDITOR_STORE, EditorStoreProp } from '../../stores';
import ImportBackground from '../ImportBackground';

@inject(EDITOR_STORE)
@observer
class ChangeBackgroundModal extends React.Component<EditorStoreProp> {
  render() {
    const { editorStore } = this.props;
    const { openBackgroundDialog, setOpenBackgroundDialog } = editorStore!;

    return (
      <Dialog
        open={openBackgroundDialog}
        onClose={() => setOpenBackgroundDialog(false)}
        fullWidth={true}
        maxWidth={'sm'}
      >
        <DialogTitle>Background Image</DialogTitle>
        <DialogContent>
          <ImportBackground />
        </DialogContent>
        <DialogActions>
          <Button
            size="small"
            variant="contained"
            onClick={() => setOpenBackgroundDialog(false)}
            color="primary"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default ChangeBackgroundModal;
