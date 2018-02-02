import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { identity } from 'lodash/core'
import { compose } from 'recompose'

import DialogContainer from '../DialogContainer/DialogContainer'

const StyledDialogContainer = styled(DialogContainer)`
  position: relative;
`
const ContentBlock = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  word-break: break-all;
`

const TextDialog = ({
  children,
  disableDraggableSelector,
  onResize,
  rndOpts,
  ...rest
}) => {
  return (
    <StyledDialogContainer
      maxWidth={450}
      {...rndOpts}
      {...rest}
    >
      <ContentBlock>{children}</ContentBlock>
    </StyledDialogContainer>
  )
}

TextDialog.propTypes = {
  className: PropTypes.string,
  bounds: PropTypes.string,
  draggableSelector: PropTypes.string,
  disableDraggableSelector: PropTypes.string,
  minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  minHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  draggableOpts: PropTypes.object,
  visible: PropTypes.bool,
  rndOpts: PropTypes.object,
  onClose: PropTypes.func,
  confirmText: PropTypes.string,
  onConfirm: PropTypes.func,
  cancelText: PropTypes.string,
  onCancel: PropTypes.func,
}

TextDialog.defaultProps = {
  visible: false,
  rndOpts: {},
  minWidth: 340,
  minHeight: 450
}

const enhancer = compose(identity)

export default enhancer(TextDialog)
