import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';

const styles = theme => ({
  input_Shape: {
    display: 'flex',
    width: '100%'
    // backgroundColor: "#FAFAFA"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 120
  }
});

class LineBreakEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      output: false,
      required: false,
      length: '',
      token_data: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  resetState() {
    const initial_token_data = {
      prefix: '',
      suffix: '',
      capitalization: [],
      part_of_speech: [],
      length: [],
      maximum: '',
      minimum: '',
      shapes: [],
      token: [],
      numbers: [],
      is_in_vocabulary: false,
      is_out_of_vocabulary: false,
      is_required: false,
      type: '',
      is_in_output: false,
      match_all_forms: false,
      contain_digit: false
    };

    this.setState({
      token_data: initial_token_data,
      output: false,
      required: false,
      length: ''
    });
  }

  componentWillMount() {
    if (this.props.token_data.type === 'linebreak' && this.props.is_new === 0) {
      this.setState({
        token_data: this.props.token_data,
        output: this.props.token_data.is_in_output,
        required: this.props.token_data.is_required,
        length: this.props.token_data.length[0]
          ? this.props.token_data.length[0]
          : ''
      });
    } else {
      this.resetState();
    }
  }

  handleChange = name => event => {
    var temp = this.state.token_data;
    if (name === 'length') {
      this.setState({ [name]: event.target.value }, () => {
        temp['length'] = [this.state.length];
        temp['type'] = 'linebreak';
        this.props.callback(temp);
      });
    } else {
      this.setState({ [name]: event.target.checked }, () => {
        temp['is_in_output'] = this.state.output;
        temp['is_required'] = this.state.required;
        temp['type'] = 'linebreak';
        this.props.callback(temp);
      });
    }
  };

  render() {
    return (
      <List className="Shape_wrapper">
        <ListItem className="Shape_props">
          <FormControl component="fieldset">
            <FormLabel component="legend">Props:</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.required}
                    onChange={this.handleChange('required')}
                    value="required"
                  />
                }
                label="Required"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.output}
                    onChange={this.handleChange('output')}
                    value="output"
                  />
                }
                label="Part of Output"
              />
            </FormGroup>
          </FormControl>
        </ListItem>

        <Divider />

        <ListItem className="length">
          <FormControl component="fieldset">
            <FormLabel component="legend"># of line breaks:</FormLabel>
            <FormGroup row>
              <Input
                placeholder="Input a number"
                inputProps={{
                  'aria-label': 'length of linebreak'
                }}
                onChange={this.handleChange('length')}
                value={this.state.length}
              />
            </FormGroup>
          </FormControl>
        </ListItem>
      </List>
    );
  }
}

export default withStyles(styles)(LineBreakEditor);
