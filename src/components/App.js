import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Popper from '@material-ui/core/Popper';
import classNames from 'classnames';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuList from '@material-ui/core/MenuList';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import moment from 'moment';
import Calendar from './Calendar';
import Grow from '@material-ui/core/Grow';

import MyTable from './Table';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  margin: {
    margin: theme.spacing.unit,
  },
  textField: {
    flexBasis: 200,
  },
});

const ranges = [
  {
    value: '0-20',
    label: 'Green',
  },
  {
    value: '21-50',
    label: 'Red',
  },
  {
    value: '51-100',
    label: 'Blue',
  },
  {
    value: '101-300',
    label: 'Purple',
  },
];


class SimpleTable extends React.Component {

  state = { weightRange: ranges }
  
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleSelectDate = date => {
    if (!date) this.setState({ selected: date })
    else this.setState({ selected: moment(date).format('YYYY-MM-DD') })
  }

  render() {
    const { classes } = this.props;
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
          <TextField
          select
          className={classNames(classes.root, classes.textField)}
          variant="outlined"
        defaultValue={this.state.weightRange}
          value={this.state.weightRange}
          onChange={this.handleChange('weightRange')}
        >
          {ranges.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
              </Grid>
              <Grid item sm={10}>
                <MyTable roomColor={'green'}/>
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

export default withStyles(styles)(SimpleTable);
