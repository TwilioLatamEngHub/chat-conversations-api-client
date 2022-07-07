import React from 'react'

interface HeaderItemProps {
  children: JSX.Element | JSX.Element[]
  style?: any
}

export const HeaderItem = ({ children, style }: HeaderItemProps) => {
  const finalStyle = { padding: '0 19px 0 19px', ...style }

  return <div style={finalStyle}>{children}</div>
}
