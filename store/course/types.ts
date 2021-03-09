import { Student } from '../user/types'

// type Day = 'M-Th' | 'Tu-F' | 'Wed' | 'Sat' | 'Mon' | 'Tue' | 'Thu' | 'Fri'
// type Time = '08:00-09:30' | ''
interface CourseSection {
  sectionId: number
  seat: number
  day: string
  time: string
  enrolledPerson: Student[]
}

export interface Course {
  courseId: number
  name: string
  credit: number
  lecturer: string
  sections: CourseSection[]
}

export interface CourseState {
  courses: Course[]
}

export type CourseActionTypes =
  | { type: 'SET_COURSE'; payload: Course[] }
  | { type: 'ADD_COURSE'; payload: Course }
  | { type: 'REMOVE_COURSE'; payload: number }
