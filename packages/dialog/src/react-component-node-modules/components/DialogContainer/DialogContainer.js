import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import idx from 'idx'
import { noop, uniqueId } from 'lodash/core'
import Draggable from 'react-draggable'
import { withStateHandlers, compose } from 'recompose'

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
    background-image: ${({ type, theme, iconsSrc }) =>
      `url(${iconsSrc.svg[`btn_${type}_${theme}`] ||
        iconsSrc.png[`btn_${type}_${theme}`] ||
        ''})`};
  }

  &:hover {
    i {
      background-image: ${({ type, theme, iconsSrc }) => {
        const url =
          idx(iconsSrc, _ => _.svg[`btn_${type}_over_${theme}`]) ||
          idx(iconsSrc, _ => _.png[`btn_${type}_over_${theme}`]) ||
          ''
        return `url("${url}")`
      }};
    }
  }

  &:active {
    i {
      background-image: ${({ type, theme, iconsSrc }) => {
        const url =
          idx(iconsSrc, _ => _.svg[`btn_${type}_pressed_${theme}`]) ||
          idx(iconsSrc, _ => _.png[`btn_${type}_pressed_${theme}`]) ||
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
  draggableSelector,
  disableDraggableSelector,
  draggableOpts,
  showClose,
  showMini,
  onClose = noop,
  onMiniify = noop,
  ...rest
}) => {
  const controlBarClass = uniqueId('control_bar__')
  const cancelSelector = disableDraggableSelector
    ? [`.${controlBarClass}`, disableDraggableSelector].join(', ')
    : `.${controlBarClass}`

  return (
    <Draggable bounds="body" handle={draggableSelector} cancel={cancelSelector} {...draggableOpts}>
      <Container {...rest} visible={visible}>
        <ControlBar className={controlBarClass}>
          {showMini ? (
            <ControlIcon
              type="mini"
              theme={theme}
              iconsSrc={icons}
              onClick={onMiniify}
            >
              <i />
            </ControlIcon>
          ) : null}
          {showClose ? (
            <ControlIcon
              type="close"
              theme={theme}
              iconsSrc={icons}
              onClick={onClose}
            >
              <i />
            </ControlIcon>
          ) : null}
        </ControlBar>
        <Content>{children}</Content>
      </Container>
    </Draggable>
  )
}

DialogContainer.propTypes = {
  className: PropTypes.string,
  draggableSelector: PropTypes.string,
  disableDraggableSelector: PropTypes.string,
  draggableOpts: PropTypes.object,
  theme: PropTypes.oneOf(['light', 'dark']),
  visible: PropTypes.bool,
  showClose: PropTypes.bool,
  showMini: PropTypes.bool,
  onClose: PropTypes.func,
  onMiniify: PropTypes.func,
}

DialogContainer.defaultProps = {
  theme: 'light',
  visible: false,
}

const enhancer = compose(
  withStateHandlers(() => ({ activeDrags: 0 }), {
    onStart: ({ activeDrags }) => () => ++activeDrags,
    onStop: ({ activeDrags }) => () => --activeDrags,
  }),
)

export default enhancer(DialogContainer)
