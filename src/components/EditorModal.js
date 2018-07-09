import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import WordEditor from './WordEditor';
import NumberEditor from './NumberEditor';
import PuncEditor from './PuncEditor';
import ShapeEditor from './ShapeEditor';
import LineBreakEditor from './LineBreakEditor';

function TabContainer(props) {
  return <div>{props.children}</div>;
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    maxHeight: 700,
    backgroundColor: theme.palette.background.paper
  }
});

// TabContainer.propTypes = {
//   children: PropTypes.node.isRequired
// };

class EditorModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dialogdisplay: false,
      value: 0,
      is_new: 0,
      token_data: [],
      error: null,
      errorInfo: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.updateData = this.updateData.bind(this);
    this.handleSummit = this.handleSummit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      token_data: nextProps.current_data,
      dialogdisplay: nextProps.dialogdisplay,
      value: nextProps.type_num,
      is_new: nextProps.is_New
    });
  }

  updateData(child_token_data) {
    this.setState({
      token_data: child_token_data
    });
  }

  componentWillMount() {
    this.setState({
      token_data: this.props.current_data,
      dialogdisplay: this.props.dialogdisplay,
      value: this.props.type_num,
      is_new: this.props.is_New
    });
  }

  handleSummit() {
    this.setState({
      dialogdisplay: false
    });
    this.props.updateItem(this.state.token_data, false);
  }

  handleCancel() {
    this.setState({
      dialogdisplay: false
    });
    this.props.handleCancel(false);
  }

  handleChange = (event, value) => {
    this.setState({
      value: value
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
    console.log('Editor Modal');
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
    const index = this.state.value;
    return (
      <Dialog
        open={this.state.dialogdisplay}
        onClose={this.handleClose}
        aria-labelledby="simple-dialog-title"
      >
        <DialogTitle id="simple-dialog-title">Token Editor</DialogTitle>
        <DialogContent>
          <div className={classes.root}>
            <Tabs
              value={index}
              onChange={this.handleChange}
              fullWidth
              // centered
              scrollable
              scrollButtons="on"
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab label="Word" />back
              <Tab label="Number" />
              <Tab label="Shape" />
              <Tab label="Punctuation" />
              <Tab label="LineBreak" />
            </Tabs>

            {index === 0 && (
              <TabContainer>
                <WordEditor
                  token_data={this.state.token_data}
                  is_new={this.state.is_new}
                  callback={this.updateData}
                />
              </TabContainer>
            )}
            {index === 1 && (
              <TabContainer>
                <NumberEditor
                  token_data={this.state.token_data}
                  is_new={this.state.is_new}
                  callback={this.updateData}
                />
              </TabContainer>
            )}
            {index === 2 && (
              <TabContainer>
                <ShapeEditor
                  token_data={this.state.token_data}
                  is_new={this.state.is_new}
                  callback={this.updateData}
                />
              </TabContainer>
            )}
            {index === 3 && (
              <TabContainer>
                <PuncEditor
                  token_data={this.state.token_data}
                  is_new={this.state.is_new}
                  callback={this.updateData}
                />
              </TabContainer>
            )}
            {index === 4 && (
              <TabContainer>
                <LineBreakEditor
                  token_data={this.state.token_data}
                  is_new={this.state.is_new}
                  callback={this.updateData}
                />
              </TabContainer>
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleSummit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(EditorModal);
