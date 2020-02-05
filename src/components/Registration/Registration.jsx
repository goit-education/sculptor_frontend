/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './Registration.module.css';

import Grid from '@material-ui/core/Grid';
import loginInputActions from '../../redux/actions/RegistrationInputActions';
import Logo from '../../assets/images/icons/logo png/logo black.png';

import API from '../../services/api';

const inputValidationRegEx = {
  email: /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim,
  password: /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/,
};

const isEmailValid = email => inputValidationRegEx.email.test(email);

const isPasswordValid = (password, confirmPassword) =>
  password.length !== 0 && password === confirmPassword;

const isNameValid = name => name.length !== 0;

const registerErrorUserExist =
  'This user already exists, enter a different email';

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      error: '',
    };
  }

  handlerOnSubmit = e => {
    e.preventDefault();
    const { history } = this.props;
    const { name, email, password, confirmPassword } = this.state;

    if (password === confirmPassword) {
      if (password.length >= 6) {
        API.register({
          email,
          password,
          name,
        })
          .then(res => {
            if (res.data.success) history.push('/login');
            this.setState({ error: '' });
          })
          .catch(error => {
            if (error.response) {
              if (!error.response.data.success)
                this.setState({ error: registerErrorUserExist });
            }
            console.log(error);
          });
      } else {
        this.setState({
          error: 'The password must contain at least 6 characters',
        });
      }
    } else {
      this.setState({
        error: 'Different password, please enter correct password',
      });
    }
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const { email, password, confirmPassword, name, error } = this.state;
    return (
      <div className={styles.Registration}>
        <Grid container>
          <Grid
            className={styles.Registration_column}
            item
            direction="column"
            xl={4}
            lg={4}
            sm={12}
            md={5}
            xs={12}
          >
            <Grid container justify="center" direction="column">
              <Grid item className={styles.gridItem}>
                <h1>
                  <img className={styles.logo} src={Logo} alt="logo sculptor" />
                </h1>
              </Grid>
              <Grid item style={{ flex: '1 0 auto' }}>
                <form
                  onSubmit={e => this.handlerOnSubmit(e)}
                  className={`${styles.form} ${styles.flex_column} ${
                    styles.center_box
                  } ${styles.shadow} ${styles.padding_all_25}`}
                  method="post"
                >
                  <input
                    onChange={this.handleChange('email')}
                    value={email}
                    className={
                      email.length > 0
                        ? `${styles.form_input} ${
                            isEmailValid(email)
                              ? `${styles.input__valid}`
                              : `${styles.input__invalid}`
                          }`
                        : `${styles.form_input}`
                    }
                    type="email"
                    name="email"
                    placeholder="Email Address *"
                    required
                  />

                  <input
                    onChange={this.handleChange('password')}
                    value={password}
                    className={
                      password.length > 0
                        ? `${styles.form_input} ${
                            isPasswordValid(password, confirmPassword)
                              ? `${styles.input__valid}`
                              : `${styles.input__invalid}`
                          }`
                        : `${styles.form_input}`
                    }
                    type="password"
                    name="password"
                    placeholder="Password *"
                    required
                  />

                  <input
                    onChange={this.handleChange('confirmPassword')}
                    value={confirmPassword}
                    className={
                      confirmPassword.length > 0
                        ? `${styles.form_input} ${
                            isPasswordValid(password, confirmPassword)
                              ? `${styles.input__valid}`
                              : `${styles.input__invalid}`
                          }`
                        : `${styles.form_input}`
                    }
                    type="password"
                    name="confirmPassword"
                    placeholder="Password Confirmation*"
                    required
                  />

                  <input
                    onChange={this.handleChange('name')}
                    value={name}
                    className={
                      name.length > 3
                        ? `${styles.input__valid} ${styles.form_input}`
                        : `${styles.input__invalid} ${styles.form_input}`
                    }
                    type="text"
                    name="name"
                    placeholder="Your Name *"
                    required
                  />

                  <button
                    disabled={
                      !isEmailValid(email) &&
                      !isPasswordValid(password, confirmPassword) &&
                      !isNameValid(name)
                    }
                    className={styles.btn}
                    type="submit"
                    label="Register"
                  >
                    Register
                  </button>

                  <p className={styles.text_center}>
                    <NavLink to="/login" className={styles.link}>
                      Login
                    </NavLink>
                  </p>
                </form>
                {error && <p className={styles.Registration_error}>{error}</p>}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    inputs: state.inputs,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addUser: data => dispatch(loginInputActions.addUser(data)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Registration);
