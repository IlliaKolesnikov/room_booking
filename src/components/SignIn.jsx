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
import { signIn, signUp } from '../redux/actions/sign';

const styles = {
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

};

class SignIn extends Component {
  state = {
    password: '',
    mail: '',
  }

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  }

  onMailChange = (event) => {
    this.setState({ mail: event.target.value });
  }

  render() {
    const { classes, error } = this.props;
    return (
      <div>
        <Grid container>
          <Grid item xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Sign into Trainer App</h4>
                <p className={classes.cardCategoryWhite}>Please enter your email and password</p>
              </CardHeader>
              <CardContent>
                <Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <TextField
                      label="Email adress"
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
              </CardContent>
                <Button color="primary" variant='contained' onClick={() => this.props.signIn(this.state.mail, this.state.password)}>
                  Sign in</Button>
                <div><Link to={'/signup'}>First time user? Sign up</Link></div>
              
            </Card>
          </Grid>

        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    sign: state,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    signIn: (userName, userPassword) => dispatch(signIn(userName, userPassword)),
    signUp: (userName, userPassword) => dispatch(signUp(userName, userPassword)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignIn));
