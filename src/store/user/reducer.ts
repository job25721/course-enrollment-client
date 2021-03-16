import { UserActionTypes, UserState } from './types'

const initailState: UserState = {
  loginUserType: null,
  student: null,
  teacher: null,
  myCourses: [],
}

export default function userReducer(
  state: UserState = initailState,
  action: UserActionTypes
): UserState {
  switch (action.type) {
    case 'SET_USER_TYPE':
      return {
        ...state,
        loginUserType: action.payload,
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
    case 'SET_MY_COURSES':
      return {
        ...state,
        myCourses: action.payload,
      }
    case 'ADD_MY_COURSES':
      return {
        ...state,
        myCourses: [...state.myCourses, action.payload],
      }
    case 'DELETE_MY_COURSE':
      return {
        ...state,
        myCourses: state.myCourses.filter(
          (course) => course.courseId !== action.payload
        ),
      }
    default:
      return state
  }
}
