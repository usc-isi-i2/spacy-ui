import React, { Component } from 'react';
import '../styles/ListItem.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import EditorModal from './EditorModal';
import ReactTooltip from 'react-tooltip';

const styles = theme => ({
  icon: {
    margin: theme.spacing.unit
  },

  list_item: {
    paddingBottom: 0,
    paddingTop: 0
  }
});

var sub_info;

class Tokenitem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      myToken: [],
      Tokentype: '',
      type_num: 0,
      output: false,
      required: false,
      token: [],
      pos: '',
      // cap_arr: [],
      cap: '',
      sub_info: '',
      shape: [],
      num: [],
      length: [],
      max: '',
      min: '',
      summary: 'summary of token',
      summary_tooltip: '',
      type_icon: 'format_quote_icon',
      // format_quote_icon；local_parking_icon；notes;filter_1_icon;format_shapes_icon
      output_icon: 'visibility_off_icon',
      // visibility_off_icon
      required_icon: 'radio_button_unchecked_icon',
      // radio_button_unchecked_icon；error_outline_icon;check_circle_outline_icon
      is_new: 1,
      dialogdisplay: false,
      required_title: 'Optional',
      output_title: 'Not Output',
      type_title: 'Type'
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  generateSubinfo = (cap, pos) => {
    if (cap !== '' && pos !== '') {
      return (
        <div>
          <div>Cap: {cap}</div>
          <div>Part of Speech: {pos}</div>
        </div>
      );
    } else if (cap !== '') {
      return (
        <div>
          <div>Cap: {cap}</div>
        </div>
      );
    } else if (pos !== '') {
      return (
        <div>
          <div>Part of Speech: {pos}</div>
        </div>
      );
    } else return '';
  };

  componentWillMount() {
    var temp = this.props.testjson;
    // console.log("cwm tokenitem");
    // console.log(this.props.index);
    // console.log(temp);
    if (temp.type === 'word') {
      var temp_token = temp.token.toString();
      var temp_pos = temp.part_of_speech.toString();
      var temp_cap = temp.capitalization.toString();
      if (temp_token !== '') {
        this.setState({
          Tokentype: 'W',
          type_num: 0,
          type_title: temp.type,
          token: temp.token,
          summary: temp.token.join(', '),
          summary_tooltip: 'Word',
          cap: temp_cap,
          pos: temp_pos,
          type_icon: 'notes_icon'
        });
      } else if (temp_pos !== '') {
        this.setState({
          Tokentype: 'W',
          type_num: 0,
          type_title: temp.type,
          summary: temp.part_of_speech.join(', '),
          summary_tooltip: 'Part of speech',
          pos: '',
          cap: temp_cap,
          type_icon: 'notes_icon'
        });
      } else {
        this.setState({
          Tokentype: 'W',
          type_num: 0,
          type_title: temp.type,
          summary_tooltip: 'Word',
          summary: '[]',
          cap: temp_cap,
          pos: temp_pos,
          type_icon: 'notes_icon'
        });
      }
    } else if (temp.type === 'number') {
      var temp_num = temp.numbers.toString();
      if (temp_num !== '') {
        this.setState({
          Tokentype: '#',
          type_num: 1,
          type_title: temp.type,
          summary: temp.numbers.join(', '),
          summary_tooltip: 'Number',
          num: temp.numbers,
          min: temp.minimum,
          max: temp.maximum,
          cap: '',
          type_icon: 'filter_1_icon'
        });
      } else if (temp.minimum !== '' || temp.maximum !== '') {
        this.setState({
          Tokentype: '#',
          type_num: 1,
          type_title: temp.type,
          summary: temp.minimum + ' - ' + temp.maximum,
          summary_tooltip: 'MIN - MAX',
          min: temp.minimum,
          max: temp.maximum,
          cap: '',
          pos: '',
          type_icon: 'filter_1_icon'
        });
      } else {
        this.setState({
          Tokentype: '#',
          type_num: 1,
          type_title: temp.type,
          summary: 'Any Number',
          summary_tooltip: 'Number',
          cap: '',
          pos: '',
          type_icon: 'filter_1_icon'
        });
      }
    } else if (temp.type === 'shape') {
      var temp_shape = temp.shapes.toString();
      temp_pos = temp.part_of_speech.toString();
      if (temp_shape !== '') {
        this.setState({
          Tokentype: 'S',
          type_num: 2,
          type_title: temp.type,
          shape: temp.shapes,
          summary: temp.shapes.join(', '),
          summary_tooltip: 'Shape',
          pos: temp_pos,
          cap: '',
          type_icon: 'format_shapes_icon'
        });
      } else if (temp_pos !== '') {
        this.setState({
          Tokentype: 'S',
          type_num: 2,
          type_title: temp.type,
          summary: temp.part_of_speech.join(', '),
          summary_tooltip: 'Part of speech',
          pos: '',
          cap: '',
          type_icon: 'format_shapes_icon'
        });
      } else {
        this.setState({
          Tokentype: 'S',
          type_num: 2,
          type_title: temp.type,
          summary: 'Any Shape',
          summary_tooltip: 'Shape',
          cap: '',
          pos: '',
          type_icon: 'format_shapes_icon'
        });
      }
    } else if (temp.type === 'punctuation') {
      temp_token = temp.token.toString();
      if (temp_token !== '') {
        this.setState({
          Tokentype: 'P',
          type_num: 3,
          type_title: temp.type,
          token: temp.token,
          cap: '',
          type_icon: 'format_quote_icon',
          summary: temp.token.join('  '),
          summary_tooltip: 'Punctuation'
        });
      } else {
        this.setState({
          Tokentype: 'P',
          type_num: 3,
          type_title: temp.type,
          cap: '',
          pos: '',
          type_icon: 'format_quote_icon',
          summary: 'Any Punctuation',
          summary_tooltip: 'Punctuation'
        });
      }
    } else if (temp.type === 'linebreak') {
      var temp_length = temp.length.toString();
      if (temp_length !== '') {
        this.setState({
          Tokentype: 'L',
          type_num: 4,
          type_title: temp.type,
          length: temp.length,
          cap: '',
          type_icon: 'horizontal_split_icon',
          summary: temp_length + ' of line breaks',
          summary_tooltip: 'Line Break'
        });
      } else {
        this.setState({
          Tokentype: 'L',
          type_num: 4,
          type_title: temp.type,
          cap: '',
          pos: '',
          type_icon: 'horizontal_split_icon',
          summary: 'Any LineBreak',
          summary_tooltip: 'Line Break'
        });
      }
    }

    // is required or not
    if (temp.is_required) {
      this.setState({
        required_icon: 'check_circle_icon',
        required_title: 'Required'
      });
    } else {
      this.setState({
        required_icon: 'radio_button_unchecked_icon',
        required_title: 'Optional'
      });
    }

    // is output or not
    if (temp.is_in_output) {
      this.setState({
        output_icon: 'visibility_icon',
        output_title: 'Part of Output'
      });
    } else {
      this.setState({
        output_icon: 'visibility_off_icon',
        output_title: 'Not Output'
      });
    }

    this.setState({
      index: this.props.index,
      myToken: this.props.testjson
    });
  }

  handleEditClick = () => {
    console.log('edit tokenitem');
    this.setState({
      dialogdisplay: true,
      is_new: 0
    });
  };

  handleAddClick = () => {
    console.log('add new tokenitem');
    this.setState({
      dialogdisplay: true,
      is_new: 2
    });
  };

  handleDelete = () => {
    this.props.deleteItem(this.state.index);
  };

  handleAdd = new_token_data => {
    this.props.addItem(new_token_data, this.state.index);
  };

  handleClose = () => {
    this.setState({
      dialogdisplay: false
    });
  };

  handleUpdate(child_token_data, child_dialogdispaly) {
    if (this.state.is_new === 2) {
      this.props.addItem(child_token_data, this.state.index);
    } else {
      var temp = child_token_data;
      console.log('update tokenitem');
      // console.log(temp);
      if (temp.type === 'word') {
        var temp_token = temp.token.toString();
        var temp_pos = temp.part_of_speech.toString();
        var temp_cap = temp.capitalization.toString();
        if (temp_token !== '') {
          this.setState({
            Tokentype: 'W',
            type_num: 0,
            type_title: temp.type,
            token: temp.token,
            summary: temp.token.join(', '),
            summary_tooltip: 'Word',
            cap: temp_cap,
            pos: temp_pos,
            type_icon: 'notes_icon'
          });
        } else if (temp_pos !== '') {
          this.setState({
            Tokentype: 'W',
            type_num: 0,
            type_title: temp.type,
            summary: temp.part_of_speech.join(', '),
            summary_tooltip: 'Part of speech',
            pos: '',
            cap: temp_cap,
            type_icon: 'notes_icon'
          });
        } else {
          this.setState({
            Tokentype: 'W',
            type_num: 0,
            type_title: temp.type,
            summary_tooltip: 'Word',
            summary: '[]',
            cap: temp_cap,
            pos: temp_pos,
            type_icon: 'notes_icon'
          });
        }
      } else if (temp.type === 'number') {
        var temp_num = temp.numbers.toString();
        if (temp_num !== '') {
          this.setState({
            Tokentype: '#',
            type_num: 1,
            type_title: temp.type,
            summary: temp.numbers.join(', '),
            summary_tooltip: 'Number',
            num: temp.numbers,
            min: temp.minimum,
            max: temp.maximum,
            cap: '',
            type_icon: 'filter_1_icon'
          });
        } else if (temp.minimum !== '' || temp.maximum !== '') {
          this.setState({
            Tokentype: '#',
            type_num: 1,
            type_title: temp.type,
            summary: temp.minimum + ' - ' + temp.maximum,
            summary_tooltip: 'MIN - MAX',
            min: temp.minimum,
            max: temp.maximum,
            cap: '',
            pos: '',
            type_icon: 'filter_1_icon'
          });
        } else {
          this.setState({
            Tokentype: '#',
            type_num: 1,
            type_title: temp.type,
            summary: 'Any Number',
            summary_tooltip: 'Number',
            cap: '',
            pos: '',
            type_icon: 'filter_1_icon'
          });
        }
      } else if (temp.type === 'shape') {
        var temp_shape = temp.shapes.toString();
        temp_pos = temp.part_of_speech.toString();
        if (temp_shape !== '') {
          this.setState({
            Tokentype: 'S',
            type_num: 2,
            type_title: temp.type,
            shape: temp.shapes,
            summary: temp.shapes.join(', '),
            summary_tooltip: 'Shape',
            pos: temp_pos,
            cap: '',
            type_icon: 'format_shapes_icon'
          });
        } else if (temp_pos !== '') {
          this.setState({
            Tokentype: 'S',
            type_num: 2,
            type_title: temp.type,
            summary: temp.part_of_speech.join(', '),
            summary_tooltip: 'Part of speech',
            pos: '',
            cap: '',
            type_icon: 'format_shapes_icon'
          });
        } else {
          this.setState({
            Tokentype: 'S',
            type_num: 2,
            type_title: temp.type,
            summary: 'Any Shape',
            summary_tooltip: 'Shape',
            cap: '',
            pos: '',
            type_icon: 'format_shapes_icon'
          });
        }
      } else if (temp.type === 'punctuation') {
        temp_token = temp.token.toString();
        if (temp_token !== '') {
          this.setState({
            Tokentype: 'P',
            type_num: 3,
            type_title: temp.type,
            token: temp.token,
            cap: '',
            type_icon: 'format_quote_icon',
            summary: temp.token.join('  '),
            summary_tooltip: 'Punctuation'
          });
        } else {
          this.setState({
            Tokentype: 'P',
            type_num: 3,
            type_title: temp.type,
            cap: '',
            pos: '',
            type_icon: 'format_quote_icon',
            summary: 'Any Punctuation',
            summary_tooltip: 'Punctuation'
          });
        }
      } else if (temp.type === 'linebreak') {
        var temp_length = temp.length.toString();
        if (temp_length !== '') {
          this.setState({
            Tokentype: 'L',
            type_num: 4,
            type_title: temp.type,
            length: temp.length,
            cap: '',
            type_icon: 'horizontal_split_icon',
            summary: temp_length + ' of line breaks',
            summary_tooltip: 'Line Break'
          });
        } else {
          this.setState({
            Tokentype: 'L',
            type_num: 4,
            type_title: temp.type,
            cap: '',
            pos: '',
            type_icon: 'horizontal_split_icon',
            summary: 'Any LineBreak',
            summary_tooltip: 'Line Break'
          });
        }
      }

      // is required or not
      if (temp.is_required) {
        this.setState({
          required_icon: 'check_circle_icon',
          required_title: 'Required'
        });
      } else {
        this.setState({
          required_icon: 'radio_button_unchecked_icon',
          required_title: 'Optional'
        });
      }

      // is output or not
      if (temp.is_in_output) {
        this.setState({
          output_icon: 'visibility_icon',
          output_title: 'Part of Output'
        });
      } else {
        this.setState({
          output_icon: 'visibility_off_icon',
          output_title: 'Not Output'
        });
      }
      this.props.updateItem(child_token_data, this.state.index);
      this.setState({
        myToken: child_token_data
      });
    }

    this.setState({
      dialogdisplay: child_dialogdispaly
    });
  }

  // cwrp
  componentWillReceiveProps(nextProps) {
    var temp = nextProps.testjson;
    // console.log("cwrp tokenitem");
    // console.log(temp);
    if (temp.type === 'word') {
      var temp_token = temp.token.toString();
      var temp_pos = temp.part_of_speech.toString();
      var temp_cap = temp.capitalization.toString();
      if (temp_token !== '') {
        this.setState({
          Tokentype: 'W',
          type_num: 0,
          type_title: temp.type,
          token: temp.token,
          summary: temp.token.join(', '),
          summary_tooltip: 'Word',
          cap: temp_cap,
          pos: temp_pos,
          type_icon: 'notes_icon'
        });
      } else if (temp_pos !== '') {
        this.setState({
          Tokentype: 'W',
          type_num: 0,
          type_title: temp.type,
          summary: temp.part_of_speech.join(', '),
          summary_tooltip: 'Part of speech',
          pos: '',
          cap: temp_cap,
          type_icon: 'notes_icon'
        });
      } else {
        this.setState({
          Tokentype: 'W',
          type_num: 0,
          type_title: temp.type,
          summary_tooltip: 'Word',
          summary: '[]',
          cap: temp_cap,
          pos: temp_pos,
          type_icon: 'notes_icon'
        });
      }
    } else if (temp.type === 'number') {
      var temp_num = temp.numbers.toString();
      if (temp_num !== '') {
        this.setState({
          Tokentype: '#',
          type_num: 1,
          type_title: temp.type,
          summary: temp.numbers.join(', '),
          summary_tooltip: 'Number',
          num: temp.numbers,
          min: temp.minimum,
          max: temp.maximum,
          cap: '',
          type_icon: 'filter_1_icon'
        });
      } else if (temp.minimum !== '' || temp.maximum !== '') {
        this.setState({
          Tokentype: '#',
          type_num: 1,
          type_title: temp.type,
          summary: temp.minimum + ' - ' + temp.maximum,
          summary_tooltip: 'MIN - MAX',
          min: temp.minimum,
          max: temp.maximum,
          cap: '',
          pos: '',
          type_icon: 'filter_1_icon'
        });
      } else {
        this.setState({
          Tokentype: '#',
          type_num: 1,
          type_title: temp.type,
          summary: 'Any Number',
          summary_tooltip: 'Number',
          cap: '',
          pos: '',
          type_icon: 'filter_1_icon'
        });
      }
    } else if (temp.type === 'shape') {
      var temp_shape = temp.shapes.toString();
      temp_pos = temp.part_of_speech.toString();
      if (temp_shape !== '') {
        this.setState({
          Tokentype: 'S',
          type_num: 2,
          type_title: temp.type,
          shape: temp.shapes,
          summary: temp.shapes.join(', '),
          summary_tooltip: 'Shape',
          pos: temp_pos,
          cap: '',
          type_icon: 'format_shapes_icon'
        });
      } else if (temp_pos !== '') {
        this.setState({
          Tokentype: 'S',
          type_num: 2,
          type_title: temp.type,
          summary: temp.part_of_speech.join(', '),
          summary_tooltip: 'Part of speech',
          pos: '',
          cap: '',
          type_icon: 'format_shapes_icon'
        });
      } else {
        this.setState({
          Tokentype: 'S',
          type_num: 2,
          type_title: temp.type,
          summary: 'Any Shape',
          summary_tooltip: 'Shape',
          cap: '',
          pos: '',
          type_icon: 'format_shapes_icon'
        });
      }
    } else if (temp.type === 'punctuation') {
      temp_token = temp.token.toString();
      if (temp_token !== '') {
        this.setState({
          Tokentype: 'P',
          type_num: 3,
          type_title: temp.type,
          token: temp.token,
          cap: '',
          type_icon: 'format_quote_icon',
          summary: temp.token.join('  '),
          summary_tooltip: 'Punctuation'
        });
      } else {
        this.setState({
          Tokentype: 'P',
          type_num: 3,
          type_title: temp.type,
          cap: '',
          pos: '',
          type_icon: 'format_quote_icon',
          summary: 'Any Punctuation',
          summary_tooltip: 'Punctuation'
        });
      }
    } else if (temp.type === 'linebreak') {
      var temp_length = temp.length.toString();
      if (temp_length !== '') {
        this.setState({
          Tokentype: 'L',
          type_num: 4,
          type_title: temp.type,
          length: temp.length,
          cap: '',
          type_icon: 'horizontal_split_icon',
          summary: temp_length + ' of line breaks',
          summary_tooltip: 'Line Break'
        });
      } else {
        this.setState({
          Tokentype: 'L',
          type_num: 4,
          type_title: temp.type,
          cap: '',
          pos: '',
          type_icon: 'horizontal_split_icon',
          summary: 'Any LineBreak',
          summary_tooltip: 'Line Break'
        });
      }
    }

    // is required or not
    if (temp.is_required) {
      this.setState({
        required_icon: 'check_circle_icon',
        required_title: 'Required'
      });
    } else {
      this.setState({
        required_icon: 'radio_button_unchecked_icon',
        required_title: 'Optional'
      });
    }

    // is output or not
    if (temp.is_in_output) {
      this.setState({
        output_icon: 'visibility_icon',
        output_title: 'Part of Output'
      });
    } else {
      this.setState({
        output_icon: 'visibility_off_icon',
        output_title: 'Not Output'
      });
    }

    this.setState({
      myToken: nextProps.testjson
    });
  }

  render() {
    const { classes } = this.props;
    sub_info = this.generateSubinfo(this.state.cap, this.state.pos);
    const token_tooltip_index = 'token_tooltip_' + this.state.index;
    const type_icon_index = 'type_icon_' + this.state.index;
    const output_icon_index = 'output_icon_' + this.state.index;
    const required_icon_index = 'required_icon' + this.state.index;

    return (
      <ListItem className={classes.list_item}>
        <ListItemIcon data-tip data-for={type_icon_index}>
          <Icon className={classes.icon}>{this.state.type_icon}</Icon>
        </ListItemIcon>
        <ReactTooltip id={type_icon_index} type="info" effect="solid">
          <span>{this.state.type_title}</span>
        </ReactTooltip>

        <ListItemIcon data-tip data-for={output_icon_index}>
          <Icon className={classes.icon}>{this.state.output_icon}</Icon>
        </ListItemIcon>
        <ReactTooltip id={output_icon_index} type="info" effect="solid">
          <span>{this.state.output_title}</span>
        </ReactTooltip>

        <ListItemIcon data-tip data-for={required_icon_index}>
          <Icon className={classes.icon}>{this.state.required_icon}</Icon>
        </ListItemIcon>
        <ReactTooltip id={required_icon_index} type="info" effect="solid">
          <span>{this.state.required_title}</span>
        </ReactTooltip>

        <ListItemText
          data-tip
          data-for={token_tooltip_index}
          primary={<div className="token_item_text">{this.state.summary}</div>}
          secondary={sub_info}
        />
        <ReactTooltip id={token_tooltip_index} type="info" effect="solid">
          <span>{this.state.summary_tooltip}</span>
        </ReactTooltip>

        <IconButton
          color="primary"
          aria-label="Add"
          onClick={this.handleAddClick}
        >
          <AddIcon />
        </IconButton>
        <IconButton aria-label="Edit" onClick={this.handleEditClick}>
          <Icon>edit_icon</Icon>
        </IconButton>
        <IconButton
          color="secondary"
          aria-label="Delete"
          onClick={this.handleDelete}
        >
          <DeleteIcon />
        </IconButton>
        <EditorModal
          current_data={this.state.myToken}
          dialogdisplay={this.state.dialogdisplay}
          type_num={this.state.type_num}
          is_New={this.state.is_new}
          updateItem={this.handleUpdate}
          addItem={this.handleAdd}
          handleCancel={this.handleClose}
        />
      </ListItem>
    );
  }
}

export default withStyles(styles)(Tokenitem);
