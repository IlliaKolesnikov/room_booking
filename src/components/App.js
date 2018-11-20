import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import moment from 'moment';
import Calendar from './Calendar';


import MyTable from './Table';


class SimpleTable extends React.Component {
  state = { selected: moment(new Date()).format('DD-MM-YYYY') }
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleSelectDate = date => {
    console.log(date)
    if (!date) this.setState({ selected: date })
    else this.setState({ selected: date })
  }

  render() {
    return (
      <Grid container justify='center'>
      <Calendar onSelectDate={this.handleSelectDate} />
        <Card md={8}>
          <CardHeader title='Бронирование переговорных'></CardHeader>
          <CardContent>
            <Grid container>
              <Grid item md={2}>
              Комната
              </Grid>
              <Grid item md={10}> Июль </Grid>
              <Grid item sm={2}>
              </Grid>
              <Grid item sm={10}>
                <MyTable date={this.state.selected} roomColor={'green'}/>
              </Grid>
              
            </Grid>
          </CardContent>
        </Card >
      </Grid>
    );
  }
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default SimpleTable;
