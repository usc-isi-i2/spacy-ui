import React, { Component } from 'react';
import Base64 from 'base-64';
import { Link } from 'react-router-dom';
import TokenList from './TokenList';
import TestArea from './TestArea';
import ErrorDialog from './ErrorDialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import BackIcon from '@material-ui/icons/ArrowBack';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
});

class TokenPage extends Component {
  constructor(props) {
    super(props);
    var webServiceUrl = this.props.location.state.webServiceUrl;
    console.log('token page');
    console.log(this.props.location.state.relative_url);
    this.state = {
      error_display: false,
      error_message: '',
      error_detail: '',
      results: [],
      test_tokens: [],
      test_text: this.props.location.state.test_text,
      req_json: {
        rules: [this.props.location.state.rule],
        test_text: this.props.location.state.test_text
      },
      orignal_active: this.props.location.state.rule.is_active,
      output_loc: {},
      autoRefresh_TP: true,
      webServiceUrl: this.props.location.state.webServiceUrl,
      path: {
        pathname: this.props.location.state.relative_url,
        state: {
          rules: [],
          test_text: ''
        }
      }
    };

    // this.handleTextUpdate = this.handleTextUpdate.bind(this);
    // this.handleRuleUpdate = this.handleRuleUpdate.bind(this);
    // this.handleAutoRefresh = this.handleAutoRefresh.bind(this);
    // this.runOneRule = this.runOneRule.bind(this);
    this.sendData = this.sendData.bind(this);
  }

  componentWillMount() {
    console.log('token page: componentWillMount');
    if (this.state.orignal_active === false) {
      var temp_req_json = this.state.req_json;
      temp_req_json.rules[0].is_active = true;
      this.setState({
        req_json: temp_req_json
      });
    }
    if (this.state.req_json.rules[0].pattern.length !== 0) {
      this.sendData();
    }
  }

  onRef = ref => {
    this.child = ref;
  };

  click = e => {
    var return_state = this.child.packageRulesJson();

    var temp_path = this.state.path;
    temp_path.state.rules = return_state.temp_rules;
    temp_path.state.test_text = this.state.test_text;
    console.log('return to the rule page', temp_path);
    this.setState({
      path: temp_path
    });
  };

  sendData() {
    console.log('Enter SendData: about post json to the SERVER');
    /*
    Let's fetch the data from the webservice.
    */
    fetch(this.state.webServiceUrl, {
      method: 'POST',
      // headers: headers, //authentication header.
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify(this.state.req_json) //JSON data created earlier.
    })
      .then(response => {
        if (!response.ok) {
          throw response;
        }
        return response.json();
      })
      .then(json => {
        if (json === undefined) {
          this.setState({
            error_display: true,
            error_message: 'Request Error',
            error_detail: 'Json undefined'
          });
          return;
        }

        //var myArr = JSON.parse(json);
        console.log('Test = ' + json.results);
        console.log('++++++++++', json);
        var temp_output_loc = {};
        json.rules.map(rule => {
          temp_output_loc[rule.identifier] = [];
          rule.pattern.map((single_pattern, index) => {
            if (single_pattern.is_in_output) {
              temp_output_loc[rule.identifier].push(index);
            }
          });
        });
        console.log('output_loc of token page', temp_output_loc);
        this.setState({
          output_loc: temp_output_loc,
          results: json.results,
          test_tokens: json.test_tokens,
          test_text: json.test_text
        });
      })
      .catch(err => {
        if (typeof err.text === 'function') {
          err.text().then(errorMessage => {
            this.setState({
              error_display: true,
              error_message: 'Request Error',
              error_detail: errorMessage
            });
            console.log('Error Message: ', errorMessage);
          });
        } else {
          console.log(err);
        }
      });
  }

  handleAutoRefresh = autoRefresh => {
    this.setState({
      autoRefresh_TP: autoRefresh
    });
  };

  handleRuleUpdate = new_rule => {
    console.log('new rule');
    console.log(new_rule);
    var temp_req_json = this.state.req_json;
    temp_req_json.rules = [new_rule];
    console.log(temp_req_json);
    // call API send request data
    this.setState(
      {
        req_json: temp_req_json
      },
      () => {
        console.log('token page rule update call API');
        console.log(temp_req_json.rules[0].pattern);
        if (this.state.autoRefresh_TP) {
          if (temp_req_json.rules[0].pattern.length !== 0) {
            this.sendData();
          } else {
            this.setState({
              results: [],
              test_tokens: []
            });
          }
        }
      }
    );
  };

  handleTextUpdate = new_text => {
    console.log('new_text');
    console.log(new_text);
    var temp_req_json = this.state.req_json;
    temp_req_json.test_text = new_text;
    console.log(temp_req_json);
    this.setState(
      {
        req_json: temp_req_json,
        test_text: new_text
      },
      () => {
        console.log('token page text update call API');
        console.log(temp_req_json.rules[0].pattern);
        // call API
        if (this.state.autoRefresh_TP) {
          if (temp_req_json.rules[0].pattern.length !== 0) {
            this.sendData();
          } else {
            this.setState({
              results: [],
              test_tokens: []
            });
          }
        }
      }
    );
  };

  runOneRule = () => {
    if (this.state.req_json.rules[0].pattern.length !== 0) {
      this.sendData();
    }
  };

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error_display: true,
      error_message: error.toString(),
      error_detail: errorInfo.componentStack
    });
    // You can also log error messages to an error reporting service here
  }

  handleDialogClose = child_open => {
    this.setState({
      error_display: child_open
    });
  };

  render() {
    console.log('token page');

    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid item xs={12}>
          <AppBar position="static" color="default">
            <Toolbar>
              <IconButton
                component={Link}
                to={this.state.path}
                onClick={this.click}
              >
                <BackIcon />
              </IconButton>
              <Typography variant="title" color="inherit" align="center">
                Token Page
              </Typography>
            </Toolbar>
          </AppBar>
        </Grid>
        <Grid container className={classes.Main}>
          <Grid item sm={12} md={6}>
            <TokenList
              rules_json={this.props.location.state.rules_data}
              rule_json={this.props.location.state.rule}
              rule_index={this.props.location.state.rule_index}
              orignal_active={this.state.orignal_active}
              autoRefresh={this.handleAutoRefresh}
              updateRule={this.handleRuleUpdate}
              onRef={this.onRef}
            />
          </Grid>
          <Grid item sm={12} md={6}>
            <TestArea
              output_location={this.state.output_loc}
              test_text={this.state.test_text}
              results={this.state.results}
              tokens={this.state.test_tokens}
              updateText={this.handleTextUpdate}
              runRulebyhand={this.runOneRule}
            />
          </Grid>
        </Grid>
        <ErrorDialog
          errorDisplay={this.state.error_display}
          error_message={this.state.error_message}
          error_detail={this.state.error_detail}
          handleDialogClose={this.handleDialogClose}
        />
      </div>
    );
  }
}

export default withStyles(styles)(TokenPage);
