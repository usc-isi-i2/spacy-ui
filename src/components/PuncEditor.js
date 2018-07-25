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

const styles = theme => ({
  input_Punc: {
    display: 'flex',
    width: '100%'
    // backgroundColor: "#FAFAFA"
  }
});

class PuncEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token_data: [],
      output: false,
      required: false,
      punctuation_comma: false,
      punctuation_period: false,
      punctuation_semicomma: false,
      punctuation_qmark: false,
      punctuation_tilde: false,
      punctuation_colon: false,
      punctuation_2quote: false,
      punctuation_1quote: false,
      punctuation_plus: false,
      punctuation_underscore: false,
      punctuation_amperand: false,
      punctuation_bang: false,
      punctuation_openbracket: false,
      punctuation_closebracket: false,
      punctuation_open_sbracket: false,
      punctuation_close_sbracket: false,
      punctuation_open_cbracket: false,
      punctuation_close_cbracket: false,
      punctuation_vline: false,
      punctuation_dash: false,
      punctuation_caret: false,
      punctuation_pound: false,
      punctuation_lessthan: false,
      punctuation_greaterthan: false,
      punctuation_equal: false,
      punctuation_percent: false,
      punctuation_backslash: false,
      punctuation_asterisk: false,
      punctuation_dollar: false,
      punctuation_forwardslash: false,
      punctuation_atsign: false
    };
    this.createAllPunctuations = this.createAllPunctuations.bind(this);
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
      punctuation_comma: false,
      punctuation_period: false,
      punctuation_semicomma: false,
      punctuation_qmark: false,
      punctuation_tilde: false,
      punctuation_colon: false,
      punctuation_2quote: false,
      punctuation_1quote: false,
      punctuation_plus: false,
      punctuation_underscore: false,
      punctuation_amperand: false,
      punctuation_bang: false,
      punctuation_openbracket: false,
      punctuation_closebracket: false,
      punctuation_open_sbracket: false,
      punctuation_close_sbracket: false,
      punctuation_open_cbracket: false,
      punctuation_close_cbracket: false,
      punctuation_vline: false,
      punctuation_dash: false,
      punctuation_caret: false,
      punctuation_pound: false,
      punctuation_lessthan: false,
      punctuation_greaterthan: false,
      punctuation_equal: false,
      punctuation_percent: false,
      punctuation_backslash: false,
      punctuation_asterisk: false,
      punctuation_dollar: false,
      punctuation_forwardslash: false,
      punctuation_atsign: false
    });
  }

  componentWillMount() {
    if (
      this.props.token_data.type === 'punctuation' &&
      this.props.is_new === 0
    ) {
      this.setState({
        token_data: this.props.token_data,
        output: this.props.token_data.is_in_output,
        required: this.props.token_data.is_required,
        punctuation_comma: this.props.token_data.token.indexOf(',') > -1,
        punctuation_period: this.props.token_data.token.indexOf('.') > -1,
        punctuation_semicomma: this.props.token_data.token.indexOf(';') > -1,
        punctuation_qmark: this.props.token_data.token.indexOf('?') > -1,
        punctuation_tilde: this.props.token_data.token.indexOf('~') > -1,
        punctuation_colon: this.props.token_data.token.indexOf(':') > -1,
        punctuation_2quote: this.props.token_data.token.indexOf('"') > -1,
        punctuation_1quote: this.props.token_data.token.indexOf("'") > -1,
        punctuation_plus: this.props.token_data.token.indexOf('+') > -1,
        punctuation_underscore: this.props.token_data.token.indexOf('_') > -1,
        punctuation_amperand: this.props.token_data.token.indexOf('&') > -1,
        punctuation_bang: this.props.token_data.token.indexOf('!') > -1,
        punctuation_openbracket: this.props.token_data.token.indexOf('(') > -1,
        punctuation_closebracket: this.props.token_data.token.indexOf(')') > -1,
        punctuation_open_sbracket:
          this.props.token_data.token.indexOf('[') > -1,
        punctuation_close_sbracket:
          this.props.token_data.token.indexOf(']') > -1,
        punctuation_open_cbracket:
          this.props.token_data.token.indexOf('{') > -1,
        punctuation_close_cbracket:
          this.props.token_data.token.indexOf('}') > -1,
        punctuation_vline: this.props.token_data.token.indexOf('|') > -1,
        punctuation_dash: this.props.token_data.token.indexOf('-') > -1,
        punctuation_caret: this.props.token_data.token.indexOf('^') > -1,
        punctuation_pound: this.props.token_data.token.indexOf('#') > -1,
        punctuation_lessthan: this.props.token_data.token.indexOf('<') > -1,
        punctuation_greaterthan: this.props.token_data.token.indexOf('>') > -1,
        punctuation_equal: this.props.token_data.token.indexOf('=') > -1,
        punctuation_percent: this.props.token_data.token.indexOf('%') > -1,
        punctuation_backslash: this.props.token_data.token.indexOf('\\') > -1,
        punctuation_asterisk: this.props.token_data.token.indexOf('*') > -1,
        punctuation_dollar: this.props.token_data.token.indexOf('$') > -1,
        punctuation_forwardslash: this.props.token_data.token.indexOf('/') > -1,
        punctuation_atsign: this.props.token_data.token.indexOf('@') > -1
      });
    } else {
      this.resetState();
    }
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked }, () => {
      var temp = this.state.token_data;
      temp['token'] = this.createAllPunctuations();
      temp['is_in_output'] = this.state.output;
      temp['is_required'] = this.state.required;
      temp['type'] = 'punctuation';
      this.props.callback(temp);
    });
  };

  createAllPunctuations() {
    var allPunct = [];
    if (this.state.punctuation_comma) allPunct.push(',');
    if (this.state.punctuation_period) allPunct.push('.');
    if (this.state.punctuation_semicomma) allPunct.push(';');
    if (this.state.punctuation_qmark) allPunct.push('?');
    if (this.state.punctuation_tilde) allPunct.push('~');
    if (this.state.punctuation_colon) allPunct.push(':');
    if (this.state.punctuation_2quote) allPunct.push('"');
    if (this.state.punctuation_1quote) allPunct.push("'");
    if (this.state.punctuation_plus) allPunct.push('+');
    if (this.state.punctuation_underscore) allPunct.push('_');
    if (this.state.punctuation_amperand) allPunct.push('&');
    if (this.state.punctuation_bang) allPunct.push('!');
    if (this.state.punctuation_openbracket) allPunct.push('(');
    if (this.state.punctuation_closebracket) allPunct.push(')');
    if (this.state.punctuation_open_sbracket) allPunct.push('[');
    if (this.state.punctuation_close_sbracket) allPunct.push(']');
    if (this.state.punctuation_open_cbracket) allPunct.push('{');
    if (this.state.punctuation_close_cbracket) allPunct.push('}');
    if (this.state.punctuation_vline) allPunct.push('|');
    if (this.state.punctuation_dash) allPunct.push('-');
    if (this.state.punctuation_caret) allPunct.push('^');
    if (this.state.punctuation_pound) allPunct.push('#');
    if (this.state.punctuation_lessthan) allPunct.push('<');
    if (this.state.punctuation_greaterthan) allPunct.push('>');
    if (this.state.punctuation_equal) allPunct.push('=');
    if (this.state.punctuation_percent) allPunct.push('%');
    if (this.state.punctuation_backslash) allPunct.push('\\');
    if (this.state.punctuation_asterisk) allPunct.push('*');
    if (this.state.punctuation_dollar) allPunct.push('$');
    if (this.state.punctuation_forwardslash) allPunct.push('/');
    if (this.state.punctuation_atsign) allPunct.push('@');
    return allPunct;
  }

  render() {
    console.log('punctuation editor');
    return (
      <List className="Punc_wrapper">
        <ListItem className="Punc_props">
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
            <FormLabel component="legend">Punctuation Symbols:</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.punctuation_comma}
                    onChange={this.handleChange('punctuation_comma')}
                    value="punctuation_comma"
                  />
                }
                label=","
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.punctuation_period}
                    onChange={this.handleChange('punctuation_period')}
                    value="punctuation_period"
                  />
                }
                label="."
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.punctuation_semicomma}
                    onChange={this.handleChange('punctuation_semicomma')}
                    value="punctuation_semicomma"
                  />
                }
                label=";"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.punctuation_qmark}
                    onChange={this.handleChange('punctuation_qmark')}
                    value="punctuation_qmark"
                  />
                }
                label="?"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.punctuation_tilde}
                    onChange={this.handleChange('punctuation_tilde')}
                    value="punctuation_tilde"
                  />
                }
                label="~"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.punctuation_colon}
                    onChange={this.handleChange('punctuation_colon')}
                    value="punctuation_colon"
                  />
                }
                label=":"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.punctuation_2quote}
                    onChange={this.handleChange('punctuation_2quote')}
                    value="punctuation_2quote"
                  />
                }
                label="&quot;"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.punctuation_1quote}
                    onChange={this.handleChange('punctuation_1quote')}
                    value="punctuation_1quote"
                  />
                }
                label="'"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.punctuation_plus}
                    onChange={this.handleChange('punctuation_plus')}
                    value="punctuation_plus"
                  />
                }
                label="+"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.punctuation_underscore}
                    onChange={this.handleChange('punctuation_underscore')}
                    value="punctuation_underscore"
                  />
                }
                label="_"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.punctuation_amperand}
                    onChange={this.handleChange('punctuation_amperand')}
                    value="punctuation_amperand"
                  />
                }
                label="&"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.punctuation_bang}
                    onChange={this.handleChange('punctuation_bang')}
                    value="punctuation_bang"
                  />
                }
                label="!"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.punctuation_openbracket}
                    onChange={this.handleChange('punctuation_openbracket')}
                    value="punctuation_openbracket"
                  />
                }
                label="("
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.punctuation_closebracket}
                    onChange={this.handleChange('punctuation_closebracket')}
                    value="punctuation_closebracket"
                  />
                }
                label=")"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.punctuation_open_sbracket}
                    onChange={this.handleChange('punctuation_open_sbracket')}
                    value="punctuation_open_sbracket"
                  />
                }
                label="["
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.punctuation_close_sbracket}
                    onChange={this.handleChange('punctuation_close_sbracket')}
                    value="punctuation_close_sbracket"
                  />
                }
                label="]"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.punctuation_open_cbracket}
                    onChange={this.handleChange('punctuation_open_cbracket')}
                    value="punctuation_open_cbracket"
                  />
                }
                label="{"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.punctuation_close_cbracket}
                    onChange={this.handleChange('punctuation_close_cbracket')}
                    value="punctuation_close_cbracket"
                  />
                }
                label="}"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.punctuation_vline}
                    onChange={this.handleChange('punctuation_vline')}
                    value="punctuation_vline"
                  />
                }
                label="|"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.punctuation_dash}
                    onChange={this.handleChange('punctuation_dash')}
                    value="punctuation_dash"
                  />
                }
                label="-"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.punctuation_caret}
                    onChange={this.handleChange('punctuation_caret')}
                    value="punctuation_caret"
                  />
                }
                label="^"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.punctuation_pound}
                    onChange={this.handleChange('punctuation_pound')}
                    value="punctuation_pound"
                  />
                }
                label="#"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.punctuation_lessthan}
                    onChange={this.handleChange('punctuation_lessthan')}
                    value="punctuation_lessthan"
                  />
                }
                label="<"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.punctuation_greaterthan}
                    onChange={this.handleChange('punctuation_greaterthan')}
                    value="punctuation_greaterthan"
                  />
                }
                label=">"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.punctuation_equal}
                    onChange={this.handleChange('punctuation_equal')}
                    value="punctuation_equal"
                  />
                }
                label="="
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.punctuation_percent}
                    onChange={this.handleChange('punctuation_percent')}
                    value="punctuation_percent"
                  />
                }
                label="%"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.punctuation_backslash}
                    onChange={this.handleChange('punctuation_backslash')}
                    value="punctuation_backslash"
                  />
                }
                label="\"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.punctuation_forwardslash}
                    onChange={this.handleChange('punctuation_forwardslash')}
                    value="punctuation_forwardslash"
                  />
                }
                label="/"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.punctuation_asterisk}
                    onChange={this.handleChange('punctuation_asterisk')}
                    value="punctuation_asterisk"
                  />
                }
                label="*"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.punctuation_dollar}
                    onChange={this.handleChange('punctuation_dollar')}
                    value="punctuation_dollar"
                  />
                }
                label="$"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.punctuation_atsign}
                    onChange={this.handleChange('punctuation_atsign')}
                    value="punctuation_atsign"
                  />
                }
                label="@"
              />
            </FormGroup>
          </FormControl>
        </ListItem>
      </List>
    );
  }
}
export default withStyles(styles)(PuncEditor);
