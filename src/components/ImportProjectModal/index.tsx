import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import React from 'react';
import { inject, observer } from 'mobx-react';
import {
  EDITOR_STORE,
  EMITTER_STORE,
  EmitterStoreProp,
  EditorStoreProp,
} from '../../stores';
import ImportProjectFile, { ImportProjectButton } from '../ImportProjectFile';
import initCanvas from '../../canvas';

@inject(EDITOR_STORE, EMITTER_STORE)
@observer
class ImportProjectModal extends React.Component<
  EditorStoreProp & EmitterStoreProp
> {
  render() {
    const { editorStore, emitterStore } = this.props;
    const {
      openImportDialog,
      setOpenImportDialog,
      setEditorProps,
    } = editorStore!;
    const { setEmitters } = emitterStore!;

    return (
      <Dialog
        open={openImportDialog}
        onClose={() => setOpenImportDialog(false)}
        fullWidth={true}
        maxWidth={'sm'}
      >
        <DialogTitle>Open Project</DialogTitle>
        <DialogContent>
          <ImportProjectFile />
        </DialogContent>
        <DialogActions>
          <Button
            size="small"
            variant="contained"
            onClick={() => setOpenImportDialog(false)}
            color="secondary"
          >
            Cancel
          </Button>
          <ImportProjectButton
            onSuccessLoad={() => setOpenImportDialog(false)}
            onReadyResult={result => {
              const { game } = window as any;
              for (let scene in game.scene.keys) {
                if (game.scene.keys.hasOwnProperty(scene)) {
                  game.scene.remove(scene);
                }
              }
              game.destroy(true);
              setEditorProps(result.editor);
              setEmitters(result.emitters);
              initCanvas(result.editor.height, result.editor.width);
            }}
          />
        </DialogActions>
      </Dialog>
    );
  }
}

export default ImportProjectModal;
