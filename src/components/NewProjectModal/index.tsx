import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
  DialogContentText,
  Tabs,
  Tab,
  AppBar,
  createStyles,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import React from 'react';
import { inject, observer } from 'mobx-react';
import { EditorStoreProp } from '../../stores/editorStore';
import CreateIcon from '@material-ui/icons/Create';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import { Fragment } from 'react';
import ImportProjectFile, { ImportProjectButton } from '../ImportProjectFile';
import { EDITOR_STORE, EMITTER_STORE, EmitterStoreProp } from '../../stores';

enum Project {
  Create,
  Upload,
}

const styles = (theme: Theme) =>
  createStyles({
    input: {
      display: 'none',
    },
    button: {
      margin: theme.spacing.unit,
    },
    leftIcon: {
      marginRight: theme.spacing.unit,
    },
    rightIcon: {
      marginLeft: theme.spacing.unit,
    },
  });

@inject(EDITOR_STORE, EMITTER_STORE)
@observer
class NewProjectModal extends React.Component<
  WithStyles<typeof styles> & EditorStoreProp & EmitterStoreProp
> {
  state = {
    value: Project.Create,
  };

  handleChange = (event: any, value: Project) => {
    this.setState({ value });
  };

  getBodyCreate() {
    const {
      name,
      height,
      width,
      changeConfig,
      setError,
    } = this.props.editorStore!;

    return (
      <Fragment>
        <Grid item xs={12}>
          <DialogContentText>Lets start something new.</DialogContentText>
        </Grid>
        <Grid item xs={12}>
          <TextField
            value={name.value}
            error={name.error}
            label="Name"
            type="text"
            fullWidth
            onFocus={() => {
              setError('name', false);
            }}
            onChange={event => changeConfig('name', event.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            value={height.value}
            error={height.error}
            label="Height"
            type="number"
            fullWidth
            onFocus={() => {
              setError('height', false);
            }}
            onChange={event => changeConfig('height', event.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            value={width.value}
            error={width.error}
            label="Width"
            type="number"
            fullWidth
            onFocus={() => {
              setError('width', false);
            }}
            onChange={event => changeConfig('width', event.target.value)}
          />
        </Grid>
      </Fragment>
    );
  }

  getBodyUpload() {
    return (
      <Fragment>
        <Grid item xs={12}>
          <DialogContentText>
            Lets continue something awesome.
          </DialogContentText>
        </Grid>
        <Grid item xs={12}>
          <ImportProjectFile />
        </Grid>
      </Fragment>
    );
  }

  handleKeyDown = (event: any) => {
    const { setStatus } = this.props.editorStore!;
    if (event.keyCode === 13 && this.state.value === Project.Create) {
      setStatus(true);
    }
  };

  render() {
    const { value } = this.state;
    const { editorStore, emitterStore } = this.props;
    const { setStatus, setEditorProps } = editorStore!;
    const { setEmitters } = emitterStore!;
    return (
      <Dialog
        open={true}
        aria-labelledby="title"
        onKeyDown={this.handleKeyDown}
      >
        <DialogTitle id="title">
          {value === Project.Create ? 'Create Project' : 'Open Project'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={16}>
            <Grid item xs={12}>
              <AppBar position="static" color="default">
                <Tabs
                  value={value}
                  fullWidth
                  onChange={this.handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                >
                  <Tab icon={<CreateIcon />} value={Project.Create} />
                  <Tab icon={<FolderOpenIcon />} value={Project.Upload} />
                </Tabs>
              </AppBar>
            </Grid>
            {value === Project.Create
              ? this.getBodyCreate()
              : this.getBodyUpload()}
          </Grid>
        </DialogContent>
        <DialogActions>
          {value === Project.Create ? (
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={() => setStatus(true)}
            >
              Create
            </Button>
          ) : (
            <ImportProjectButton
              onSuccessLoad={() => setStatus(true)}
              onReadyResult={result => {
                setEditorProps(result.editor);
                setEmitters(result.emitters);
              }}
            />
          )}
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(NewProjectModal);
