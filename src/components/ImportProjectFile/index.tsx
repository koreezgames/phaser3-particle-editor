import {
  Button,
  Grid,
  WithStyles,
  withStyles,
  createStyles,
  Theme,
  TextField,
  Typography,
  Tooltip,
} from '@material-ui/core';
import React from 'react';
import { inject, observer } from 'mobx-react';
import AttachmentIcon from '@material-ui/icons/Attachment';
import { EDITOR_STORE, EditorStoreProp } from '../../stores';
import { ARCHIVE_EXTENSION } from '../../constants';

const styles = (theme: Theme) =>
  createStyles({
    input: {
      display: 'none',
    },
    button: {
      margin: theme.spacing.unit,
      marginLeft: 0,
    },
    rightIcon: {
      marginLeft: theme.spacing.unit,
    },
  });

@inject(EDITOR_STORE)
@observer
class ImportProjectFile extends React.Component<
  EditorStoreProp & WithStyles<typeof styles>
> {
  handleChange = (event: any) => {
    const { setFile } = this.props.editorStore!;
    const file = event.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  render() {
    const { editorStore, classes } = this.props;
    const { file, fileError, fileErrorText } = editorStore!;
    const inputLabel = file ? file.name : '  ';

    return (
      <Grid item xs={12}>
        <Grid container spacing={16}>
          <Grid item xs={4}>
            <input
              accept="*"
              className={classes.input}
              id="button-file"
              type="file"
              onChange={this.handleChange}
            />
            <label htmlFor="button-file">
              <Tooltip
                disableFocusListener
                title={`*.${ARCHIVE_EXTENSION}`}
                placement="bottom"
              >
                <Button
                  variant="contained"
                  color="default"
                  className={classes.button}
                  fullWidth
                  component="span"
                >
                  Choose ...
                  <AttachmentIcon className={classes.rightIcon} />
                </Button>
              </Tooltip>
            </label>
          </Grid>
          <Grid item xs={8}>
            <TextField label={inputLabel} fullWidth disabled />
          </Grid>
          <Grid item xs={12}>
            {fileError && (
              <Typography color="error">{fileErrorText}</Typography>
            )}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

type Props = {
  onSuccessLoad: () => void;
  onReadyResult: (emitters: any) => void;
};

@inject(EDITOR_STORE)
@observer
class ImportProjectButton extends React.Component<Props & EditorStoreProp> {
  handleImport = async () => {
    const { editorStore, onSuccessLoad, onReadyResult } = this.props;
    const { importProject } = editorStore!;
    const result = await importProject();
    if (result) {
      onReadyResult(result);
      onSuccessLoad();
    }
  };

  render() {
    const { editorStore } = this.props;
    const { file, fileError, fileLoadingStatus } = editorStore!;

    return (
      <Button
        disabled={!Boolean(file) || fileError || fileLoadingStatus}
        size="small"
        variant="contained"
        onClick={this.handleImport}
        color="primary"
      >
        Open
      </Button>
    );
  }
}

export { ImportProjectButton };
export default withStyles(styles)(ImportProjectFile);
