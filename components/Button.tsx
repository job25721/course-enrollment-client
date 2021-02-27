import { CSSProperties, HTMLAttributes, MouseEvent } from 'react'

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
  px = 4,
  py = 2,
  className,
}) => (
  <button
    onClick={onClick}
    style={style}
    className={`px-${px} py-${py} text-white shadow-sm rounded-md focus:outline-none 
    ${mx && 'mx-' + mx.toString()} ${my && 'my-' + my.toString()} ${
      bg ? 'bg-' + bg : ''
    } ${className}`}
  >
    {children}
  </button>
)
