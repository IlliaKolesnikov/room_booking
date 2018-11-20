import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
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
});


class SimpleTable extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid container justify='center'>
        <Card md={8}>
          <CardHeader title='Бронирование переговорных'></CardHeader>
          <CardContent>
            <Grid container>
              <Grid item md={2}>
              Комната
              </Grid>
              <Grid item md={10}> Июль </Grid>
              <Grid item sm={2}>
              <Paper className={classes.root}> Green</Paper>
              </Grid>
              <Grid item sm={10}>
                <MyTable roomColor={'green'}/>
              </Grid>
              <Grid item sm={2}>
              <Paper className={classes.root}> Red</Paper>
              </Grid>
              <Grid item sm={10}>
                <MyTable roomColor={'red'}/>
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
