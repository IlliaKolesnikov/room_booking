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
    justifyContent: 'space-evenly',
    marginTop: 30,
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  header: {
    backgroundColor: 'rgb(68, 138, 255)',
    color: 'white',
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
        <Card style={{ height: '100%' }}>
          <CardHeader className={classes.header} title='Бронирование переговорных'
          titleTypographyProps={{ color: 'inherit' }} style={{}}
          />
          <CardContent>
            <Grid container>
              <Grid item>
                <Calendar onSelectDate={this.handleSelectDate} />
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
