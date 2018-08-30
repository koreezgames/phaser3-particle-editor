import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import CreateCanvasModal from '../components/CreateCanvasModal';
import { EditorStoreProp } from '../stores/editorStore';
import withRoot from '../withRoot';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
      paddingTop: theme.spacing.unit * 20,
    },
  });

@inject('editorStore')
@observer
class Index extends React.Component<WithStyles<typeof styles> & EditorStoreProp> {

  render() {
    const { config } = this.props.editorStore!;
    return !config ? <CreateCanvasModal /> : null;
  }
}

export default withRoot(withStyles(styles)(Index));
