import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

class App extends Component {
  state = { value: '', open: false }

    handleSearchChange = (e, { value }) => {
      this.setState({ value });
    }

    handleClose = (value) => {
      this.setState({ open: value });
    }

    handleOpen = (value) => {
      this.setState({ open: value });
    }

    render() {
      return (
      <Grid container >
        <Grid item xs={12}>
        <Paper>Initial commitfasfasfasf</Paper>
        </Grid>
     </Grid>
      );
    }
}

export default App;