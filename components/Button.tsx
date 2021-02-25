import { CSSProperties, MouseEvent } from 'react'

interface Props {
  style?: CSSProperties
  onClick?: (event: MouseEvent) => void
  bg?: string
  mx?: number | string
  my?: number | string
}

export const Button: React.FC<Props> = ({
  children,
  style,
  onClick,
  bg,
  mx,
  my,
}) => (
  <button
    style={{ ...style, backgroundColor: bg ? bg : 'transparent' }}
    onClick={onClick}
    className={`px-4 py-2 text-white shadow-sm rounded-md focus:outline-none ${
      mx && 'mx-' + mx.toString()
    } ${my && 'my-' + my.toString()}`}
  >
    {children}
  </button>
)
