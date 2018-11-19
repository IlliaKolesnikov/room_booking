import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

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
function createData(name, calories, fat, carbs, protein, kasha, kefir, ryazhanka, seledka, grudka) {
  id += 1;
  return { id, name, calories, fat, carbs, protein, kasha, kefir, ryazhanka, seledka, grudka };
}
const rows = [
  createData('Понедельник', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'),
  createData('Вторник', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'),
  createData('Среда', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'),
  createData('Четверг', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'),
  createData('Пятница', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'),
];

function SimpleTable(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableBody>
          {rows.map((row) => {
            return (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell numeric>
                <Button>
                {row.calories}
                </Button>
                </TableCell>
                <TableCell numeric><Button>{row.fat}</Button></TableCell>
                <TableCell numeric><Button>{row.carbs}</Button></TableCell>
                <TableCell numeric><Button>{row.protein}</Button></TableCell>
                <TableCell numeric><Button>{row.kasha}</Button></TableCell>
                <TableCell numeric><Button>{row.kefir}</Button></TableCell>
                <TableCell numeric><Button>{row.ryazhanka}</Button></TableCell>
                <TableCell numeric><Button>{row.seledka}</Button></TableCell>
                <TableCell numeric><Button>{row.grudka}</Button></TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);