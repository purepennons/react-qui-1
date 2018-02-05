import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { noop, uniqueId } from 'lodash/core'
import { Button } from '@react-qui/button'
import Rnd from 'react-rnd'
import { withHandlers, withStateHandlers, lifecycle, compose } from 'recompose'

import { $gray01, $bgColor } from '../../styled_global/colors'
import { importAllFiles } from '../../utils/utils'
import { ControlBar, ControlIcon } from './contorlBar'

const icons = importAllFiles(
  require.context('../../assets/control_bar', true, /\.(png|jpe?g|svg)$/),
)

const controlBarClass = uniqueId('control_bar__')
const buttonClass = uniqueId('button_group__')

// const getTotalOffset = offsets => {
//   return Object.keys(offsets).reduce(
//     (acc, curr) => {
//       return {
//         w: acc.w + offsets[curr].w,
//         h: acc.h + offsets[curr].h,
//       }
//     },
//     { w: 0, h: 0 },
//   )
// }
        
// const updateOffset = (offset, originOffset) => {
//   if (Math.sign(offset) !== Math.sign(originOffset))
//     return offset + originOffset
//   return offset
// }

const Container = styled.div`
  display: ${props => (props.visible ? 'block' : 'none')};
  position: relative;
  box-sizing: border-box;
  height: 100%;
  background: ${$bgColor};
  border: 1px solid ${$gray01};
  overflow: hidden;
  padding: 0;
  margin: 0;

  * {
    box-sizing: border-box;
  }
`
const Content = styled.div`
  position: relative;
  min-height: calc(100% - 74px);
  padding: 0 24px 20px 24px;
`

const ButtonGroup = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  padding: 0 24px 24px 24px;
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
  registerRef,
  zIndex,
  parent,
  child,
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
  confirmText,
  cancelText,
  onClose = noop,
  onMiniify = noop,
  onResize = noop,
  onReset = noop,
  onConfirm = noop,
  onCancel = noop,
  ...rest
}) => {
  const parentMinWidth = parent.w > 0 ? parent.w : 'auto'
  const parentMinHeight = parent.h > 0 ? parent.h : 'auto'

  const rndStyle = {
    position,
  }

  const cancelSelector = disableDraggableSelector
    ? [`.${controlBarClass}`, `.${buttonClass}`, disableDraggableSelector].join(
        ',',
      )
    : [`.${controlBarClass}`, `.${buttonClass}`].join(',')

  return (
    <Rnd
      bounds={bounds}
      style={rndStyle}
      dragHandleClassName={draggableSelector}
      cancel={cancelSelector}
      ref={registerRef('parent')}
      minWidth={parentMinWidth}
      minHeight={parentMinHeight}
      maxWidth={maxWidth}
      maxHeight={maxHeight}
      z={zIndex}
      onResize={onResize}
      onReset={onReset}
      {...rndOpts}
    >
      <Container {...rest} visible={visible}>
        <ControlBar>
          {showMini ? (
            <ControlIcon
              className={controlBarClass}
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
              className={controlBarClass}
              type="close"
              theme={theme}
              iconsSrc={icons}
              onClick={onClose}
            >
              <i />
            </ControlIcon>
          ) : null}
        </ControlBar>
        <Content ref={registerRef('child')}>{children}</Content>
        <ButtonGroup>
          {confirmText ? (
            <Button
              className={buttonClass}
              theme="light"
              shape="square"
              onClick={onConfirm}
            >
              {confirmText}
            </Button>
          ) : null}
          {cancelText ? (
            <Button
              className={buttonClass}
              theme="light"
              shape="square"
              onClick={onCancel}
            >
              {cancelText}
            </Button>
          ) : null}
        </ButtonGroup>
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
  confirmText: PropTypes.string,
  onConfirm: PropTypes.func,
  cancelText: PropTypes.string,
  onCancel: PropTypes.func,
}

DialogContainer.defaultProps = {
  bounds: 'html',
  position: 'absolute',
  theme: 'light',
  zIndex: 99999,
  visible: false,
  maxWidth: 'auto',
  maxHeight: 'auto'
}

const enhancer = compose(
  withStateHandlers(
    () => ({
      parent: {
        w: 0,
        h: 0,
      },
      child: {
        w: 0,
        h: 0,
      },
      resizeOffset: {
        bottom: { w: 0, h: 0 },
        bottomLeft: { w: 0, h: 0 },
        bottomRight: { w: 0, h: 0 },
        left: { w: 0, h: 0 },
        right: { w: 0, h: 0 },
        top: { w: 0, h: 0 },
        topLeft: { w: 0, h: 0 },
        topRight: { w: 0, h: 0 },
      },
    }),
    {
      setWxH: state => (width, height, key) => ({
        ...state,
        [key]: { w: width, h: height },
      }),
      // onResize: state => (evt, direction, ref, delta, position) => {
      //   const originOffset = state.resizeOffset
      //   const resizeOffset = {
      //     ...originOffset,
      //     [direction]: {
      //       w: updateOffset(delta.width, originOffset[direction].w),
      //       h: updateOffset(delta.height, originOffset[direction].h),
      //     },
      //   }
      //   return { ...state, resizeOffset }
      // },
    },
  ),
  withHandlers(() => {
    let ref_ = {}
    return {
      registerRef: () => key => ref => (ref_[key] = ref),
      setElementSize: ({ setWxH }) => key => {
        if (!ref_[key]) return
        const node = ReactDOM.findDOMNode(ref_[key])
        const { width, height } = node.getBoundingClientRect()
        setWxH(width, height, key)
      },
    }
  }),
  lifecycle({
    componentDidMount() {
      window.addEventListener('load', () => {
        this.props.setElementSize('parent')
        this.props.setElementSize('child')
      })
    },
  }),
)

export default enhancer(DialogContainer)
