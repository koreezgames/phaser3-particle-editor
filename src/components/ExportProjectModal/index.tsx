import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import * as React from 'react';
import { inject, observer } from 'mobx-react';
import {
  EDITOR_STORE,
  EMITTER_STORE,
  EmitterStoreProp,
  EditorStoreProp,
} from '../../stores';
import { exportProject } from '../../utils';

@inject(EDITOR_STORE, EMITTER_STORE)
@observer
class ExportProjectModal extends React.Component<
  EditorStoreProp & EmitterStoreProp
> {
  render() {
    const { editorStore, emitterStore } = this.props;
    const {
      openExportDialog,
      name,
      exportHiddenEmitters,
      setOpenExportDialog,
      setExportHiddenEmitters,
    } = editorStore!;
    const { emitters } = emitterStore!;
    const anyHiddenEmitter = emitters.some(emitter => !emitter.config.visible);

    return (
      <Dialog
        open={openExportDialog}
        onClose={() => setOpenExportDialog(false)}
        fullWidth={true}
        maxWidth={'sm'}
      >
        <DialogTitle>Export</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Export project {name.value}
            .zip ?
          </DialogContentText>
          {anyHiddenEmitter ? (
            <FormControlLabel
              control={
                <Checkbox
                  checked={exportHiddenEmitters}
                  onChange={event =>
                    setExportHiddenEmitters(event.target.checked)
                  }
                  color="primary"
                />
              }
              label="export hidden emitters"
            />
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button
            size="small"
            variant="contained"
            onClick={() => setOpenExportDialog(false)}
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            size="small"
            variant="contained"
            onClick={() => {
              setOpenExportDialog(false);
              exportProject(name.value, emitters);
            }}
            color="primary"
          >
            Export
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default ExportProjectModal;
