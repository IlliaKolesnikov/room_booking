import React, { Component } from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MySnackbar from './CustomSnackbar'

class SnackbarToUse extends Component {

  render() {
    const { onClose, variant, message } = this.props
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open
        autoHideDuration={4000}
        onClose={onClose}
      >
        <MySnackbar
          onClose={onClose}
          variant={variant}
          message={message}
        />
      </Snackbar>
    )
  }
}

export default SnackbarToUse
