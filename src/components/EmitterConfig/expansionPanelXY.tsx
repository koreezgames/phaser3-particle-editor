import React, { Component, Fragment } from 'react';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
  Grid,
  FormLabel,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '../TextField';
import CompositeProperty from '../CompositeProperty';

type Props = {
  typography: string;
  configNameX: string;
  configNameY: string;
  composite: boolean;
};

class ExpansionPanelXY extends Component<Props> {
  render() {
    const { composite, typography, configNameX, configNameY } = this.props;
    return (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{typography}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container spacing={40}>
            <Grid item xs={6}>
              {composite ? (
                <Fragment>
                  <FormLabel component="legend">X</FormLabel>
                  <CompositeProperty configName={configNameX} />
                </Fragment>
              ) : (
                <TextField configName={configNameX} label="X" />
              )}
            </Grid>
            <Grid item xs={6}>
              {composite ? (
                <Fragment>
                  <FormLabel component="legend">Y</FormLabel>
                  <CompositeProperty configName={configNameY} />
                </Fragment>
              ) : (
                <TextField configName={configNameY} label="Y" />
              )}
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

export default ExpansionPanelXY;
