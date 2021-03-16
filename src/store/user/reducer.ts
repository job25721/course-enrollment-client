import { UserActionTypes, UserState } from './types'

const initailState: UserState = {
  loginUser: 'student',
  student: null,
  teacher: null,
}

export default function userReducer(
  state: UserState = initailState,
  action: UserActionTypes
): UserState {
  switch (action.type) {
    case 'SET_USER_TYPE':
      return {
        ...state,
        loginUser: action.payload,
      }
    case 'SET_STUDENT':
      return {
        ...state,
        student: action.payload,
      }
    case 'SET_TEACHER':
      return {
        ...state,
        teacher: action.payload,
      }
    default:
      return state
  }
}
