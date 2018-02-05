import styled from 'styled-components'
import idx from 'idx'

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

export const ControlIcon = styled.a`
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
      `url("${getImageURL(type, theme, iconsSrc, 'normal')}")`};
  }

  &:hover {
    i {
      background-image: ${({ type, theme, iconsSrc }) =>
        `url("${getImageURL(type, theme, iconsSrc, 'over')}")`};
    }
  }

  &:active {
    i {
      background-image: ${({ type, theme, iconsSrc }) =>
        `url("${getImageURL(type, theme, iconsSrc, 'pressed')}")`};
    }
  }
`
