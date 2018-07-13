import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import ReactTooltip from 'react-tooltip';
import Button from '@material-ui/core/Button';

function TabContainer(props) {
  return <div>{props.children}</div>;
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

window.isFirstText = 1;

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%'
  },

  input: {
    margin: '1em',
    height: '100%'
  },

  paper: {
    opacity: 0.6,
    borderRadius: '1em',
    paddingLeft: '2em',
    paddingRight: '2em'
  },

  result: {
    margin: '1em',
    height: '50%'
  },

  highlight_token: {
    padding: '0.2em 0.3em',
    margin: '0 0.25em',
    lineHeight: 1,
    display: 'inline-block',
    borderRadius: '0.25em',
    background: '#edf67d',
    fontWeight: 700
  },

  output_token: {
    padding: '0.2em 0.3em',
    margin: '0 0.25em',
    lineHeight: 1,
    display: 'inline-block',
    borderRadius: '0.25em',
    background: '#f3b024d9',
    fontWeight: 700
  },

  unhighlight_token: {
    padding: '0.2em 0.3em',
    margin: '0 0.25em',
    lineHeight: 1,
    display: 'inline-block',
    borderRadius: '0.25em',
    background: 'rgba(255, 255, 255)'
  },

  unhiglisght_text: {
    whiteSpace: 'pre-wrap'
  },

  display_container: {
    background: '#f6f6f6',
    padding: '2em',
    lineHeight: 2,
    borderRadius: '1em'
  },

  textField: {
    borderRadius: '1em',
    width: '100%'
  },

  button: {
    margin: theme.spacing.unit
  },

  button_container: {
    alignSelf: 'center'
  }
});

class TestArea extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      errorInfo: null,
      value: 0,
      input: '',
      test_text: '',
      res_arr: [],
      test_tokens: [],
      res_position: [],
      res_token: [],
      token_display: '',
      test_display: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.highlightText = this.highlightText.bind(this);
    this.highlightTokens = this.highlightTokens.bind(this);
    this.findOutputTokenLoc = this.findOutputTokenLoc.bind(this);
    this.runRule = this.runRule.bind(this);
    this.clearText = this.clearText.bind(this);
  }

  // find the highlight token location
  findOutputTokenLoc(
    res_item,
    output_loc,
    extraction_token_set,
    output_token_set,
    output_tooltip_arr,
    extraction_tooltip_arr
  ) {
    var start = res_item.start_token;
    var end = res_item.end_token;
    var start_output;
    var end_output;
    for (var i = start; i < end; i++) {
      extraction_token_set.add(i);
      extraction_tooltip_arr[i] = 'Exctraction of ' + res_item.identifier;
    }
    output_loc[res_item.identifier].map(output_pattern => {
      if (res_item.token_based_match_mapping[output_pattern] !== null) {
        start_output =
          start + res_item.token_based_match_mapping[output_pattern][0];
        end_output =
          start + res_item.token_based_match_mapping[output_pattern][1];
        for (var i = start_output; i < end_output; i++) {
          output_token_set.add(i);
          extraction_token_set.delete(i);
          delete extraction_tooltip_arr[i];
          if (res_item.identifier === 'current rule') {
            output_tooltip_arr.push(res_item.text);
          } else {
            output_tooltip_arr.push(
              'Output of ' + res_item.identifier + ': ' + res_item.text
            );
          }
        }
      }
    });
    console.log('output_tooltip_arr', output_tooltip_arr);
  }

  componentWillMount() {
    // set state
    this.setState(
      {
        input: this.props.test_text,
        test_text: this.props.test_text
      },
      () => {
        console.log(this.state.input);
      }
    );
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps');
    var temp_res_arr = nextProps.results;
    var temp_res_position = [];
    var extraction_token_set = new Set();
    var output_token_set = new Set();
    var output_tooltip_arr = [];
    var extraction_tooltip_arr = {};

    temp_res_arr.map(res_item => {
      console.log('res_item');
      console.log(res_item);
      console.log(nextProps.output_location);
      this.findOutputTokenLoc(
        res_item,
        nextProps.output_location,
        extraction_token_set,
        output_token_set,
        output_tooltip_arr,
        extraction_tooltip_arr
      );
    });
    var temp_tokens = [];
    var pre_input = '';
    nextProps.tokens.map(token => {
      temp_tokens.push(token.text);
    });

    if (window.isFirstText === 1) {
      pre_input = nextProps.test_text;
      window.isFirstText = 0;
    } else {
      pre_input = this.state.input;
    }

    this.setState(
      {
        input: pre_input,
        token_display: this.highlightTokens(
          temp_tokens,
          extraction_token_set,
          output_token_set,
          output_tooltip_arr,
          extraction_tooltip_arr
        ),
        test_display: this.highlightText(
          nextProps.test_text,
          nextProps.tokens,
          extraction_token_set,
          output_token_set,
          output_tooltip_arr,
          extraction_tooltip_arr
        )
      },
      () => {
        console.log('type of token_display', typeof this.state.token_display);
      }
    );
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleTextChange = test_text => event => {
    this.setState({
      test_text: event.target.value,
      input: event.target.value
    });
    this.timer && clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      console.log('this.state.test_text:', this.state.test_text);
      this.props.updateText(this.state.test_text);
    }, 800);
  };

  runRule = () => {
    this.props.runRulebyhand();
  };

  clearText = () => {
    this.setState(
      {
        input: '',
        test_text: '',
        test_display: '',
        token_display: ''
      },
      () => {
        this.props.updateText('');
      }
    );
  };

  // highlight the test text
  highlightText = (
    test_text,
    test_token,
    extraction_token_set,
    output_token_set,
    output_tooltip_arr,
    extraction_tooltip_arr
  ) => {
    console.log('highlightText');
    const { classes } = this.props;
    if (extraction_token_set.size === 0 && output_token_set.size === 0) {
      return test_text;
    } else {
      var mark = 0;
      var count = 0;

      return test_token.map((token, index) => {
        if (mark > index) {
          return;
        } else {
          var output_text = '';
          var extraction_text = '';
          var unhiglisght_text = '';
          var tooltip_id = '';
          while (output_token_set.has(mark)) {
            output_text += test_token[mark].text + test_token[mark].whitespace;
            count++;
            if (
              !output_token_set.has(mark + 1) ||
              output_tooltip_arr[count - 1] !== output_tooltip_arr[count]
            ) {
              tooltip_id = 'output_in_text_' + index;
              mark++;
              return (
                <span>
                  <mark
                    className={classes.output_token}
                    data-tip
                    data-for={tooltip_id}
                  >
                    {output_text}
                  </mark>
                  <ReactTooltip
                    id={tooltip_id}
                    type="info"
                    effect="solid"
                    wrapper="span"
                  >
                    {output_tooltip_arr[count - 1]}
                  </ReactTooltip>
                </span>
              );
            }

            mark++;
          }
          while (extraction_token_set.has(mark)) {
            extraction_text +=
              test_token[mark].text + test_token[mark].whitespace;
            if (
              !extraction_token_set.has(mark + 1) ||
              extraction_tooltip_arr[mark] !== extraction_tooltip_arr[mark + 1]
            ) {
              mark++;
              tooltip_id = 'extraction_in_text_' + index;
              return (
                <span>
                  <mark
                    className={classes.highlight_token}
                    data-tip
                    data-for={tooltip_id}
                  >
                    {extraction_text}
                  </mark>
                  <ReactTooltip
                    id={tooltip_id}
                    type="info"
                    effect="solid"
                    wrapper="span"
                  >
                    {extraction_tooltip_arr[index]}
                  </ReactTooltip>
                </span>
              );
            }
            mark++;
          }
          unhiglisght_text =
            test_token[mark].text + test_token[mark].whitespace;
          mark++;
          return (
            <span className={classes.unhiglisght_text}>{unhiglisght_text}</span>
          );
        }
      });
    }
  };

  // highlight the tokens
  highlightTokens = (
    token_arr,
    extraction_token_set,
    output_token_set,
    output_tooltip_arr,
    extraction_tooltip_arr
  ) => {
    console.log('highlightTokens');
    console.log('extraction_token_set', extraction_token_set);
    console.log('output_token_set', output_token_set);
    const { classes } = this.props;
    var count = -1;
    var output_index = '';
    var extraction_index = '';
    return token_arr.map((token, index) => {
      if (token === '\n') {
        token = '\\n';
      }
      if (token === '↵') {
        token = '↵';
      }
      if (token === ' ') {
        token = '\\b';
      }
      if (output_token_set.has(index)) {
        count++;
        output_index = 'output_token_' + count;
        // console.log('text_index', text_index);
        return (
          <span>
            <mark
              className={classes.output_token}
              data-tip
              data-for={output_index}
            >
              {token}
            </mark>
            <ReactTooltip
              id={output_index}
              type="info"
              effect="solid"
              wrapper="span"
            >
              {output_tooltip_arr[count]}
            </ReactTooltip>
          </span>
        );
      } else if (extraction_token_set.has(index)) {
        extraction_index = 'extraction_token_' + index;
        return (
          <span>
            <mark
              className={classes.highlight_token}
              data-tip
              data-for={extraction_index}
            >
              {token}
            </mark>
            <ReactTooltip
              id={extraction_index}
              type="info"
              effect="solid"
              wrapper="span"
            >
              {extraction_tooltip_arr[index]}
            </ReactTooltip>
          </span>
        );
      } else {
        return <mark className={classes.unhighlight_token}>{token}</mark>;
      }
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
    const { value } = this.state;
    const inputProps = {
      disableUnderline: true
    };

    return (
      <Grid
        container
        className={classes.root}
        alignItems="stretch"
        direction="column"
        justify="flex-start"
      >
        <Grid item xs={12} className={classes.input}>
          <Typography
            variant="headline"
            component="h3"
            align="center"
            color="primary"
          >
            Input Area
          </Typography>
          <Paper className={classes.paper}>
            <TextField
              id="multiline-flexible"
              multiline
              rows="10"
              placeholder="Input your test text"
              value={this.state.input}
              onChange={this.handleTextChange('test_text')}
              className={classes.textField}
              margin="normal"
              InputProps={inputProps}
            />
          </Paper>
        </Grid>

        <div className={classes.button_container}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={this.runRule}
          >
            Run Rule
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={this.clearText}
          >
            Clear
          </Button>
        </div>

        <Grid item xs={12} className={classes.result}>
          <Tabs
            value={value}
            onChange={this.handleChange}
            centered
            scrollButtons="on"
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Result" />
            <Tab label="Show Token" />
          </Tabs>

          {value === 0 && (
            <TabContainer>
              <Paper
                id="text_display_area"
                className={classes.display_container}
              >
                {this.state.test_display}
              </Paper>
            </TabContainer>
          )}
          {value === 1 && (
            <TabContainer>
              <Paper className={classes.display_container}>
                {this.state.token_display}
              </Paper>
            </TabContainer>
          )}
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(TestArea);
