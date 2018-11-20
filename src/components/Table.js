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

/*let id = 0;
const arrayWithTime = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

function createData(day) {
  id += 1;
  return { id, day, arrayWithTime };
}


const rows = [
  createData('Понедельник', arrayWithTime),
  createData('Вторник', arrayWithTime),
  createData('Среда', arrayWithTime),
  createData('Четверг', arrayWithTime),
  createData('Пятница', arrayWithTime),
];*/

class MyTable extends React.Component {
  state = { data: LocalStorage.get(this.props.roomColor) || [] }

  handleClick = (index, value) => {
    const arr = this.state.data;
    const obj = { index: index, value: value};
    arr.push(JSON.stringify(obj));
    this.setState({ data: arr });
    LocalStorage.put(this.props.roomColor, arr);
  };

  check = (index, value) => {
    const arrayToCheck = this.state.data;
    let isCheck = false;
    arrayToCheck.forEach((item) => {
      if (JSON.parse(item).index === index && JSON.parse(item).value === value) {
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
                       <TableCell key={index} numeric>
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
