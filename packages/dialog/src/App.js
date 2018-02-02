import React, { Component } from 'react'

import { TextDialog, PopupDialog } from './react-component-node-modules/'

const Fragment = React.Fragment

class App extends Component {
  render() {
    return (
      <Fragment>
        <TextDialog
          visible
          confirmText="Yes"
          cancelText="No"
          showClose
          showMini
          onClose={() => alert('close')}
          onConfirm={() => alert('confirm')}
          onCancel={() => alert('cancel')}
        >
          <p>
            VeryLongTextVeryLongTextVeryLongTextVeryLongTextVeryLongTextVeryLongTextVeryLongTextVeryLongTextVeryLongTextVeryLongTextVeryLongTextVeryLongTextVeryLongTextVeryLongTextVeryLongTextVeryLongTextVeryLongTextVeryLongTextVeryLongTextVeryLongTextVeryLongTextVeryLongTextVeryLongTextVeryLongTextVeryLongTextVeryLongText
          </p>
        </TextDialog>
        <PopupDialog visible level="info" confirmText="OK" />
        <PopupDialog visible level="warning" confirmText="OK" />
        <PopupDialog visible level="error" confirmText="OK" />
        <PopupDialog visible level="charging" confirmText="OK" />
        <PopupDialog visible level="ok" confirmText="OK" />
        <PopupDialog visible level="remind" confirmText="OK" />
        <PopupDialog visible level="delete" confirmText="OK" />
        <PopupDialog visible level="help" confirmText="OK" />
        <PopupDialog
          visible
          level="Error_but_system_still_can_process"
          confirmText="OK"
        />
      </Fragment>
    )
  }
}

export default App
