import { DOMAttributes, FunctionComponent } from 'react'
import { CloseOutline } from 'react-ionicons'

interface Props {
  onCancel?: DOMAttributes<HTMLButtonElement>['onClick']
  isOpen?: boolean
  title?: string
}
export const Modal: FunctionComponent<Props> = ({
  children,
  onCancel,
  isOpen = false,
  title = '',
}) => {
  if (!isOpen) {
    return null
  }
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
          &#8203;
        </span>

        <div className="inline-block w-full bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
          <div className="bg-blue-100 flex px-4 py-2">
            <div className="flex flex-1 items-center">
              <span>{title}</span>
            </div>
            <div>
              <button
                onClick={onCancel}
                className="border rounded-2xl p-1 shadow-sm bg-white focus:outline-none"
              >
                <CloseOutline />
              </button>
            </div>
          </div>
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
