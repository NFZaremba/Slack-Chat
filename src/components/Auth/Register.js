import React, { Component } from 'react';
import firebase from '../../firebase';
import md5 from 'md5';
import { Link } from 'react-router-dom';
import isEmpty from '../../validation/isEmpty';
import {
  RegisterValidation,
  passwordMatch,
  formEmpty
} from '../../validation/RegisterValidation';
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon
} from 'semantic-ui-react';

class Register extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    errors: {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    },
    loading: false,
    usersRef: firebase.database().ref('users')
  };

  handleChange = evt => {
    const { name, value } = evt.target;

    let errorsResult = RegisterValidation(name, value);

    this.setState({
      [name]: value,
      errors: Object.assign({}, this.state.errors, errorsResult)
    });
  };

  isFormEmpty = () => {
    const results = formEmpty(this.state);

    if (Object.keys(results).length === 0) return false;

    this.setState({
      ...this.state,
      errors: results
    });
    return true;
  };

  checkMatchPassword = () => {
    if (passwordMatch()) return true;

    this.setState({
      ...this.state,
      errors: {
        ...this.state.errors,
        passwordConfirmation: 'passwords do not match'
      }
    });

    return false;
  };

  handleSubmit = async evt => {
    evt.preventDefault();

    if (!this.checkMatchPassword()) return;
    if (this.isFormEmpty()) return;

    this.setState({
      ...this.state,
      errors: {},
      loading: true
    });

    this.createUser();
  };

  createUser = async () => {
    try {
      const createdUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password);

      console.log(createdUser);
      if (isEmpty(createdUser)) {
        throw new Error('error occured while processing');
      }

      createdUser.user.updateProfile({
        displayName: this.state.username,
        photoURL: `http://gravatar.com/avatar/${md5(
          createdUser.user.email
        )}?d=identicon`
      });

      const userSaved = await this.saveUser(createdUser);
      console.log(userSaved);

      this.setState({ loading: false });
    } catch (err) {
      console.log(err);
      this.setState({ loading: false });
    }
  };

  saveUser = createdUser => {
    if (!createdUser) return console.warn('no user created');

    return this.state.usersRef.child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      avatar: createdUser.user.photoURL
    });
  };

  render() {
    const {
      username,
      email,
      password,
      passwordConfirmation,
      errors,
      loading
    } = this.state;
    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" icon color="orange" textAlign="center">
            <Icon name="puzzle piece" color="orange" />
            Register for DevChat
          </Header>
          <Form onSubmit={this.handleSubmit} size="large">
            <Segment stacked>
              <Form.Input
                fluid
                type="text"
                name="username"
                icon="user"
                iconPosition="left"
                placeholdder="Username"
                onChange={this.handleChange}
                value={username}
                className={errors.username ? 'error' : ''}
              />
              <p style={{ color: 'red' }}>{errors.username}</p>
              <Form.Input
                fluid
                type="email"
                name="email"
                icon="mail"
                iconPosition="left"
                placeholdder="Email Address"
                onChange={this.handleChange}
                value={email}
                className={errors.email ? 'error' : ''}
              />
              <p style={{ color: 'red' }}>{errors.email}</p>
              <Form.Input
                fluid
                type="password"
                name="password"
                icon="lock"
                iconPosition="left"
                placeholdder="Password"
                onChange={this.handleChange}
                value={password}
                className={errors.password ? 'error' : ''}
              />
              <p style={{ color: 'red' }}>{errors.password}</p>
              <Form.Input
                fluid
                type="password"
                name="passwordConfirmation"
                icon="repeat"
                iconPosition="left"
                placeholdder="Password Confirmation"
                onChange={this.handleChange}
                value={passwordConfirmation}
                className={errors.passwordConfirmation ? 'error' : ''}
              />
              <p style={{ color: 'red' }}>{errors.passwordConfirmation}</p>
              <Button
                disabled={loading}
                className={loading ? 'loading' : ''}
                color="orange"
                fluid
                size="large"
              >
                Submit
              </Button>
            </Segment>
          </Form>
          <Message>
            Already a User? <Link to="/">Login</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Register;
