import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import TextDialog from './TextDialog'
import { importAllFiles } from '../../utils/utils'

const icons = importAllFiles(require.context('../../assets/level', true, /\.(png|jpe?g|svg)$/))

const FlexContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
`

const IconBlock = styled.div`
  img {
    width: 32px;
    height: 32px;
  }
`

const MessageBlock = styled.div`
  padding: 8px 16px 0 16px;
  width: 100%;
  word-break: break-all;
`

const PopupDialog = ({ children, level, customIcon, ...rest }) => {
  const icon = customIcon || icons.svg[level] || icons.svg['info']
  return (
    <TextDialog {...rest}>
      <FlexContainer>
        <IconBlock>
          <img src={icon} alt={`${level}-popup`} />
        </IconBlock>
        <MessageBlock>
          {children}  
        </MessageBlock>
      </FlexContainer>
    </TextDialog>
  )
}

PopupDialog.propTypes = {
  className: PropTypes.string,
  visible: PropTypes.bool,
  level: PropTypes.oneOf(['info', 'warning', 'error', 'charging', 'ok', 'remind', 'delete', 'help', 'Error_but_system_still_can_process']),
  customIcon: PropTypes.string,
  onClose: PropTypes.func,
  confirmText: PropTypes.string,
  onConfirm: PropTypes.func,
  cancelText: PropTypes.string,
  onCancel: PropTypes.func,
}

PopupDialog.defaultProps = {
  visible: false,
  level: 'info',
}

export default PopupDialog
