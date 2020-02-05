/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

import loginInputActions from '../../redux/actions/LoginInputActions';

import Logo from '../../assets/images/icons/logo png/logo black.png';
import styles from './Login.module.css';

import API from '../../services/api';

const inputValidationRegEx = {
  email: /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim,
  password: /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/,
};

const isEmailValid = email => inputValidationRegEx.email.test(email);

const isPasswordValid = password => password.length !== 0;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
    };
  }

  handlerOnSubmit = e => {
    e.preventDefault();
    const { addUser, history } = this.props;
    const { email, password } = this.state;

    API.login({ username: email, password })
      .then(res => {
        addUser(res.data);
        if (res.data.token) {
          history.push('/dashboard');
          this.setState({ error: '' });
        }
      })
      .catch(error => {
        if (error.response) {
          this.setState({ error: error.response.data.message });
        }
        console.log(error);
      });
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;
    return (
      <div className={styles.Login}>
        <Grid container>
          <Grid
            className={styles.Login_column}
            item
            xl={4}
            lg={4}
            sm={12}
            md={5}
            xs={12}
          >
            <Grid container justify="center" direction="column">
              <Grid
                item
                className={styles.gridItem}
                // style={{ flex: '1 0 150px', alignSelf: 'center' }}
              >
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
                            isPasswordValid(password)
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

                  <button className={styles.btn} type="submit" label="Login">
                    Login
                  </button>

                  <p className={styles.text_center}>
                    <NavLink to="/registration" className={styles.link}>
                      Register
                    </NavLink>
                  </p>
                </form>
                {error && <p className={styles.Login_error}>{error}</p>}
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
)(Login);
