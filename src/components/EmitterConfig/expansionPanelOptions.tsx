import React, { Component } from 'react';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
  Grid,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '../TextField';
import Switch from '../Switch';

class ExpansionPanelOptions extends Component {
  render() {
    return (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Options</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container spacing={16}>
            <Grid item xs={4}>
              <TextField configName="frequency" />
            </Grid>
            <Grid item xs={4}>
              <TextField configName="maxParticles" />
            </Grid>
            <Grid item xs={4}>
              <TextField configName="timeScale" />
            </Grid>
            <Grid item xs={6}>
              <Switch configName="active" />
            </Grid>
            <Grid item xs={6}>
              <Switch configName="on" />
            </Grid>
            <Grid item xs={6}>
              <Switch configName="particleBringToTop" label="Top" />
            </Grid>
            <Grid item xs={6}>
              <Switch configName="radial" />
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

export default ExpansionPanelOptions;
