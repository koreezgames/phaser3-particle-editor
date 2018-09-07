import React, { Component, Fragment } from 'react';
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Menu,
  MenuItem,
  Switch,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { EMITTER_STORE, EmitterStoreProp } from '../../stores';
import { inject, observer } from 'mobx-react';

const actions = [<DeleteIcon key={0} />, <FileCopyIcon key={1} />];
const ITEM_HEIGHT = 48;

interface Props {
  index: number;
}

@inject(EMITTER_STORE)
@observer
class EmitterItem extends Component<Props & EmitterStoreProp> {
  state = {
    anchorEl: null,
  };

  handleClick = (event: any) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { index, emitterStore } = this.props;
    const {
      emitters,
      changeEmitterIndex,
      emitterIndex,
      changeEmitterConfig,
      removeEmitter,
      copyEmitter,
    } = emitterStore!;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const { name, config } = emitters[index];

    return (
      <Fragment>
        <ListItem
          button
          selected={index === emitterIndex}
          onClick={() => changeEmitterIndex(index)}
        >
          <ListItemText primary={name} />
          <ListItemSecondaryAction>
            <Switch
              checked={config.visible}
              color="primary"
              onChange={event =>
                changeEmitterConfig('visible', event.target.checked, index)
              }
            />
            <IconButton
              aria-label="More"
              aria-haspopup="true"
              onClick={this.handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={this.handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: 55,
                },
              }}
            >
              {actions.map((option, i) => (
                <MenuItem
                  key={i}
                  disabled={i === 0 && emitters.length === 1}
                  onClick={() => {
                    this.handleClose();
                    switch (i) {
                      case 0:
                        removeEmitter(index);
                        break;
                      case 1:
                        copyEmitter(index);
                        break;
                      default:
                        break;
                    }
                  }}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </ListItemSecondaryAction>
        </ListItem>
      </Fragment>
    );
  }
}

export default EmitterItem;
