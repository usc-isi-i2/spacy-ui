import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import RuleItem from './RuleItem';
import AddIcon from '@material-ui/icons/Add';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    height: '100%'
  },

  paper: {
    opacity: 0.6,
    borderRadius: '1em'
  },

  list_container: {
    height: '100%',
    marginTop: '1em'
  },

  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300
  },

  container: {
    width: '100%',
    marginLeft: '0.8em'
    // display: "flex",
    // flexWrap: "wrap"
  },

  addContainer: {
    marginLeft: '0.2em'
  },

  formControl: {
    margin: theme.spacing.unit
  },

  list: {
    overflow: 'auto'
  },

  extendedIcon: {
    marginRight: theme.spacing.unit
  }
});

class RuleList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rules_json: [],
      path: {},
      autoRefresh: true
    };

    // make sure the "this" variable keeps its scope
    // this.handleChange = this.handleChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleItemDelete = this.handleItemDelete.bind(this);
    // this.handleAdd = this.handleAdd.bind(this);
  }

  componentWillMount() {
    console.log('rules_json from rule page', this.props.rules_json);
    var ini_path = {
      pathname: this.props.relative_url + '/token',
      state: {
        rule: {
          polarity: true,
          description: '',
          pattern: [],
          output_format: '',
          is_active: true,
          dependencies: [],
          identifier: 'current rule'
        },
        rules_data: this.props.rules_json,
        rule_index: '',
        webServiceUrl: this.props.webServiceUrl,
        relative_url: this.props.relative_url,
        test_text: this.props.test_text
      }
    };
    this.setState({
      path: ini_path,
      rules_json: this.props.rules_json
    });
  }

  componentWillReceiveProps(nextProps) {
    console.log('rules_json from rule page', nextProps.rules_json);
    var ini_path = {
      pathname: this.props.relative_url + '/token',
      state: {
        rule: {
          polarity: true,
          description: '',
          pattern: [],
          output_format: '',
          is_active: true,
          dependencies: [],
          identifier: 'current rule'
        },
        rules_data: nextProps.rules_json,
        rule_index: '',
        webServiceUrl: nextProps.webServiceUrl,
        relative_url: nextProps.relative_url,
        test_text: nextProps.test_text
      }
    };
    this.setState({
      path: ini_path,
      rules_json: nextProps.rules_json,
      test_text: nextProps.test_text
    });
  }

  handleItemDelete(del_index) {
    console.log('del index');
    console.log(del_index);
    var del_temp = this.state.rules_json;
    del_temp.splice(del_index, 1);
    this.setState(
      {
        rules_json: del_temp
      },
      () => {
        this.props.updateRules(del_temp);
      }
    );
  }

  handleUpdate = child_rule_data => {
    var temp = this.state.rules_json;
    console.log('add rule in the end');
    console.log(child_rule_data);
    temp.push(child_rule_data);
    this.setState(
      {
        rules_json: temp
      },
      () => {
        this.props.updateRules(temp);
      }
    );
  };

  handleActive = (checked, rule_index) => {
    var temp = this.state.rules_json;
    console.log('handle active');
    temp[rule_index].is_active = checked;
    console.log(temp);
    this.setState(
      {
        rules_json: temp
      },
      () => {
        this.props.updateRules(temp);
      }
    );
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
    this.props.autoRefresh(event.target.checked);
  };

  render() {
    const { classes } = this.props;

    console.log('render rule list and path');
    console.log(this.state.path);
    return (
      <Grid
        container
        className={classes.root}
        alignItems="stretch"
        direction="column"
        justify="flex-start"
      >
        <Grid item xs={12} className={classes.list_container}>
          <div className={classes.container}>
            <Typography
              variant="headline"
              gutterBottom
              align="center"
              color="primary"
            >
              Rule List
            </Typography>
          </div>
          <FormControlLabel
            className={classes.formControl}
            control={
              <Switch
                checked={this.state.autoRefresh}
                onChange={this.handleChange('autoRefresh')}
                value="autoRefresh"
              />
            }
            label="Auto Refresh"
          />
          <List className={classes.list}>
            {this.state.rules_json.map((rule, index) => (
              <RuleItem
                rules_json={this.state.rules_json}
                single_rule_json={rule}
                index={index}
                test_text={this.props.test_text}
                webServiceUrl={this.props.webServiceUrl}
                relative_url={this.props.relative_url}
                deleteItem={this.handleItemDelete}
                handleActive={this.handleActive}
              />
            ))}
          </List>
          <div className={classes.addContainer}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              component={Link}
              to={this.state.path}
            >
              Add Rule
            </Button>
          </div>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(withRouter(RuleList));
