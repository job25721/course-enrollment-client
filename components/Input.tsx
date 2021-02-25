import {
  ChangeEvent,
  FunctionComponent,
  HTMLAttributes,
  InputHTMLAttributes,
} from 'react'

interface Props {
  value?: InputHTMLAttributes<HTMLInputElement>['value']
  placeholder?: InputHTMLAttributes<HTMLInputElement>['placeholder']
  onChange?: InputHTMLAttributes<HTMLInputElement>['onChange']
  type?: InputHTMLAttributes<HTMLInputElement>['type']
  className?: HTMLAttributes<HTMLInputElement>['className']
  style?: HTMLAttributes<HTMLInputElement>['style']
}

export const Input: FunctionComponent<Props> = ({
  value,
  placeholder,
  onChange,
  type,
  className,
  style,
}) => (
  <input
    type={type}
    className={`rounded-md border-2 border-transparent focus:outline-none px-4 py-1 ${className}`}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    style={style}
  />
)
