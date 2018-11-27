import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import withStyles from '@material-ui/core/styles/withStyles';
import { signUp } from '../redux/actions/sign';

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'space-evenly',
    marginTop: 30,
  },
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0',
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: '\'Roboto\', \'Helvetica\', \'Arial\', sans-serif',
    marginBottom: '3px',
    textDecoration: 'none',
  },

}

class SignUp extends Component {
  state = {
    password: '',
    mail: '',
    repeatPassword: '',
  }

  onRepeatCheck = () => {

    if (this.state.password === this.state.repeatPassword) {
      this.props.signUp(this.state.mail, this.state.password)
    } else {
      console.log('The password isn\'t correct. Please try again')
    }
  }

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value })
  }

  onMailChange = (event) => {
    this.setState({ mail: event.target.value })
  }

  onRepeatPasswordChange = (event) => {
    this.setState({ repeatPassword: event.target.value })
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        <Grid container justify="center" className={classes.root}>
          <Grid item xs={12} sm={12} md={8}>
            <Card>
              <CardHeader title="Register with Booking App"
                          subheader="Please enter your email and password"
                          color="primary" />
              <CardContent>
                <Grid container>
                  <Grid item xs={12} sm={12} md={6}>
                    <TextField
                      label="Email address"
                      id="mail"
                      onChange={this.onMailChange}

                    />
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12} sm={12} md={6}>
                    <TextField
                      label="Password"
                      id="password"
                      onChange={this.onPasswordChange}
                      inputProps={{
                        type: 'password',
                      }}
                    />
                  </Grid>

                </Grid>
                <Grid container>
                  <Grid item xs={12} sm={12} md={6}>
                    <TextField
                      label="Repeat password"
                      id="repeat password"
                      onChange={this.onRepeatPasswordChange}
                      inputProps={{
                        type: 'password',
                      }}
                    />
                  </Grid>

                </Grid>
              </CardContent>
              <Button color="primary" variant="contained" onClick={this.onRepeatCheck}>Sign up</Button>
              <div><Link to={'/signin'}> Already have an account? Sign in</Link></div>

            </Card>
          </Grid>

        </Grid>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    sign: state,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    signUp: (userName, userPassword) => dispatch(signUp(userName, userPassword)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignUp))
