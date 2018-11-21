import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import LocalStorage from './myLocalStorage.js';
import rows from '../helpers/data';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

class MyTable extends React.Component {
  state = { data: LocalStorage.get(this.props.booked) || [] }

  handleClick = (index, value) => {
    const arr = this.state.data;
    const obj = { index, value, date: this.props.date };
    const number = arr.findIndex((item) => {
      if (JSON.parse(item).index === index && JSON.parse(item).value === value && JSON.parse(item).date === this.props.date) {
        return item;
      }
    });
    if (number !== -1) {
      arr.splice(number, 1);
    } else {
      arr.push(JSON.stringify(obj));
    }
    this.setState({ data: arr });
    LocalStorage.put(this.props.booked, arr);
  };

  check = (index, value) => {
    const arrayToCheck = this.state.data;
    let isCheck = false;
    arrayToCheck.forEach((item) => {
      if (JSON.parse(item).index === index && JSON.parse(item).value === value && JSON.parse(item).date === this.props.date) {
        isCheck = !isCheck;
      }
    });
    return isCheck;
  }

  render() {
    const { classes } = this.props;
    return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableBody>
          {rows.map((row) => { 
            return (
                  <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        {row.day}
                    </TableCell >
                    {row.arrayWithTime.map((item, index) => {
                      return (
                       <TableCell key={index} numeric >
                         <Button variant='contained' color={this.check(row.id, item) ? 'secondary' : 'primary'} onClick={() => this.handleClick(row.id, item)}>
                            {item}
                         </Button>
                       </TableCell>);
                    })}
                  </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
    );
  }
}

MyTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MyTable);
