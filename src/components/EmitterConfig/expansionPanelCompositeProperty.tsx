import React, { Component } from 'react';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
  Grid,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CompositeProperty from '../CompositeProperty';

type Props = {
  typography: string;
  configName: string;
};

class ExpansionPanelCompositeProperty extends Component<Props> {
  render() {
    const { typography, configName } = this.props;
    return (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{typography}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container spacing={40}>
            <Grid item xs={12}>
              <CompositeProperty configName={configName} />
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

export default ExpansionPanelCompositeProperty;
