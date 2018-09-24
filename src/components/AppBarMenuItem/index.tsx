import React, { Component } from 'react';
import { MenuItem, ListItemIcon, ListItemText } from '@material-ui/core';

type Props = {
  onClick: any;
  icon: any;
  text: string;
};

class AppBarMenuItem extends Component<Props> {
  render() {
    const { onClick, icon, text } = this.props;

    return (
      <MenuItem onClick={onClick}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText inset primary={text} />
      </MenuItem>
    );
  }
}

export default AppBarMenuItem;
