import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import idx from 'idx'
import { noop, uniqueId } from 'lodash/core'
import Rnd from 'react-rnd'
import { withHandlers, withStateHandlers, lifecycle, compose } from 'recompose'

import { $gray01, $bgColor } from '../../styled_global/colors'
import { importAllFiles } from '../../utils/utils'

const icons = importAllFiles(
  require.context('../../assets/control_bar', true, /\.(png|jpe?g|svg)$/),
)

const Container = styled.div`
  display: ${props => (props.visible ? 'block' : 'none')};
  position: relative;
  box-sizing: border-box;
  height: 100%;
  background: ${$bgColor};
  border: 1px solid ${$gray01};
  overflow: hidden;
  padding: 24px;

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
  position: relative;
  width: 100%;
  height: 100%;
`

const DialogContainer = ({
  children,
  bounds,
  position,
  theme,
  visible,
  draggableSelector,
  disableDraggableSelector,
  rndOpts,
  showClose,
  showMini,
  registerChild,
  zIndex,
  width,
  height,
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
  onClose = noop,
  onMiniify = noop,
  onResize = noop,
  onReset = noop,
  ...rest
}) => {
  const controlBarClass = uniqueId('control_bar__')
  const cancelSelector = disableDraggableSelector
    ? [`.${controlBarClass}`, disableDraggableSelector].join(', ')
    : `.${controlBarClass}`
  
  const rndStyle = {
    position,
  }
  
  return (
    <Rnd
      bounds={bounds}
      style={rndStyle}
      dragHandleClassName={draggableSelector}
      cancel={cancelSelector}
      ref={registerChild}
      minWidth={minWidth}
      minHeight={minHeight}
      maxWidth={maxWidth}
      maxHeight={maxHeight}
      onResize={onResize}
      z={zIndex}
      {...rndOpts}
    >
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
    </Rnd>
  )
}

DialogContainer.propTypes = {
  className: PropTypes.string,
  bounds: PropTypes.string,
  containerPosition: PropTypes.string,
  draggableSelector: PropTypes.string,
  disableDraggableSelector: PropTypes.string,
  rndOpts: PropTypes.object,
  theme: PropTypes.oneOf(['light', 'dark']),
  visible: PropTypes.bool,
  showClose: PropTypes.bool,
  showMini: PropTypes.bool,
  zIndex: PropTypes.number,
  minWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  minHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  maxHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onClose: PropTypes.func,
  onMiniify: PropTypes.func,
  onResize: PropTypes.func,
  onReset: PropTypes.func,
}

DialogContainer.defaultProps = {
  bounds: 'html',
  position: 'absolute',
  theme: 'light',
  zIndex: 99999,
  visible: false,
}

const enhancer = compose(
  withStateHandlers(() => ({ width: 0, height: 0 }), {
    setWxH: () => (width, height) => ({ width, height }),
  }),
  withHandlers(() => {
    let ref_
    return {
      registerChild: () => ref => (ref_ = ref),
      setChildSize: ({ setWxH }) => () => {
        if (!ref_) return
        const node = ReactDOM.findDOMNode(ref_)
        const { width, height } = node.getBoundingClientRect()
        setWxH(width, height)
      },
    }
  }),
  lifecycle({
    componentDidMount() {
      window.addEventListener('load', () => this.props.setChildSize())
    },
    componentDidUpdate() {
      this.props.setChildSize()
    },
  }),
)

export default enhancer(DialogContainer)
