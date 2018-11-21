import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { withTheme, withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import Calendar from './Calendar';
import MyTable from './Table';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: 30,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
});

class App extends React.Component {
  state = { selected: moment(new Date()).format('DD-MM-YYYY') }

  handleSelectDate = (date) => {
    if (!date) {
      this.setState({ selected: date });
    } else {
      this.setState({ selected: date });
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid container justify='center' className={classes.root}>
      <Calendar onSelectDate={this.handleSelectDate} />
        <Card md={8}>
          <CardHeader title='Бронирование переговорных'></CardHeader>
          <CardContent>
            <Grid container>
              <Grid item xs={12}>
                <MyTable date={this.state.selected} booked={'booked'}/>
              </Grid>
            </Grid>
          </CardContent>
        </Card >
      </Grid>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withTheme()(withStyles(styles)(App));
