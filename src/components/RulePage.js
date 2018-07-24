import React, { Component } from 'react';
import Base64 from 'base-64';
import RuleList from './RuleList';
import TestArea from './TestArea';
import ErrorDialog from './ErrorDialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
// import constantData from './phone.json';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary
  },

  page_title: {
    margin: 'auto'
  }
});

/*We need base.64 for the authentication*/

var webServiceUrl = '';
var webServiceUrlAllRules = '';
var relative_url = '';
// var webServiceUrlFields = '';
window.CREATEDBY_SERVER = 'server';
window.CREATEDBY_USER = 'user';
window.isFirstopen = 1;

class Rule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      createdby: window.CREATEDBY_SERVER,
      autoRefresh_RP: true,
      rules_json: [],
      results: [],
      test_tokens: [],
      test_text: '',
      req_json: {
        rules: [],
        test_text: ''
      },
      output_loc: {},
      // fake_json is a respone json too
      res_json: {
        rules: [],
        field_name: '',
        results: [],
        test_tokens: [],
        test_text: ''
      },
      error_display: false,
      error_message: '',
      error_detail: ''
    };

    // this.handleRulesUpdate = this.handleRulesUpdate.bind(this);
    // this.handleTextUpdate = this.handleTextUpdate.bind(this);
    this.getUrlProps = this.getUrlProps.bind(this);
    this.getUrlProps_demo = this.getUrlProps_demo.bind(this);
    // this.runAllRules = this.runAllRules.bind(this);
    // this.handleAutoRefresh = this.handleAutoRefresh.bind(this);
    this.getData = this.getData.bind(this);
    this.sendData = this.sendData.bind(this);
  }

  // get Url props by regular expression
  getUrlProps() {
    console.log('window.location.href', window.location.href);
    var pos = window.location.href.indexOf('/#/');
    var url_props = [];
    if (pos !== -1) {
      url_props = window.location.href.slice(pos + 3).split('/');
      console.log('url_props', url_props);
    }
    return url_props;
  }

  getUrlProps_demo(url) {
    var pos = url.indexOf('/#/');
    var url_props = [];
    if (pos !== -1) {
      url_props = url.slice(pos + 3).split('/');
      console.log('short_url', url.slice(pos + 3));
      console.log('url_props', url_props);
    }
    return url_props;
  }

  // get data from API
  getData() {
    console.log('getData  from webservice=' + webServiceUrlAllRules);

    //This is how you authenticate using base64(username:password. )
    var headers = new Headers();
    headers.append('Authorization', 'Basic ' + this.props.match.params.auth);
    headers.append('accept', 'application/json');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    console.log('headers');
    console.log(headers.get('Authorization'));
    /*
      Let's fetch the data from the webservice.
      */
    // alert(webServiceUrl);
    fetch(webServiceUrlAllRules, {
      method: 'GET',
      // headers: headers, //authentication header.
      mode: 'cors',
      credentials: 'include'
    })
      .then(response => {
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

        /*If there is an error, then there is no json.rules - it's undefined.
                *
                */
        if (json.rules !== undefined) {
          console.log('Received 200 ok');
          console.log(json);

          // I overwrite the rules identifier with our own naming. Sometimes these rules
          // *are created on the server and no identifier is provided.

          var temp_output_loc = {};
          json.rules.map(rule => {
            temp_output_loc[rule.identifier] = [];
            rule.pattern.map((single_pattern, index) => {
              if (single_pattern.is_in_output) {
                temp_output_loc[rule.identifier].push(index);
              }
            });
          });
          console.log('output_loc of rule page', temp_output_loc);

          var temp_req = this.state.req_json;
          temp_req.rules = json.rules;
          temp_req.test_text = json.test_text;

          this.setState({
            createdby: window.CREATEDBY_SERVER,
            req_json: temp_req,
            rules_json: json.rules,
            test_text: json.test_text,
            results: json.results,
            test_tokens: json.test_tokens,
            output_loc: temp_output_loc
          });
        } else {
          if (json.error_message === 'no spacy rules') {
            this.setState({
              error_display: true,
              error_message: 'Error code ' + json.status_code + ' received',
              error_detail:
                json.error_message +
                '! If it is a new field, please ignore this message'
            });
          } else {
            this.setState({
              error_display: true,
              error_message: 'Error code ' + json.status_code + ' received',
              error_detail: json.error_message
            });
          }
          console.log('Error code ' + json.status_code + 'received');
          console.log('Error msg = ' + json.error_message);
        }
      });
  }

  // send data to backend server
  sendData() {
    console.log('Enter SendData: about post json to the SERVER');

    //This is how you authenticate using base64(username:password. )
    var headers = new Headers();
    headers.append('Authorization', 'Basic ' + this.props.match.params.auth);
    /*
    Let's fetch the data from the webservice.
    */
    fetch(webServiceUrl, {
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
        return response.json(); //we only get here if there is no error
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
        console.log('output_loc of rule page', temp_output_loc);
        this.setState({
          output_loc: temp_output_loc,
          res_json: json,
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

  componentWillMount() {
    if (window.isFirstopen === 1) {
      console.log('isFirstopen', window.isFirstopen);
      // var demo_url =
      //   '';
      // this.getUrlProps_demo(demo_url);
      //not sure the relative_url should choose match.url or match.path or this.props.loaction
      relative_url = this.props.match.url;
      console.log(
        'this.props.match.params',
        this.props.match.params,
        'relative_url',
        relative_url,
        'window.location.href',
        window.location.href,
        this.props
      );

      //receive props from the url
      if (Object.keys(this.props.match.params).length === 0) {
        var url_props_arr = this.getUrlProps();
        if (url_props_arr.length === 4) {
          if (url_props_arr[1] === undefined) {
            this.setState({
              error_display: true,
              error_message: 'No server name',
              error_detail: 'this.props.params.serverName undefined'
            });
            console.log('No server name');
            return;
          }

          var serverName = Base64.decode(url_props_arr[1]);
          console.log('Server name = ' + serverName);

          if (
            url_props_arr[2] === undefined ||
            url_props_arr[3] === undefined
          ) {
            this.setState({
              error_display: true,
              error_message:
                'No project/field name specified. They are both required!!!!!',
              error_detail:
                'this.props.params.projectName and fieldName undefined'
            });
            console.log(
              'No project/field name specified. They are both required!!!!!'
            );
          }

          webServiceUrl =
            'http://' +
            serverName +
            '/projects/' +
            url_props_arr[2] +
            '/fields/' +
            url_props_arr[3] +
            '/spacy_rules';
        } else {
          this.setState({
            error_display: true,
            error_message: 'Unable to get url props',
            error_detail:
              'this.props.match.params is empty or the length of url_props_arr is less than 4'
          });
          return;
        }
      } else {
        if (this.props.match.params.serverName === undefined) {
          this.setState({
            error_display: true,
            error_message: 'No server name',
            error_detail: 'this.props.params.serverName undefined'
          });
          console.log('No server name');
          return;
        }

        var serverName = Base64.decode(this.props.match.params.serverName);
        console.log('Server name = ' + serverName);

        if (
          this.props.match.params.projectName === undefined ||
          this.props.match.params.fieldName === undefined
        ) {
          this.setState({
            error_display: true,
            error_message:
              'No project/field name specified. They are both required!!!!!',
            error_detail:
              'this.props.params.projectName and fieldName undefined'
          });
          console.log(
            'No project/field name specified. They are both required!!!!!'
          );
        }

        webServiceUrl =
          'http://' +
          serverName +
          '/projects/' +
          this.props.match.params.projectName +
          '/fields/' +
          this.props.match.params.fieldName +
          '/spacy_rules';
      }

      //Type=all grabs all the rules, test_text, token, results etc.
      webServiceUrlAllRules = webServiceUrl + '?type=all';

      console.log('webservice url = ' + webServiceUrl);
      console.log('Address for getting rules:' + webServiceUrlAllRules);

      this.getData();
      window.isFirstopen = 0;
    } else {
      console.log('Not First open', window.isFirstopen);
      console.log('cwm rule page this.props.location.state');
      console.log(this.props.location.state);
      if (this.props.location.state !== undefined) {
        console.log('req rule list');
        var temp_req_json = this.state.req_json;
        temp_req_json.rules = this.props.location.state.rules;
        temp_req_json.test_text = this.props.location.state.test_text;
        this.setState(
          {
            // update rules of req_json
            req_json: temp_req_json,
            rules_json: temp_req_json.rules,
            test_text: this.props.location.state.test_text
          },
          () => {
            console.log('update req rule list');
            console.log(this.state.test_text, this.state.test_json);
            this.sendData();
          }
        );
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('next props');
    console.log(this.props.location.state);
  }

  handleAutoRefresh = autoRefresh => {
    this.setState({
      autoRefresh_RP: autoRefresh
    });
  };

  handleRulesUpdate = new_rules_json => {
    console.log('new_rules_json');
    console.log(new_rules_json);
    var temp_req_json = this.state.req_json;
    temp_req_json.rules = new_rules_json;
    this.setState(
      {
        req_json: temp_req_json
      },
      () => {
        if (this.state.autoRefresh_RP) {
          console.log('Rule chaneg :ajax call API');
          this.sendData();
        }
      }
    );
  };

  handleTextUpdate = new_text => {
    var temp_req_json = this.state.req_json;
    temp_req_json.test_text = new_text;
    if (new_text === '') {
      this.setState({
        test_tokens: []
      });
    }
    this.setState(
      {
        test_text: new_text,
        req_json: temp_req_json
      },
      () => {
        if (this.state.autoRefresh_RP) {
          console.log('Text change: call API');
          this.sendData();
        }
      }
    );
  };

  runAllRules = () => {
    this.sendData();
  };

  componentDidCatch(error, errorInfo) {
    console.log('catch error');
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
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid item xs={12}>
          <AppBar position="static" color="default">
            <Toolbar className={classes.page_title}>
              <Typography variant="title" color="inherit" align="center">
                Rule Page
              </Typography>
            </Toolbar>
          </AppBar>
        </Grid>
        <Grid container className={classes.Main}>
          <Grid item sm={12} md={6}>
            <RuleList
              rules_json={this.state.rules_json}
              webServiceUrl={webServiceUrl}
              relative_url={relative_url}
              test_text={this.state.test_text}
              autoRefresh={this.handleAutoRefresh}
              updateRules={this.handleRulesUpdate}
            />
          </Grid>
          <Grid item sm={12} md={6}>
            <TestArea
              output_location={this.state.output_loc}
              test_text={this.state.test_text}
              results={this.state.results}
              tokens={this.state.test_tokens}
              updateText={this.handleTextUpdate}
              runRulebyhand={this.runAllRules}
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

export default withStyles(styles)(Rule);
