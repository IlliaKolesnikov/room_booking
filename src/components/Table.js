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

let id = 0;
function createData(day, calories, fat, carbs, protein, kasha, kefir, ryazhanka, seledka, grudka) {
  id += 1;
  return { id, day, calories, fat, carbs, protein, kasha, kefir, ryazhanka, seledka, grudka };
}

const rows = [
  createData('Понедельник', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'),
  createData('Вторник', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'),
  createData('Среда', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'),
  createData('Четверг', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'),
  createData('Пятница', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'),
];
class MyTable extends React.Component {
  state = { data: LocalStorage.get('time') || [] }

  handleClick = (index, value) => {
    const arr = this.state.data;
    const obj = { index: index, value: value, taken: true };
    arr.push(JSON.stringify(obj));
    this.setState({ data: arr });
    LocalStorage.put('time', arr);
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
                </TableCell>
                <TableCell numeric>
                <Button color={this.check(row.id, row.calories) ? 'secondary' : 'primary'} onClick={() => this.handleClick(row.id, row.calories)}>
                {row.calories}
                </Button>
                </TableCell>
                <TableCell numeric>
                <Button color={this.check(row.id, row.fat) ? 'secondary' : 'primary'} onClick={() => this.handleClick(row.id, row.fat)}>
                {row.fat}
                </Button>
                </TableCell>
                <TableCell numeric><Button color={this.check(row.id, row.carbs) ? 'secondary' : 'primary'} onClick={() => this.handleClick(row.id, row.carbs)}>{row.carbs}</Button></TableCell>
                <TableCell numeric><Button color={this.check(row.id, row.protein) ? 'secondary' : 'primary'} onClick={() => this.handleClick(row.id, row.protein)}>{row.protein}</Button></TableCell>
                <TableCell numeric><Button color={this.check(row.id, row.kasha) ? 'secondary' : 'primary'} onClick={() => this.handleClick(row.id, row.kasha)}>{row.kasha}</Button></TableCell>
                <TableCell numeric><Button color={this.check(row.id, row.kefir) ? 'secondary' : 'primary'} onClick={() => this.handleClick(row.id, row.kefir)}>{row.kefir}</Button></TableCell>
                <TableCell numeric><Button color={this.check(row.id, row.ryazhanka) ? 'secondary' : 'primary'} onClick={() => this.handleClick(row.id, row.ryazhanka)}>{row.ryazhanka}</Button></TableCell>
                <TableCell numeric><Button color={this.check(row.id, row.seledka) ? 'secondary' : 'primary'} onClick={() => this.handleClick(row.id, row.seledka)}>{row.seledka}</Button></TableCell>
                <TableCell numeric><Button color={this.check(row.id, row.grudka) ? 'secondary' : 'primary'} onClick={() => this.handleClick(row.id, row.grudka)}>{row.grudka}</Button></TableCell>
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
