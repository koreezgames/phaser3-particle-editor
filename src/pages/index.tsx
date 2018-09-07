import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { inject, observer } from 'mobx-react';
import React, { Fragment } from 'react';
import NewProjectModal from '../components/NewProjectModal';
import { EditorStoreProp } from '../stores/editorStore';
import withRoot from '../withRoot';
import Editor from '../components/Editor';
import { EDITOR_STORE } from '../stores';
import ExportProjectModal from '../components/ExportProjectModal';
import ImportProjectModal from '../components/ImportProjectModal';
import SaveProjectModal from '../components/SaveProjectModal';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
      paddingTop: theme.spacing.unit * 20,
    },
  });

@inject(EDITOR_STORE)
@observer
class Index extends React.Component<
  WithStyles<typeof styles> & EditorStoreProp
> {
  render() {
    const { created } = this.props.editorStore!;
    return !created ? (
      <NewProjectModal />
    ) : (
      <Fragment>
        <Editor />
        <ExportProjectModal />
        <ImportProjectModal />
        <SaveProjectModal />
      </Fragment>
    );
  }
}

export default withRoot(withStyles(styles)(Index));
