import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from '@material-ui/core';
import React from 'react';

type Props = {
  open: boolean;
  actionType: string;
  extension: string;
  projectName: string;
  onClose: () => void;
  onTrueClick: () => void;
  children?: any;
};

class ExportSaveProjectModal extends React.Component<Props> {
  render() {
    const {
      open,
      onClose,
      actionType,
      extension,
      onTrueClick,
      projectName,
      children,
    } = this.props;

    return (
      <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth={'sm'}>
        <DialogTitle>{actionType}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {actionType} project {projectName}.{extension} ?
          </DialogContentText>
          {children}
        </DialogContent>
        <DialogActions>
          <Button
            size="small"
            variant="contained"
            onClick={onClose}
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            size="small"
            variant="contained"
            onClick={onTrueClick}
            color="primary"
          >
            {actionType}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default ExportSaveProjectModal;
