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
  input_word: {
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

class WordEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      errorInfo: null,
      token_data: [],
      output: false,
      required: false,
      match_all_forms: false,
      contain_digit: false,
      token: [],
      word: '',
      pos: [],
      cap: '',
      // length: [],
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
      exact: false,
      lower: false,
      upper: false,
      title: false,
      mixed: false,
      length1: '',
      length2: '',
      length3: '',
      prefix: '',
      suffix: '',
      notinvocabulary: false,
      invocabulary: false
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
      match_all_forms: false,
      contain_digit: false,
      word: '',
      token: [],
      pos: [],
      cap: '',
      // length: [],
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
      exact: false,
      lower: false,
      upper: false,
      title: false,
      mixed: false,
      length1: '',
      length2: '',
      length3: '',
      prefix: '',
      suffix: '',
      notinvocabulary: false,
      invocabulary: false
    });
  }

  componentWillMount() {
    if (this.props.is_new === 0) {
      this.setState({
        token_data: this.props.token_data,
        output: this.props.token_data.is_in_output,
        required: this.props.token_data.is_required,
        match_all_forms: this.props.token_data.match_all_forms,
        contain_digit: this.props.token_data.contain_digit,
        token: this.props.token_data.token,
        word: this.props.token_data.token.join(' '),
        pos: this.props.token_data.part_of_speech,
        cap: this.props.token_data.capitalization,
        // length: [],
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
        exact:
          this.props.token_data.capitalization.indexOf('exact') > -1
            ? true
            : false,
        lower:
          this.props.token_data.capitalization.indexOf('lower') > -1
            ? true
            : false,
        upper:
          this.props.token_data.capitalization.indexOf('upper') > -1
            ? true
            : false,
        title:
          this.props.token_data.capitalization.indexOf('title') > -1
            ? true
            : false,
        mixed:
          this.props.token_data.capitalization.indexOf('mixed') > -1
            ? true
            : false,
        length1: this.props.token_data.length[0],
        length2: this.props.token_data.length[1],
        length3: this.props.token_data.length[2],
        prefix: this.props.token_data.prefix,
        suffix: this.props.token_data.suffix,
        notinvocabulary:
          this.props.token_data.is_out_of_vocabulary == 'true' ? true : false,
        invocabulary:
          this.props.token_data.is_in_vocabulary == 'true' ? true : false
      });
    } else {
      this.resetState();
    }
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked }, () => {
      var temp = this.state.token_data;
      temp['part_of_speech'] = this.createAllPartofSpeech();
      temp['capitalization'] = this.createAllCapitalization();
      temp['is_in_output'] = this.state.output;
      temp['is_required'] = this.state.required;
      temp['match_all_forms'] = this.state.match_all_forms;
      temp['contain_digit'] = this.state.contain_digit;
      temp['is_in_vocabulary'] = this.state.invocabulary;
      temp['is_out_of_vocabulary'] = this.state.notinvocabulary;
      temp['type'] = 'word';
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
      } else if (name === 'word') {
        var word_arr = this.state.word.split(' ');
        temp['token'] = word_arr;
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
      temp['type'] = 'word';
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

  createAllCapitalization() {
    var allCap = [];
    if (this.state.exact) allCap.push('exact');
    if (this.state.lower) allCap.push('lower');
    if (this.state.upper) allCap.push('upper');
    if (this.state.title) allCap.push('title');
    if (this.state.mixed) allCap.push('mixed');
    return allCap;
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    // You can also log error messages to an error reporting service here
  }

  render() {
    console.log('word editor');
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
      <List className="word_wrapper">
        <ListItem className={classes.input_word}>
          <FormControl component="fieldset" className={classes.input_Area}>
            <FormLabel component="legend">Words:</FormLabel>
            <FormGroup>
              <Paper className="input_wrapper">
                <TextField
                  id="multiline-flexible"
                  multiline
                  rows="5"
                  placeholder="Enter your words and use space to separate them"
                  value={this.state.word}
                  fullWidth
                  InputProps={inputProps}
                  onChange={this.handleValChange('word')}
                />
              </Paper>
            </FormGroup>
          </FormControl>
        </ListItem>

        <Divider />

        <ListItem className="word_props">
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
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.match_all_forms}
                    onChange={this.handleChange('match_all_forms')}
                    value="match_all_forms"
                  />
                }
                label="Match Lemma"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.contain_digit}
                    onChange={this.handleChange('contain_digit')}
                    value="contain_digit"
                  />
                }
                label="Alphanumeric"
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
        <ListItem className="capitalization">
          <FormControl component="fieldset">
            <FormLabel component="legend">Capitalization:</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.exact}
                    onChange={this.handleChange('exact')}
                    value="exact"
                  />
                }
                label="exact"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.lower}
                    onChange={this.handleChange('lower')}
                    value="lower"
                  />
                }
                label="lower"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.upper}
                    onChange={this.handleChange('upper')}
                    value="upper"
                  />
                }
                label="upper"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.title}
                    onChange={this.handleChange('title')}
                    value="title"
                  />
                }
                label="title"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.mixed}
                    onChange={this.handleChange('mixed')}
                    value="mixed"
                  />
                }
                label="mixed"
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
                value={this.state.length1}
                className={classes.textField}
                margin="normal"
              />
              <TextField
                label="Length 2"
                id="margin-normal"
                value={this.state.length2}
                className={classes.textField}
                margin="normal"
              />
              <TextField
                label="Length 3"
                id="margin-normal"
                value={this.state.length3}
                className={classes.textField}
                margin="normal"
              />
            </FormGroup>
          </FormControl>
        </ListItem>
        <Divider />
        <ListItem className="other">
          <FormControl component="fieldset">
            <FormLabel component="legend">Other:</FormLabel>
            <FormGroup row>
              <TextField
                label="Prefix"
                id="margin-normal"
                value={this.state.prefix}
                className={classes.textField}
                margin="normal"
                onChange={this.handleValChange('prefix')}
              />
              <TextField
                label="Suffix"
                id="margin-normal"
                value={this.state.suffix}
                className={classes.textField}
                margin="normal"
                onChange={this.handleValChange('suffix')}
              />
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.notinvocabulary}
                      onChange={this.handleChange('notinvocabulary')}
                      value="notinvocabulary"
                    />
                  }
                  label="not in vocabulary"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.invocabulary}
                      onChange={this.handleChange('invocabulary')}
                      value="invocabulary"
                    />
                  }
                  label="in vocabulary"
                />
              </FormGroup>
            </FormGroup>
          </FormControl>
        </ListItem>
      </List>
    );
  }
}
export default withStyles(styles)(WordEditor);
