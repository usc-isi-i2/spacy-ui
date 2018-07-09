import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
// import Paper from '@material-ui/core/Paper';
import TokenItem from './TokenItem';
import AddIcon from '@material-ui/icons/Add';
import EditorModal from './EditorModal';
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
    width: '100%',
    height: '100%'
  },

  input: {
    width: '100%',
    height: '100%'
  },

  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300
  },

  container: {
    width: '100%',
    padding: '1em',
    paddingBottom: 0
    // display: "flex",
    // flexWrap: "wrap"
  },

  formControl: {
    marginLeft: theme.spacing.unit
  },

  list: {
    overflow: 'auto'
  },

  extendedIcon: {
    marginRight: theme.spacing.unit
  }
});

const initialState = {
  error: null,
  errorInfo: null,
  token_json: [],
  dialogdisplay: false,
  polarity: 'true',
  description: '',
  output_format: '',
  is_active: 'true',
  identifier: 'current rule',
  rule_index: '',
  rule_json: {},
  rules_json: {},
  autoRefresh: true
};

class TokenList extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    // make sure the "this" variable keeps its scope
    // this.handleChange = this.handleChange.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleDesChange = this.handleDesChange.bind(this);
    this.handleFormatChange = this.handleFormatChange.bind(this);
    this.handleListUpdate = this.handleListUpdate.bind(this);
    this.handleItemDelete = this.handleItemDelete.bind(this);
    this.handleItemAdd = this.handleItemAdd.bind(this);
    this.handleItemUpdate = this.handleItemUpdate.bind(this);
    this.packageJson = this.packageJson.bind(this);
  }

  componentWillMount() {
    console.log('not null');
    console.log(this.props.rule_json);
    this.setState({
      token_json: this.props.rule_json.pattern,
      description: this.props.rule_json.description,
      output_format: this.props.rule_json.output_format,
      // rule_index: this.props.rule_index,
      rule_json: this.props.rule_json,
      rules_json: this.props.rules_json
    });
  }

  // componentWillReceiveProps(nextProps) {
  //   this.setState({
  //     description: nextProps.description,
  //     output_format: nextProps.output_format
  //   });
  // }

  componentDidMount() {
    this.props.onRef(this);
  }

  packageJson = () => {
    var temp_rule = this.state.rule_json;
    temp_rule.pattern = this.state.token_json;
    temp_rule.description = this.state.description;
    temp_rule.output_format = this.state.output_format;
    console.log('package one json', temp_rule);
    return temp_rule;
  };

  packageRulesJson = () => {
    console.log('package rules json');
    var temp_rules = this.state.rules_json;
    var temp_rule = this.packageJson();
    // covert to the orginal is_active
    temp_rule.is_active = this.props.orignal_active;
    console.log(temp_rule);
    if (this.props.rule_index !== '') {
      console.log('edit current rule');
      temp_rules[this.props.rule_index] = temp_rule;
    } else if (this.state.token_json.toString() !== '') {
      console.log('add rule');
      // const len = temp_rules.length + 1;
      // temp_rule.identifier = 'rule_' + len;
      temp_rules.push(temp_rule);
    }
    temp_rules.map((rule, index) => (rule.identifier = 'rule_' + (index + 1)));
    console.log('package rules json', temp_rules);
    return {
      temp_rules
    };
  };

  handleDesChange = description => event => {
    // console.log('des change');
    this.setState({ description: event.target.value });
  };

  handleFormatChange = output_format => event => {
    this.setState({ output_format: event.target.value }, () => {
      //callback funciton
    });
    this.timer && clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      console.log('this.state.output_format:', this.state.output_format);
      var temp_rule_json = this.packageJson();
      this.props.updateRule(temp_rule_json);
    }, 1000);
  };

  handleClickOpen = () => {
    this.setState({
      dialogdisplay: true
    });
  };

  handleClose = () => {
    this.setState({
      dialogdisplay: false
    });
  };

  handleItemDelete(del_index) {
    var del_temp = this.state.token_json;
    del_temp.splice(del_index, 1);

    this.setState(
      {
        token_json: del_temp
      },
      () => {
        //callback funciton
        var temp_rule_json = this.packageJson();
        this.props.updateRule(temp_rule_json);
      }
    );
  }

  handleItemAdd = (new_token_data, new_index) => {
    var temp = this.state.token_json;
    console.log('add token in the middle');
    console.log(new_token_data);
    temp.splice(new_index, 0, new_token_data);

    this.setState(
      {
        token_json: temp
      },
      () => {
        //callback funciton
        var temp_rule_json = this.packageJson();
        this.props.updateRule(temp_rule_json);
      }
    );
  };

  handleItemUpdate = (update_token_data, token_index) => {
    var temp = this.state.token_json;
    console.log('edit current token ');
    console.log(update_token_data);
    temp[token_index] = update_token_data;

    this.setState(
      {
        token_json: temp
      },
      () => {
        //callback funciton
        var temp_rule_json = this.packageJson();
        this.props.updateRule(temp_rule_json);
      }
    );
  };

  handleListUpdate = (child_token_data, child_dialogdispaly) => {
    var temp = this.state.token_json;
    console.log('add token in the end');
    console.log(child_token_data);
    temp.push(child_token_data);

    this.setState(
      {
        dialogdisplay: child_dialogdispaly,
        token_json: temp
      },
      () => {
        //callback funciton
        var temp_rule_json = this.packageJson();
        this.props.updateRule(temp_rule_json);
      }
    );
  };

  handleCancel = child_dialogdispaly => {
    this.setState({
      dialogdisplay: child_dialogdispaly
    });
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
    this.props.autoRefresh(event.target.checked);
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

    console.log('render token list');
    // console.log(this.state.token_json[1]);
    return (
      <Grid>
        <Grid
          container
          className={classes.root}
          alignItems="stretch"
          direction="column"
          justify="flex-start"
        >
          <Grid item xs={12} className={classes.list_container}>
            <div className={classes.container}>
              <FormControl className={classes.formControl}>
                <FormGroup row>
                  <TextField
                    name="description"
                    id="description"
                    label="Description"
                    InputLabelProps={{
                      shrink: true
                    }}
                    className={classes.textField}
                    defaultValue={this.props.description}
                    value={this.state.description}
                    placeholder="Input your description"
                    onChange={this.handleDesChange('description')}
                    margin="normal"
                  />
                  <TextField
                    id="output_format"
                    label="Output_format"
                    InputLabelProps={{
                      shrink: true
                    }}
                    className={classes.textField}
                    defaultValue={this.props.output_format}
                    value={this.state.output_format}
                    placeholder="{1} - {2} - {3}"
                    onChange={this.handleFormatChange('output_format')}
                    margin="normal"
                  />
                </FormGroup>
              </FormControl>
            </div>
            <div className={classes.container}>
              <Typography
                variant="headline"
                gutterBottom
                align="center"
                color="primary"
              >
                Token List
              </Typography>
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
            </div>

            <List className={classes.list}>
              {this.state.token_json.map((token, index) => (
                <TokenItem
                  testjson={token}
                  index={index}
                  deleteItem={this.handleItemDelete}
                  addItem={this.handleItemAdd}
                  updateItem={this.handleItemUpdate}
                />
              ))}
            </List>
            <div className={classes.container}>
              <Button
                variant="text"
                color="secondary"
                aria-label="add"
                className={classes.button}
                onClick={this.handleClickOpen}
              >
                <AddIcon className={classes.extendedIcon} />Add Token at the end
              </Button>
            </div>
            <EditorModal
              dialogdisplay={this.state.dialogdisplay}
              type_num={0}
              is_New={1}
              current_data={[]}
              updateItem={this.handleListUpdate}
              handleCancel={this.handleCancel}
            />
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(TokenList);
