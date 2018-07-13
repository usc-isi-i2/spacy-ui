import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class ErrorDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
  }

  componentWillMount() {
    console.log('this.props.errorDisplay', this.props.errorDisplay);
    this.setState({
      open: this.props.errorDisplay
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      open: nextProps.errorDisplay
    });
  }

  handleClose = () => {
    this.setState({ open: false });
    this.props.handleDialogClose(false);
  };

  render() {
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{'Error Message'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.props.error_message}
            </DialogContentText>
            <DialogContentText id="alert-dialog-description">
              {this.props.error_detail}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default ErrorDialog;
