import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import {grey500, white} from 'material-ui/styles/colors';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import Help from 'material-ui/svg-icons/action/help';
import TextField from 'material-ui/TextField';
import {Link} from 'react-router';
import ThemeDefault from '../theme-default';
import API from '../Api/Api';

import { ValidatorForm } from 'react-form-validator-core';
import { TextValidator} from 'react-material-ui-form-validator';

import handleLogin from '../commonfunctions/Apicall'
const styles = {
  loginContainer: {
    minWidth: 320,
    maxWidth: 400,
    height: 'auto',
    position: 'absolute',
    top: '20%',
    left: 0,
    right: 0,
    margin: 'auto'
  },
  paper: {
    padding: 20,
    overflow: 'auto'
  },
  buttonsDiv: {
    textAlign: 'center',
    padding: 10
  },
  flatButton: {
    color: grey500
  },
  checkRemember: {
    style: {
      float: 'left',
      maxWidth: 180,
      paddingTop: 5
    },
    labelStyle: {
      color: grey500
    },
    iconStyle: {
      color: grey500,
      borderColor: grey500,
      fill: grey500
    }
  },
  loginBtn: {
    float: 'right'
  },
  btn: {
    background: '#4f81e9',
    color: white,
    padding: 7,
    borderRadius: 2,
    margin: 2,
    fontSize: 13
  },
  btnFacebook: {
    background: '#4f81e9'
  },
  btnGoogle: {
    background: '#e14441'
  },
  btnSpan: {
    marginLeft: 5
  },
};

class LoginPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: {},
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  componentWillMount(){
    if(localStorage.getItem('token') || sessionStorage.getItem('token')){
      console.log('user is already logged in');
      window.location.href = '../'
    }
  }
  handleChange(event) {
      const { user } = this.state;
      user[event.target.name] = event.target.value;
      this.setState({ user });
      console.log('comi:- ', this.state.user);
  }
  handleSubmit() {
        let that = this;
        let myStorage;
        // your submit logic
        console.log('handle submit', this.state);
        console.log(this.refs.rememberMe);
        var {user} = this.state;
        handleLogin('login',user)
        .then((res) => {
          console.log('res:_- ', res);
          if(res.response){
            alert(res.response.data.message);
          } else if(res.data.success){
            console.log('user_id:- ', res.data.data.user._id);
            // if rememberMe is Selected
            if(that.refs.rememberMe.state.switched){
              myStorage = window.localStorage;
            } else {
              // if rememberMe not selected
              myStorage = window.sessionStorage;
            }
            // myStorage.setItem('user_id',res.data.data.user_id)
            API.setHeaders(res.data.data.token);
            myStorage.setItem('token',res.data.data.token)
            myStorage.setItem('id', res.data.data.user._id)
            // myStorage.setItem('name',res.data.data.name)
            // myStorage.setItem('email',res.data.data.email)
            window.location.href = '../'
          } else {
            console.log('Something went wrong');
            alert('Something went wrong');
          }
        })
        .catch((err) => {
          console.log('err:-- ', err);
        })
    }
  handleCheckbox(e){
    console.log('e:- ',e);
  }
  render(){
    const user = this.state
    return (
      <MuiThemeProvider muiTheme={ThemeDefault}>
        <div>
          <div style={styles.loginContainer}>

            <Paper style={styles.paper}>
              <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmit}
                onError={errors => console.log(errors)}
            >
                <TextValidator
                    floatingLabelText="Email"
                    onChange={this.handleChange}
                    name="email"
                    fullWidth={true}
                    value={this.state.user.email}
                    validators={['required', 'isEmail']}
                    errorMessages={['this field is required', 'email is not valid']}
                />
                <TextValidator
                    floatingLabelText="Password"
                    onChange={this.handleChange}
                    name="password"
                    fullWidth={true}
                    type="password"
                    validators={['required']}
                    errorMessages={['this field is required']}
                    value={this.state.user.password}
                />
                <Checkbox
                  label="Remember me"
                  style={styles.checkRemember.style}
                  labelStyle={styles.checkRemember.labelStyle}
                  iconStyle={styles.checkRemember.iconStyle}
                  ref="rememberMe"
                />
                <RaisedButton label="Login" type="submit" primary={true} style={styles.loginBtn} />
            </ValidatorForm>
            </Paper>

            <div style={styles.buttonsDiv}>

              <FlatButton
                label="Want to Register ?"
                href="/register"
                style={styles.flatButton}
                icon={<Help />}
              />
            </div>


          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default LoginPage;
