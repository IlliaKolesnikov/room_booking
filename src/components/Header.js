import React from 'react'
import { object, string } from 'prop-types'
import classNames from 'classnames'
import FormLabel from '@material-ui/core/FormLabel';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Grid from "@material-ui/core/Grid";
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper'
import MenuList from '@material-ui/core/MenuList';
// @material-ui/icons
import Person from "@material-ui/icons/Person";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Link } from 'react-router-dom'
import { Toolbar, Typography, withStyles } from '@material-ui/core'
//import connector from './connector'

const styles = theme => ({
  root: {
    flexGrow: 1,
    color: 'white',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  title: {
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'flex-end',
    [theme.breakpoints.up('sm')]: {
      textAlign: 'left',
    },
  },
})

class Header extends React.Component {
  state = {
    open: false,
  };

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
    this.props.signOut()
  };

  render() {
    const { classes, color } = this.props
    const { open } = this.state
    return (<header className={classes.root}>
      <div className={classNames(color)}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="title" color="secondary" className={classes.title}>

            <Grid container alignItems="center">
              <Grid item>
                <FormLabel> {localStorage.mail} </FormLabel>
              </Grid>
              <Grid item> {//выпадающий Sign Out на кнопку
              }
                <IconButton
                  buttonRef={node => {
                    this.anchorEl = node;
                  }}
                  aria-owns={open ? 'menu-list-grow' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleToggle}
                >
                  <AccountCircle />
                </IconButton>
                <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      id="menu-list-grow"
                      style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                      <Paper>
                        <MenuList>
                          <MenuItem onClick={this.handleClose}>Sign In</MenuItem>
                        </MenuList>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </Grid>
            </Grid>

          </Typography>

        </Toolbar>
      </div>
    </header>)
  }
}

Header.propTypes = {
  classes: object.isRequired,
  color: string.isRequired,
}

export default withStyles(styles)(Header)
