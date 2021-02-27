import { CSSProperties, MouseEvent } from 'react'

interface Props {
  style?: CSSProperties
  onClick?: (event: MouseEvent) => void
  bg?: string
  mx?: number | string
  my?: number | string
  px?: number | string
  py?: number | string
}

export const Button: React.FC<Props> = ({
  children,
  style,
  onClick,
  bg,
  mx,
  my,
  px = 4,
  py = 2,
}) => (
  <button
    onClick={onClick}
    style={style}
    className={`px-${px} py-${py} text-white shadow-sm rounded-md focus:outline-none 
    ${mx && 'mx-' + mx.toString()} ${my && 'my-' + my.toString()} ${
      bg ? 'bg-' + bg : ''
    }`}
  >
    {children}
  </button>
)
