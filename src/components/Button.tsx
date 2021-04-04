import {
  CSSProperties,
  HTMLAttributes,
  MouseEvent,
  useEffect,
  useState,
} from 'react'

interface Props {
  style?: CSSProperties
  onClick?: (event: MouseEvent) => void
  bg?: string
  mx?: number | string
  my?: number | string
  px?: number | string
  py?: number | string
  className?: HTMLAttributes<HTMLButtonElement>['className']
  disabled?: boolean
}

export const Button: React.FC<Props> = ({
  children,
  style,
  onClick,
  className = '',
  disabled = false,
}) => {
  const [btnClass, setClass] = useState('')
  useEffect(() => {
    setClass(className)
  }, [className])

  useEffect(() => {
    if (disabled) {
      const x = btnClass.search('bg')
      if (x !== -1) {
        let i = x
        while (true) {
          if (btnClass[i] === undefined || btnClass[i] === ' ') {
            break
          } else {
            i++
          }
        }
        const res = btnClass.substr(x, i)
        setClass(btnClass.replace(res, 'bg-gray-300'))
      }
    }
  }, [disabled, btnClass])
  return (
    <button
      onClick={onClick}
      style={style}
      disabled={disabled}
      className={`px-4 py-2 text-white shadow-sm rounded-md focus:outline-none
      ${disabled ? 'bg-gray-300' : null} ${btnClass}`}
    >
      {children}
    </button>
  )
}
