import { FormControlLabel, Checkbox } from '@material-ui/core';
import React from 'react';
import { inject, observer } from 'mobx-react';
import {
  EDITOR_STORE,
  EMITTER_STORE,
  EmitterStoreProp,
  EditorStoreProp,
} from '../../stores';
import { exportProject } from '../../utils';
import ExportSaveProjectModal from '../ExportSaveProjectModal';

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
      <ExportSaveProjectModal
        open={openExportDialog}
        actionType="Export"
        extension="zip"
        projectName={name.value}
        onClose={() => setOpenExportDialog(false)}
        onTrueClick={() => {
          setOpenExportDialog(false);
          exportProject(name.value, emitters, exportHiddenEmitters);
        }}
      >
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
      </ExportSaveProjectModal>
    );
  }
}

export default ExportProjectModal;
