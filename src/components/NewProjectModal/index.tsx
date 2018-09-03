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
import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { EditorStoreProp } from '../../stores/editorStore';
import CreateIcon from '@material-ui/icons/Create';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import AttachmentIcon from '@material-ui/icons/Attachment';
import { Fragment } from 'react';

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

@inject('editorStore')
@observer
class NewProjectModal extends React.Component<
  WithStyles<typeof styles> & EditorStoreProp
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
    const { classes } = this.props;
    return (
      <Fragment>
        <Grid item xs={12}>
          <DialogContentText>
            Lets continue something awesome.
          </DialogContentText>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={16}>
            <Grid item xs={4}>
              <input
                accept="image/*"
                className={classes.input}
                id="button-file"
                type="file"
              />
              <label htmlFor="button-file">
                <Button
                  variant="contained"
                  color="default"
                  className={classes.button}
                  fullWidth
                  component="span"
                >
                  Choose...
                  <AttachmentIcon className={classes.rightIcon} />
                </Button>
              </label>
            </Grid>
            <Grid item xs={8}>
              <TextField label=" " fullWidth disabled />
            </Grid>
          </Grid>
        </Grid>
      </Fragment>
    );
  }

  render() {
    const { value } = this.state;
    const { setStatus } = this.props.editorStore!;
    return (
      <Dialog open={true} aria-labelledby="title">
        <DialogTitle id="title">
          {value === Project.Create ? 'Create Project' : 'Upload Project'}
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
                  <Tab icon={<CloudUploadIcon />} value={Project.Upload} />
                </Tabs>
              </AppBar>
            </Grid>
            {value === Project.Create
              ? this.getBodyCreate()
              : this.getBodyUpload()}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={() => setStatus(true)}
          >
            {value === Project.Create ? 'Create' : 'Upload'}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(NewProjectModal);
