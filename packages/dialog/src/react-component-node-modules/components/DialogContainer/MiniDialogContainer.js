import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { identity } from 'lodash/core'
import styled from 'styled-components'
import { noop } from 'lodash/core'

import { ControlBar, ControlIcon } from './contorlBar'
import { $gray01, $bgColor } from '../../styled_global/colors'
import minimizeIcon from '../../assets/icons/minimize_17.png'

const Container = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: 300px;
  height: 30px;
  box-sizing: border-box;
  border: 1px solid ${$gray01};
  background-color: ${$bgColor};
`

const Title = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  overflow: hidden;

  img {
    width: 17px;
    height: 17px;
    margin: 0 10px 0 15px;
  }

  p {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    margin-right: 10px;
  }
`

const StyledControlBar = styled(ControlBar)`
  padding: 0;
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  align-items: center;
`

const StyledControlIcon = styled(ControlIcon)`
  margin: 0;
  margin-right: 10px;
`

const MiniDialogContainer = ({ theme, title, onClose = noop, onMaximize = noop }) => {
  return (
    <Container>
      <Title>
        <img src={minimizeIcon} alt="minimize" />
        <p title={title}>{title}</p>
      </Title>
      <StyledControlBar>
        <StyledControlIcon type="max" theme={theme} onClick={onClose} />
        <StyledControlIcon type="close" theme={theme} onClick={onClose} />
      </StyledControlBar>
    </Container>
  )
}

MiniDialogContainer.propTypes = {
  onClose: PropTypes.func,
  onMaximize: PropTypes.func,
  theme: PropTypes.oneOf(['light', 'dark']),
  title: PropTypes.string,
}

MiniDialogContainer.defaultProps = {
  theme: 'light',
  title: '',
}

const enchaner = compose(identity)

export default enchaner(MiniDialogContainer)
