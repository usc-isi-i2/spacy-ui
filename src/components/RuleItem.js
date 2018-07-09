import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ListItem.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import ReactTooltip from 'react-tooltip';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const styles = theme => ({
  icon: {
    margin: theme.spacing.unit
  },
  index: {
    fontWeight: 800,
    color: '#3f51b5',
    fontSize: '1.1em'
  },

  list_item: {
    paddingBottom: 0,
    paddingTop: 0
  }
});

class RuleItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      errorInfo: null,
      index: 0,
      description: '',
      identifier: '',
      is_active: true,
      summary: 'summary of rule',
      summary_tooltip: '',
      polarity: true,
      rule_json: {},
      pattern: [],
      path: {
        pathname: '/token',
        state: {}
      }
    };
  }

  componentWillMount() {
    // console.log("cwm ruleitem");
    if (this.props.single_rule_json.description !== '') {
      this.setState({
        summary: this.props.single_rule_json.description,
        summary_tooltip: 'Description'
      });
    } else {
      this.setState({
        summary: this.props.single_rule_json.identifier,
        summary_tooltip: 'Rule Identifier'
      });
    }

    var temp = this.state.path;
    temp.state = {
      rule: this.props.single_rule_json,
      rule_index: this.props.index,
      rules_data: this.props.rules_json,
      test_text: this.props.test_text,
      webServiceUrl: this.props.webServiceUrl
    };
    console.log('single_rule_json.is_active');
    console.log(this.props.single_rule_json.is_active);
    this.setState({
      index: this.props.index,
      rule_json: this.props.single_rule_json,
      description: this.props.single_rule_json.description,
      identifier: this.props.single_rule_json.identifier,
      is_active: this.props.single_rule_json.is_active,
      polarity: this.props.single_rule_json.polarity,
      pattern: this.props.single_rule_json.pattern,
      path: temp
    });
  }

  handleDelete = () => {
    console.log('delete rule item');
    console.log(this.state.index);
    this.props.deleteItem(this.state.index);
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
    this.props.handleActive(event.target.checked, this.state.index);
  };

  // cwrp
  componentWillReceiveProps(nextProps) {
    var temp = nextProps.single_rule_json;
    console.log('Cwrp rule item');
    console.log(nextProps.test_text);
    if (temp.description !== '') {
      this.setState({
        summary: temp.description,
        summary_tooltip: 'Description'
      });
    } else {
      this.setState({
        summary: temp.identifier,
        summary_tooltip: 'Rule Identifier'
      });
    }

    var temp_path = this.state.path;
    temp_path.state = {
      rule: nextProps.single_rule_json,
      rule_index: nextProps.index,
      rules_data: nextProps.rules_json,
      test_text: nextProps.test_text,
      webServiceUrl: nextProps.webServiceUrl
    };

    this.setState({
      index: nextProps.index,
      rule_json: temp,
      description: temp.description,
      identifier: temp.identifier,
      is_active: temp.is_active,
      polarity: temp.polarity,
      pattern: temp.pattern,
      path: temp_path
    });
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
    console.log('rule item render');
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
    const tooltip_index = 'rule_tooltip_' + this.state.index;
    return (
      <ListItem className={classes.list_item}>
        <FormControl component="fieldset">
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.is_active}
                  onChange={this.handleChange('is_active')}
                  value="is_active"
                />
              }
            />
          </FormGroup>
        </FormControl>

        <span className={classes.index}>{this.state.index + 1}</span>

        <ListItemText
          primary={this.state.summary}
          primaryTypographyProps={{
            id: 'item_text'
          }}
          data-tip
          data-for={tooltip_index}
        />
        <ReactTooltip
          id={tooltip_index}
          type="info"
          effect="solid"
          wrapper="span"
        >
          {this.state.summary_tooltip}
        </ReactTooltip>

        <IconButton aria-label="Edit" component={Link} to={this.state.path}>
          <Icon>edit_icon</Icon>
        </IconButton>

        <IconButton
          color="secondary"
          aria-label="Delete"
          onClick={this.handleDelete}
        >
          <DeleteIcon />
        </IconButton>
      </ListItem>
    );
  }
}

export default withStyles(styles)(RuleItem);
