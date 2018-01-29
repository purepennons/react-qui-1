import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@react-qui/button'
import styled from 'styled-components'
import { noop, uniqueId, identity } from 'lodash/core'
import { compose } from 'recompose'
// import { withStateHandlers, compose } from 'recompose'

import DialogContainer from '../DialogContainer/DialogContainer'

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

const StyledDialogContainer = styled(DialogContainer)`
  position: relative;
`

const ButtonGroup = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  margin-right: -8px;
`

const ContentBlock = styled.div`
  width: 100%;
  ${'' /* button height + ContentBlock margin = 54px */}
  overflow: hidden;
  word-break: break-all;
  margin-bottom: 20px;
  min-height: calc(100% - 50px);
`

const TextDialog = ({
  children,
  confirmText,
  cancelText,
  disableDraggableSelector,
  resizeOffset,
  onResize,
  onConfirm = noop,
  onCancel = noop,
  rndOpts,
  ...rest
}) => {
  const buttonClass = uniqueId('button_group__')
  const cancelSelector = disableDraggableSelector
    ? [`.${buttonClass}`, disableDraggableSelector].join(', ')
    : `.${buttonClass}`
  return (
    <StyledDialogContainer
      disableDraggableSelector={cancelSelector}
      minWidth={340}
      minHeight={135}
      maxWidth={450}
      onResize={onResize}
      {...rndOpts}
      {...rest}
    >
      <ContentBlock>{children}</ContentBlock>
      {/* <ButtonGroup offset={getTotalOffset(resizeOffset)}> */}
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
    </StyledDialogContainer>
  )
}

TextDialog.propTypes = {
  className: PropTypes.string,
  draggableSelector: PropTypes.string,
  disableDraggableSelector: PropTypes.string,
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
}

const enhancer = compose(
  identity,
  // unused code, resize offset calculation
  // withStateHandlers(
  //   () => ({
  //     resizeOffset: {
  //       bottom: { w: 0, h: 0 },
  //       bottomLeft: { w: 0, h: 0 },
  //       bottomRight: { w: 0, h: 0 },
  //       left: { w: 0, h: 0 },
  //       right: { w: 0, h: 0 },
  //       top: { w: 0, h: 0 },
  //       topLeft: { w: 0, h: 0 },
  //       topRight: { w: 0, h: 0 },
  //     },
  //   }),
  //   {
  //     onResize: state => (evt, direction, ref, delta, position) => {
  //       const originOffset = state.resizeOffset
  //       const resizeOffset = {
  //         ...originOffset,
  //         [direction]: {
  //           w: updateOffset(delta.width, originOffset[direction].w),
  //           h: updateOffset(delta.height, originOffset[direction].h),
  //         },
  //       }
  //       return { ...state, resizeOffset }
  //     },
  //   },
  // ),
)

export default enhancer(TextDialog)
