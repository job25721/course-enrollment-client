import { CourseActionTypes, CourseState } from './types'

const initialState: CourseState = {
  courses: [],
}

export default function courseReducer(
  state: CourseState = initialState,
  action: CourseActionTypes
): CourseState {
  switch (action.type) {
    case 'SET_COURSE':
      return {
        ...state,
        courses: action.payload,
      }
    case 'ADD_COURSE':
      return {
        ...state,
        courses: [...state.courses, action.payload],
      }
    case 'REMOVE_COURSE':
      return {
        ...state,
        courses: state.courses.filter(
          ({ courseId }) => courseId !== action.payload
        ),
      }
    case 'UPDATE_COURSE':
      return {
        ...state,
        courses: state.courses.map((course) =>
          course.courseId === action.payload.courseId ? action.payload : course
        ),
      }
    default:
      return state
  }
}
