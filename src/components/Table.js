import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import LocalStorage from '../helpers/myLocalStorage';
import rows from '../helpers/data';

//const colors = ['green', 'red', 'blue', 'purple']
const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit,
    overflowX: 'auto',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      minWidth: '400',
    },

  },
  lines: {
    display: 'flex',
    justifyContent: 'space-between',
    minWidth: 600,
    marginBottom: 5,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      minWidth: 80,
    },
  },
  day: {
    width: 80,
    padding: 10,
    [theme.breakpoints.down('sm')]: {
      marginBottom: 15,
    },
  },
  green: {
    color: 'green',
  },
  red: {
    color: 'red',
  },
  blue: {
    color: 'blue',
  },
  purple: {
    color: 'purple',
  },
})

class MyTable extends React.Component {
  state = { data: LocalStorage.get(this.props.booked) || [] }

  handleClick = (index, value) => {
    const arr = this.state.data;
    if (localStorage.user != '')  {
    const obj = { index, value, date: this.props.date, user: localStorage.user }
    const number = arr.findIndex((item) => {
      if (item.index === index && item.value === value && item.date === this.props.date) {
        return item;
      }
    });
    if (number !== -1) {
      if (arr[number].user === localStorage.user) {
        arr.splice(number, 1);
      }
    } else {
      arr.push(obj);
    }
    this.setState({ data: arr });
    LocalStorage.put(this.props.booked, arr);
   } else {
      console.log("User is not defined")
    }
  }

  check = (index, value) => {
    const arrayToCheck = this.state.data;
    let isCheck = false;
    arrayToCheck.forEach((item) => {
      if (item.index === index && item.value === value && item.date === this.props.date ) {
        isCheck = !isCheck;
      }
    });
    return isCheck;
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {rows.map((row) => {
          return (
            <div className={classes.lines} key={row.id}>
              <div className={classes.day}>
                <FormLabel className={classes[`${row.roomColor.toLowerCase()}`]}>{row.roomColor}</FormLabel>
              </div>
              {row.arrayWithTime.map((item, index) => {
                return (
                  <div key={index}>
                   <Button variant='contained' color={this.check(row.id, item) ? 'secondary' : 'primary'}
                            onClick={localStorage.user ? () => this.handleClick(row.id, item) : null}>
                      {item}
                    </Button>
                  </div>);
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

MyTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MyTable);
