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
  input_Shape: {
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

//Define some constants here.
window.POS_noun = 'noun';
window.POS_pronoun = 'pronoun';
window.POS_propernoun = 'proper noun';
window.POS_determiner = 'determiner';
window.POS_symbol = 'symbol';
window.POS_adjective = 'adjective';
window.POS_conjunction = 'conjunction';
window.POS_verb = 'verb';
window.POS_pre_post_position = 'pre/post-position';
window.POS_adverb = 'adverb';
window.POS_particle = 'particle';
window.POS_interjection = 'interjection';

class ShapeEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token_data: [],
      output: false,
      required: false,
      shapes: [],
      part_of_speech: [],
      noun: false,
      pronoun: false,
      punctuation: false,
      propernoun: false,
      determiner: false,
      symbol: false,
      adjective: false,
      conjunction: false,
      verb: false,
      prepost_position: false,
      adverb: false,
      particle: false,
      interjection: false,
      prefix: '',
      suffix: ''
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
      is_in_vocabulary: 'false',
      is_out_of_vocabulary: 'false',
      is_required: 'false',
      type: '',
      is_in_output: 'false',
      match_all_forms: 'false',
      contain_digit: 'false'
    };

    this.setState({
      token_data: initial_token_data,
      output: false,
      required: false,
      shapes: [],
      part_of_speech: [],
      noun: false,
      pronoun: false,
      punctuation: false,
      propernoun: false,
      determiner: false,
      symbol: false,
      adjective: false,
      conjunction: false,
      verb: false,
      prepost_position: false,
      adverb: false,
      particle: false,
      interjection: false,
      prefix: '',
      suffix: ''
    });
  }

  componentWillMount() {
    if (this.props.token_data.type === 'shape' && this.props.is_new === 0) {
      this.setState({
        token_data: this.props.token_data,
        output: this.props.token_data.is_in_output,
        required: this.props.token_data.is_required,
        shapes: this.props.token_data.shapes,
        part_of_speech: this.props.token_data.part_of_speech,
        noun:
          this.props.token_data.part_of_speech.indexOf(window.POS_noun) > -1
            ? true
            : false,
        pronoun:
          this.props.token_data.part_of_speech.indexOf(window.POS_pronoun) > -1
            ? true
            : false,
        propernoun:
          this.props.token_data.part_of_speech.indexOf(window.POS_propernoun) >
          -1
            ? true
            : false,
        determiner:
          this.props.token_data.part_of_speech.indexOf(window.POS_determiner) >
          -1
            ? true
            : false,
        symbol:
          this.props.token_data.part_of_speech.indexOf(window.POS_symbol) > -1
            ? true
            : false,
        adjective:
          this.props.token_data.part_of_speech.indexOf(window.POS_adjective) >
          -1
            ? true
            : false,
        conjunction:
          this.props.token_data.part_of_speech.indexOf(window.POS_conjunction) >
          -1
            ? true
            : false,
        verb:
          this.props.token_data.part_of_speech.indexOf(window.POS_verb) > -1
            ? true
            : false,
        prepost_position:
          this.props.token_data.part_of_speech.indexOf(
            window.POS_pre_post_position
          ) > -1
            ? true
            : false,
        adverb:
          this.props.token_data.part_of_speech.indexOf(window.POS_adverb) > -1
            ? true
            : false,
        particle:
          this.props.token_data.part_of_speech.indexOf(window.POS_particle) > -1
            ? true
            : false,
        interjection:
          this.props.token_data.part_of_speech.indexOf(
            window.POS_interjection
          ) > -1
            ? true
            : false,
        prefix: this.props.token_data.prefix,
        suffix: this.props.token_data.suffix
      });
    } else {
      this.resetState();
    }
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked }, () => {
      var temp = this.state.token_data;
      temp['part_of_speech'] = this.createAllPartofSpeech();
      temp['is_in_output'] = this.state.output;
      temp['is_required'] = this.state.required;
      temp['type'] = 'shape';
      this.props.callback(temp);
    });
  };

  handleValChange = name => event => {
    this.setState({ [name]: event.target.value }, () => {
      var temp = this.state.token_data;
      if (name === 'prefix') {
        temp['prefix'] = this.state.prefix;
      } else if (name === 'suffix') {
        temp['suffix'] = this.state.suffix;
      } else if (name === 'shapes') {
        var shape_arr = this.state.shapes.split(' ');
        temp['shapes'] = shape_arr;
      }
      temp['type'] = 'shape';
      this.props.callback(temp);
    });
  };

  createAllPartofSpeech() {
    var allPoS = [];
    if (this.state.noun) allPoS.push('noun');
    if (this.state.pronoun) allPoS.push('pronoun');
    if (this.state.punctuation) allPoS.push('punctuation');
    if (this.state.propernoun) allPoS.push('propernoun');
    if (this.state.determiner) allPoS.push('determiner');
    if (this.state.symbol) allPoS.push('symbol');
    if (this.state.adjective) allPoS.push('adjective');
    if (this.state.conjunction) allPoS.push('conjunction');
    if (this.state.verb) allPoS.push('verb');
    if (this.state.prepost_position) allPoS.push('pre/post-position');
    if (this.state.adverb) allPoS.push('adverb');
    if (this.state.particle) allPoS.push('particle');
    if (this.state.interjection) allPoS.push('interjection');
    return allPoS;
  }

  render() {
    const { classes } = this.props;
    const inputProps = {
      disableUnderline: true
    };
    return (
      <List className="Shape_wrapper">
        <ListItem className={classes.input_Shape}>
          <FormControl component="fieldset" className={classes.input_Area}>
            <FormLabel component="legend">Shapes:</FormLabel>
            <FormGroup>
              <Paper className="input_wrapper">
                <TextField
                  id="multiline-flexible"
                  multiline
                  rows="5"
                  placeholder="Enter shapes such as ddd, XXXX, Xx and use space to separate the shapes. d is for digits and x for letter, X for capital letter."
                  value={this.state.shapes}
                  fullWidth
                  onChange={this.handleValChange('shapes')}
                  InputProps={inputProps}
                />
              </Paper>
            </FormGroup>
          </FormControl>
        </ListItem>

        <Divider />

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

        <ListItem className="part_of_speech">
          <FormControl component="fieldset">
            <FormLabel component="legend">Part of speech:</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.noun}
                    onChange={this.handleChange('noun')}
                    value="noun"
                  />
                }
                label="noun"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.pronoun}
                    onChange={this.handleChange('pronoun')}
                    value="pronoun"
                  />
                }
                label="pronoun"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.propernoun}
                    onChange={this.handleChange('propernoun')}
                    value="propernoun"
                  />
                }
                label="proper noun"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.determiner}
                    onChange={this.handleChange('determiner')}
                    value="determiner"
                  />
                }
                label="determiner"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.symbol}
                    onChange={this.handleChange('symbol')}
                    value="symbol"
                  />
                }
                label="symbol"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.adjective}
                    onChange={this.handleChange('adjective')}
                    value="adjective"
                  />
                }
                label="adjective"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.conjunction}
                    onChange={this.handleChange('conjunction')}
                    value="conjunction"
                  />
                }
                label="conjunction"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.verb}
                    onChange={this.handleChange('verb')}
                    value="verb"
                  />
                }
                label="verb"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.prepost_position}
                    onChange={this.handleChange('prepost_position')}
                    value="prepost_position"
                  />
                }
                label="pre/post-position"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.adverb}
                    onChange={this.handleChange('adverb')}
                    value="adverb"
                  />
                }
                label="adverb"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.particle}
                    onChange={this.handleChange('particle')}
                    value="particle"
                  />
                }
                label="particle"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.interjection}
                    onChange={this.handleChange('interjection')}
                    value="interjection"
                  />
                }
                label="interjection"
              />
            </FormGroup>
          </FormControl>
        </ListItem>

        <Divider />

        <Divider />
        <ListItem className="other">
          <FormControl component="fieldset">
            <FormLabel component="legend">Other:</FormLabel>
            <FormGroup row>
              <TextField
                label="Prefix"
                id="margin-normal"
                className={classes.textField}
                value={this.state.prefix}
                margin="normal"
                onChange={this.handleValChange('prefix')}
              />
              <TextField
                label="Suffix"
                id="margin-normal"
                className={classes.textField}
                value={this.state.suffix}
                margin="normal"
                onChange={this.handleValChange('suffix')}
              />
            </FormGroup>
          </FormControl>
        </ListItem>
      </List>
    );
  }
}
export default withStyles(styles)(ShapeEditor);
