import { CSSProperties, HTMLAttributes, MouseEvent } from 'react'
import { NextComponentType } from 'next'
interface Props {
  style?: CSSProperties
  onClick?: (event: MouseEvent) => void
  bg?: string
  mx?: number | string
  my?: number | string
  px?: number | string
  py?: number | string
  className?: HTMLAttributes<HTMLButtonElement>['className']
}

export const Button: React.FC<Props> = ({
  children,
  style,
  onClick,
  bg,
  mx,
  my,
  px,
  py,
  className = '',
}) => (
  <button
    onClick={onClick}
    style={style}
    className={`px-${px ? px : 4} py-${
      py ? py : 2
    } text-white shadow-sm rounded-md focus:outline-none mx-${mx ? mx : 0} my${
      my ? my : 0
    } ${bg ? `bg-${bg}` : ''} ${className}`}
  >
    {children}
  </button>
)
