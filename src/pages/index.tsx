import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { inject, observer } from 'mobx-react';
import React from 'react';
import CreateCanvasModal from '../components/CreateCanvasModal';
import { EditorStoreProp } from '../stores/editorStore';
import withRoot from '../withRoot';
import Editor from '../components/Editor';
import { EDITOR_STORE } from '../stores';

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
    return !created ? <CreateCanvasModal /> : <Editor />;
  }
}

export default withRoot(withStyles(styles)(Index));
