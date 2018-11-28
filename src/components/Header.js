import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import FormLabel from '@material-ui/core/FormLabel'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import MenuList from '@material-ui/core/MenuList'
import { Link } from 'react-router-dom'
import { Toolbar, Typography, withStyles } from '@material-ui/core'
// @material-ui/icons
import AccountCircle from '@material-ui/icons/AccountCircle'
import { signOut } from '../redux/actions/sign'

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
  }

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }))
  }

  signOutHandler = () => {
    this.setState({ open: false })
    this.props.signOut()
  }
  handleClose = () => {
    this.setState({ open: false })
  }

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
              <Grid item> {
              }
                <IconButton
                  buttonRef={node => {
                    this.anchorEl = node
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
                          {localStorage.user ?
                            <div><MenuItem onClick={this.signOutHandler}> Sign out </MenuItem></div> :
                            <div><MenuItem onClick={this.handleClose}> <Link to="/signin"> Sign in </Link> </MenuItem>
                              <MenuItem onClick={this.handleClose}> < Link to="/signup"> Sign up </Link> </MenuItem>
                            </div>
                          }
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

function mapStateToProps(state) {
  return {
    sign: state,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    signOut: () => dispatch(signOut()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Header))
