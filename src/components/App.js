import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Rule from './RulePage';
import Token from './TokenPage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      errorInfo: null
    };
  }

  componentDidCatch(error, errorInfo) {
    console.log('catch error');
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
    // try {
    //   // Do something that could throw
    // } catch (error) {
    //   this.setState({ error });
    // }

    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Rule} />
          <Route exact path="/token" component={Token} />
          <Route
            path=":auth/:serverName/:projectName/:fieldName"
            component={Rule}
          />
          <Route
            exact
            path=":auth/:serverName/:projectName/:fieldName/token"
            component={Token}
          />
        </div>
      </BrowserRouter>
    );
  }
  // registerServiceWorker()
}

export default App;
