import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import AuthConsumer from './AuthConsumer';
import ValidatedForm from '../components/forms/ValidatedForm';

class AuthPrompt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: null,
    };
    this.defaultAttrs = { required: true };
    this.formModel = [
      { label: 'Username', attrs: { defaultValue: 'admin' } },
      { label: 'Password', attrs: { type: 'password' } },
    ];
  }

  authenticate = (credentials) => {
    const { authenticate, history } = this.props;

    authenticate(credentials)
      .catch((err) => {
        this.setState({ errorMessage: err.message });
      })
      .then(history.push('/admin'));
  }

  render = () => {
    const { history } = this.props;
    const { errorMessage } = this.state;

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col bg-dark text-white">
            <div className="navbar-brand">SPORTS STORE</div>
          </div>
        </div>
        <div className="row">
          <div className="col m-2">
            { errorMessage != null
            && (
              <h4 className="bg-danger text-center text-white m-1 p-2">
                { errorMessage }
              </h4>
            )}
            <ValidatedForm
              formModel={this.formModel}
              defaultAttrs={this.defaultAttrs}
              submitCallback={this.authenticate}
              submitText="Login"
              cancelCallback={() => history.push('/')}
              cancelText="Cancel"
            />
          </div>
        </div>
      </div>
    );
  }
}

AuthPrompt.defaultProps = {
  history: {},
};

AuthPrompt.propTypes = {
  history: PropTypes.object,
  authenticate: PropTypes.func.isRequired,
};

export default withRouter(AuthConsumer(AuthPrompt));
