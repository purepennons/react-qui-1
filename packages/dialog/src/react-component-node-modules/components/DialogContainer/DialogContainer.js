import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import idx from 'idx'
import { noop } from 'lodash/core'

import { $gray01, $bgColor } from '../../styled_global/colors'
import { importAllFiles } from '../../utils/utils'

const icons = importAllFiles(
  require.context('../../assets/control_bar', true, /\.(png|jpe?g|svg)$/),
)

const Container = styled.div`
  display: ${props => (props.visible ? 'block' : 'none')};
  position: relative;
  box-sizing: border-box;
  min-width: 340px;
  max-width: 450px;
  padding: 24px;
  background: ${$bgColor};
  border: 1px solid ${$gray01};

  * {
    box-sizing: border-box;
  }
`

const ControlBar = styled.div`
  display: flex;
  flex-flow: row nowrap;
  position: absolute;
  top: 10px;
  right: 10px;
`

const ControlIcon = styled.a`
  width: 16px;
  height: 16px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  i {
    width: 9px;
    height: 9px;
    background-repeat: no-repeat;
    background-position: center; 
  }

  .mini-icon {
    background-image: ${({ theme, iconsSrc }) =>
      `url(${
        iconsSrc.svg[`btn_mini_${theme}`] ||
        iconsSrc.png[`btn_mini_${theme}`] ||
        ''
      })`};
  }
  
  .close-icon {
    background-image: ${({ theme, iconsSrc }) =>
      `url(${
        iconsSrc.svg[`btn_close_${theme}`] ||
        iconsSrc.png[`btn_close_${theme}`] ||
        ''
      })`};
  }

  &:hover {
    .mini-icon {
      background-image: ${({ theme, iconsSrc }) => {
        const url = idx(iconsSrc, _ => _.svg[`btn_mini_over_${theme}`]) ||
          idx(iconsSrc, _ => _.png[`btn_mini_over_${theme}`]) ||
          ''
        return `url("${url}")`
      }};
    }

    .close-icon {
      background-image: ${({ theme, iconsSrc }) => {
        const url = idx(iconsSrc, _ => _.svg[`btn_close_over_${theme}`]) ||
          idx(iconsSrc, _ => _.png[`btn_close_over_${theme}`]) ||
          ''
        return `url("${url}")`
      }};
    }
  }

  &:active {
    .mini-icon {
      background-image: ${({ theme, iconsSrc }) => {
        const url = idx(iconsSrc, _ => _.svg[`btn_mini_pressed_${theme}`]) ||
          idx(iconsSrc, _ => _.png[`btn_mini_pressed_${theme}`]) ||
          ''
        return `url("${url}")`
      }};
    }

    .close-icon {
      background-image: ${({ theme, iconsSrc }) => {
        const url = idx(iconsSrc, _ => _.svg[`btn_close_pressed_${theme}`]) ||
          idx(iconsSrc, _ => _.png[`btn_close_pressed_${theme}`]) ||
          ''
        return `url("${url}")`
      }};
    }
  }
`

const Content = styled.div`
  margin: 0;
  padding: 0;
`

const DialogContainer = ({
  children,
  theme,
  visible,
  onClose = noop,
  ...rest
}) => {
  return (
    <Container {...rest} visible={visible}>
      <ControlBar>
        <ControlIcon theme={theme} iconsSrc={icons}>
          <i className="mini-icon" />
        </ControlIcon>
        <ControlIcon theme={theme} iconsSrc={icons}>
          <i className="close-icon" />
        </ControlIcon>
      </ControlBar>
      <Content>{children}</Content>
    </Container>
  )
}

DialogContainer.propTypes = {
  className: PropTypes.string,
  theme: PropTypes.oneOf(['light', 'dark']),
  onClose: PropTypes.func,
  visible: PropTypes.bool,
}

DialogContainer.defaultProps = {
  theme: 'light',
  visible: false,
}

export default DialogContainer
