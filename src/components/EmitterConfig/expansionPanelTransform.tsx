import React, { Component } from 'react';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
  Grid,
  FormLabel,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CompositeProperty from '../CompositeProperty';

class ExpansionPanelTransform extends Component {
  render() {
    return (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Transform</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container spacing={40}>
            <Grid item xs={6}>
              <FormLabel component="label">Scale</FormLabel>
              <CompositeProperty configName="scale" />
            </Grid>
            <Grid item xs={6}>
              <FormLabel component="label">Rotate</FormLabel>
              <CompositeProperty configName="rotate" />
            </Grid>
            <Grid item xs={12}>
              <FormLabel component="label">Alpha</FormLabel>
              <CompositeProperty configName="alpha" />
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

export default ExpansionPanelTransform;
