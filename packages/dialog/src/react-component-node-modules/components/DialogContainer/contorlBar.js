import React from 'react'
import styled from 'styled-components'
import idx from 'idx'
import { importAllFiles } from '../../utils/utils'

const icons = importAllFiles(
  require.context('../../assets/control_bar', true, /\.(png|jpe?g|svg)$/),
)

const getImageURL = (type, theme, iconsSrc, status) => {
  return (
    idx(iconsSrc, _ => _.svg[`btn_${type}_${status}_${theme}`]) ||
    idx(iconsSrc, _ => _.png[`btn_${type}_${status}_${theme}`]) ||
    ''
  )
}

export const ControlBar = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  align-item: flex-start;
  height: 24px;
  padding: 10px;
`

const Icon = props => <a {...props}><i/></a>
export const ControlIcon = styled(Icon)`
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
    background-image: ${({ type, theme }) =>
      `url("${getImageURL(type, theme, icons, 'normal')}")`};
  }

  &:hover {
    i {
      background-image: ${({ type, theme }) =>
        `url("${getImageURL(type, theme, icons, 'over')}")`};
    }
  }

  &:active {
    i {
      background-image: ${({ type, theme }) =>
        `url("${getImageURL(type, theme, icons, 'pressed')}")`};
    }
  }
`
