import { DOMAttributes, FunctionComponent } from 'react'
import {
  AlertCircleOutline,
  CheckmarkOutline,
  WarningOutline,
} from 'react-ionicons'

export type AlertTypes = 'danger' | 'warning' | 'success'

interface Props {
  title?: string
  content?: string
  onConfirm?: DOMAttributes<HTMLButtonElement>['onClick']
  onCancel?: DOMAttributes<HTMLButtonElement>['onClick']
  type: AlertTypes
  isOpen?: boolean
  hasCancel?: boolean
}

export const AlertDialog: FunctionComponent<Props> = ({
  title,
  content,
  onConfirm,
  onCancel,
  type,
  isOpen = false,
  hasCancel = true,
}) => {
  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex justify-center items-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
          &#8203;
        </span>

        <div className="inline-block w-full align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div
                className={`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full ${
                  type === 'danger'
                    ? 'bg-red-100'
                    : type === 'warning'
                    ? 'bg-yellow-100'
                    : type === 'success'
                    ? 'bg-green-100'
                    : ''
                } sm:mx-0 sm:h-10 sm:w-10`}
              >
                {type === 'danger' ? (
                  <AlertCircleOutline color="red" />
                ) : type === 'warning' ? (
                  <WarningOutline color="rgba(251, 191, 36,1)" />
                ) : type === 'success' ? (
                  <CheckmarkOutline color="rgba(5, 150, 105,1)" />
                ) : null}
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-headline"
                >
                  {title}
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{content}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={onConfirm}
              className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-${
                type === 'danger'
                  ? 'red-600'
                  : type === 'warning'
                  ? 'yellow-300'
                  : type === 'success'
                  ? 'green-500'
                  : ''
              } text-base font-medium text-white hover:bg-${
                type === 'danger'
                  ? 'red-500'
                  : type === 'warning'
                  ? 'yellow-400'
                  : type === 'success'
                  ? 'green-400'
                  : ''
              } focus:outline-none sm:ml-3 sm:w-auto sm:text-sm`}
            >
              OK
            </button>
            {hasCancel && (
              <button
                onClick={onCancel}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
