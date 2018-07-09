import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const styles = theme => ({
  input_Number: {
    display: 'flex',
    width: '100%'
    // backgroundColor: "#FAFAFA"
  },

  input_Area: {
    width: '100%'
  },

  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 120
  }
});

class NumberEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token_data: [],
      output: false,
      required: false,
      numbers: '',
      length1: '',
      length2: '',
      length3: '',
      length: [],
      max: '',
      min: '',
      error: null,
      errorInfo: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleValChange = this.handleValChange.bind(this);
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
      numbers: '',
      length: [],
      length1: '',
      length2: '',
      length3: '',
      max: '',
      min: ''
    });
  }

  componentWillMount() {
    if (this.props.is_new === 0) {
      this.setState({
        token_data: this.props.token_data,
        output: this.props.token_data.is_in_output,
        required: this.props.token_data.is_required,
        numbers: this.props.token_data.numbers.join(' '),
        length1: this.props.token_data.length[0],
        length2: this.props.token_data.length[1],
        length3: this.props.token_data.length[2],
        max: this.props.token_data.maximum,
        min: this.props.token_data.minimum
      });
    } else {
      this.resetState();
    }
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked }, () => {
      var temp = this.state.token_data;
      temp['is_in_output'] = this.state.output;
      temp['is_required'] = this.state.required;
      temp['type'] = 'number';
      this.props.callback(temp);
    });
  };

  handleValChange = name => event => {
    this.setState({ [name]: event.target.value }, () => {
      var temp = this.state.token_data;
      if (name === 'numbers') {
        var num_arr = this.state.numbers.split(' ');
        temp['numbers'] = num_arr;
      } else if (name === 'max') {
        temp['maximum'] = this.state.max;
      } else if (name === 'min') {
        temp['minimum'] = this.state.min;
      } else {
        if (this.state.length1 !== '') {
          temp['length'][0] = this.state.length1;
        }
        if (this.state.length2 !== '') {
          temp['length'][1] = this.state.length2;
        }
        if (this.state.length3 !== '') {
          temp['length'][2] = this.state.length3;
        }
      }
      temp['type'] = 'number';
      this.props.callback(temp);
    });
  };

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    // You can also log error messages to an error reporting service here
  }

  render() {
    console.log('number editor');
    if (this.state.errorInfo) {
      // Error path
      return (
        <div>
          <h2>Sorry, we have some errors.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    const { classes } = this.props;
    const inputProps = {
      disableUnderline: true
    };
    return (
      <List className="Number_wrapper">
        <ListItem className={classes.input_Number}>
          <FormControl component="fieldset" className={classes.input_Area}>
            <FormLabel component="legend">Numbers:</FormLabel>
            <FormGroup>
              <Paper className="input_wrapper">
                <TextField
                  id="multiline-flexible"
                  multiline
                  rows="5"
                  placeholder="Enter your numbers and use space to separate them"
                  value={this.state.numbers}
                  fullWidth
                  InputProps={inputProps}
                  onChange={this.handleValChange('numbers')}
                />
              </Paper>
            </FormGroup>
          </FormControl>
        </ListItem>

        <Divider />

        <ListItem className="Number_props">
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
            <FormLabel component="legend">Length:</FormLabel>
            <FormGroup row>
              <TextField
                label="Length 1"
                id="margin-normal"
                className={classes.textField}
                value={this.state.length1}
                margin="normal"
                onChange={this.handleValChange('length1')}
              />
              <TextField
                label="Length 2"
                id="margin-normal"
                className={classes.textField}
                value={this.state.length2}
                margin="normal"
                onChange={this.handleValChange('length2')}
              />
              <TextField
                label="Length 3"
                id="margin-normal"
                className={classes.textField}
                value={this.state.length3}
                margin="normal"
                onChange={this.handleValChange('length3')}
              />
            </FormGroup>
          </FormControl>
        </ListItem>
        <Divider />
        <ListItem className="max_min">
          <FormControl component="fieldset">
            <FormLabel component="legend">Min - Max:</FormLabel>
            <FormGroup row>
              <TextField
                label="Min"
                id="margin-normal"
                className={classes.textField}
                value={this.state.min}
                margin="normal"
                onChange={this.handleValChange('min')}
              />
              <TextField
                label="Max"
                id="margin-normal"
                className={classes.textField}
                value={this.state.max}
                margin="normal"
                onChange={this.handleValChange('max')}
              />
            </FormGroup>
          </FormControl>
        </ListItem>
      </List>
    );
  }
}
export default withStyles(styles)(NumberEditor);
