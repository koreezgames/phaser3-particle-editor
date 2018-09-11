import React, { Component } from 'react';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
  Grid,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ComplexZone from '../ComplexZone';
import Zone from '../Zone';

type Props = {
  typography: string;
  configName: string;
  types: [string, string];
  options: any[];
  zone: 'complex' | 'simple';
};

class ExpansionPanelZone extends Component<Props> {
  render() {
    const { typography, configName, types, options, zone } = this.props;
    return (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{typography}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container spacing={40}>
            <Grid item xs={12}>
              {zone === 'complex' ? (
                <ComplexZone
                  configName={configName}
                  types={types}
                  options={options}
                />
              ) : (
                <Zone configName={configName} types={types} options={options} />
              )}
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

export default ExpansionPanelZone;
